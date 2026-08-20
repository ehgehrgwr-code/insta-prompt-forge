import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ENGINES } from "@/lib/engines";
import { buildMessages, parseAiJson } from "@/lib/ai/prompt-builder.server";

const str = z.string().max(2000).optional();

const BodySchema = z
  .object({
    mode: z.string().refine((m) => m in ENGINES, "Unknown creative mode"),
    brandKit: z.record(z.string().max(2000)).nullable().optional(),
  })
  .catchall(str);

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/generate-prompt")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ success: false, error: "Invalid JSON body." }, 400);
        }

        const parsed = BodySchema.safeParse(body);
        if (!parsed.success) {
          return json(
            { success: false, error: parsed.error.issues[0]?.message ?? "Invalid brief." },
            400,
          );
        }

        const apiKey = process.env["AI_API_KEY"];
        if (!apiKey) {
          return json(
            { success: false, error: "AI Engine is not configured on the server." },
            500,
          );
        }

        const baseUrl = process.env["AI_BASE_URL"] ?? "https://bandelbanget.xyz/v1";
        const model = process.env["AI_MODEL"] ?? "deepseek-v4-flash";
        const engine = ENGINES[parsed.data.mode];

        let upstream: Response;
        try {
          upstream = await fetch(`${baseUrl}/chat/completions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              messages: buildMessages(parsed.data),
              max_tokens: 4000,
              temperature: 0.8,
            }),
          });
        } catch {
          return json(
            { success: false, error: "AI Engine unavailable. Could not reach the model." },
            502,
          );
        }

        if (!upstream.ok) {
          const detail = upstream.status === 429 ? " Rate limited, try again shortly." : "";
          return json(
            {
              success: false,
              error: `AI Engine unavailable (status ${upstream.status}).${detail}`,
            },
            502,
          );
        }

        let content = "";
        try {
          const data = (await upstream.json()) as {
            choices?: Array<{ message?: { content?: string } }>;
          };
          content = data.choices?.[0]?.message?.content ?? "";
        } catch {
          return json(
            { success: false, error: "AI Engine returned a malformed response." },
            502,
          );
        }

        if (!content.trim()) {
          return json({ success: false, error: "AI Engine returned an empty result." }, 502);
        }

        const parsedOut = parseAiJson(content);

        return json({
          success: true,
          mode: parsed.data.mode,
          instagram_format: engine.ratio,
          generated_at: new Date().toISOString(),
          result: parsedOut ?? { final_prompt: content },
        });
      },
    },
  },
});
