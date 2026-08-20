import { useState } from "react";
import { Sparkles, AlertTriangle, RotateCcw, Wand2 } from "lucide-react";
import { toast } from "sonner";
import type { EngineConfig } from "@/lib/engines";
import { DEMO_BRIEF } from "@/lib/engines";
import { BriefForm } from "./BriefForm";
import { GenerationStatus } from "./GenerationStatus";
import { PromptResult, type AiResult } from "./PromptResult";
import { brandKitPayload, saveHistoryItem } from "@/lib/storage";

interface ApiResponse {
  success: boolean;
  error?: string;
  result?: AiResult;
  instagram_format?: string;
  generated_at?: string;
}

export function GeneratorPage({ engine }: { engine: EngineConfig }) {
  const initial = Object.fromEntries(
    engine.fields.filter((f) => f.defaultValue).map((f) => [f.name, f.defaultValue!]),
  );
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AiResult | null>(null);
  const [generatedAt, setGeneratedAt] = useState<string>("");

  const setValue = (name: string, value: string) =>
    setValues((v) => ({ ...v, [name]: value }));

  const loadDemo = () => {
    const allowed = new Set(engine.fields.map((f) => f.name));
    const demo = Object.fromEntries(
      Object.entries(DEMO_BRIEF).filter(([k]) => allowed.has(k)),
    );
    setValues((v) => ({ ...v, ...demo }));
    toast("Demo brief loaded.");
  };

  const generate = async () => {
    const missing = engine.fields.filter((f) => f.required && !values[f.name]?.trim());
    if (missing.length) {
      toast.error(`Please fill: ${missing.map((m) => m.label).join(", ")}`);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          mode: engine.id,
          brandKit: brandKitPayload(),
        }),
      });
      const data = (await res.json()) as ApiResponse;
      if (!res.ok || !data.success || !data.result) {
        setError(data.error ?? "AI Engine unavailable");
        return;
      }
      setResult(data.result);
      const at = data.generated_at ?? new Date().toISOString();
      setGeneratedAt(at);
      saveHistoryItem({
        id: crypto.randomUUID(),
        date: at,
        mode: engine.id,
        modeName: engine.name,
        title: values["headline"] || values["product"] || engine.name,
        brief: values["product"] || values["brand"] || "",
        prompt:
          data.result.final_prompt ??
          (data.result.slides ?? [])
            .map((s) => `${s.title ?? ""}\n${s.prompt ?? ""}`)
            .join("\n\n"),
        ratio: data.instagram_format ?? engine.ratio,
        style: values["style"] ?? "",
        result: data.result as unknown as Record<string, unknown>,
      });
    } catch {
      setError("AI Engine unavailable. Check your connection and retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-6">
        <div className="mono-label">Instagram Studio / {engine.name}</div>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
            {engine.name}
          </h1>
          <span className="rounded-full border border-border-strong bg-accent/30 px-3 py-1 font-mono text-[10px] tracking-widest text-foreground">
            {engine.badge}
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {engine.description}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={loadDemo}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
            >
              <Wand2 className="size-3.5" /> Load demo brief
            </button>
            <button
              onClick={() => setValues(initial)}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
            >
              <RotateCcw className="size-3.5" /> Reset
            </button>
          </div>

          <BriefForm engine={engine} values={values} onChange={setValue} />

          <button
            onClick={() => void generate()}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-display text-sm font-bold tracking-wide text-primary-foreground transition-transform duration-200 hover:scale-[1.01] disabled:opacity-60"
          >
            <Sparkles className="size-4" />
            {loading ? "BUILDING PROMPT…" : "GENERATE PROMPT"}
          </button>
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          {loading ? (
            <GenerationStatus />
          ) : error ? (
            <div className="panel space-y-3 p-6">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="size-4" />
                <span className="mono-label text-destructive">AI Engine unavailable</span>
              </div>
              <p className="text-sm text-muted-foreground">{error}</p>
              <button
                onClick={() => void generate()}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Retry
              </button>
            </div>
          ) : result ? (
            <PromptResult
              result={result}
              format={engine.ratio}
              generatedAt={generatedAt}
              onRegenerate={() => void generate()}
              onEditBrief={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              onSave={() => toast.success("Prompt saved to Prompt History.")}
            />
          ) : (
            <div className="panel flex min-h-[320px] flex-col items-center justify-center gap-3 p-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl border border-border-strong bg-accent/25">
                <Sparkles className="size-5 text-primary" />
              </div>
              <p className="mono-label">Awaiting brief</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Fill the brief and the engine will return a production-ready prompt you can
                copy straight into ChatGPT image generation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
