import { useState } from "react";
import { toast } from "sonner";
import {
  Copy,
  RefreshCw,
  PencilLine,
  Save,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AiResult {
  final_prompt?: string;
  creative_direction?: string;
  composition?: string;
  typography?: string;
  color_lighting?: string;
  subject_direction?: string;
  instagram_format?: string;
  negative_prompt?: string;
  slides?: Array<{ title?: string; prompt?: string }>;
  copy?: Record<string, string[]>;
}

export async function copyText(text: string, message = "Prompt copied to clipboard.") {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(message);
  } catch {
    toast.error("Could not access the clipboard.");
  }
}

function Section({
  title,
  body,
  defaultOpen = false,
  mono = false,
}: {
  title: string;
  body: string;
  defaultOpen?: boolean;
  mono?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  if (!body?.trim()) return null;
  return (
    <div className="rounded-xl border border-border bg-card/60">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="mono-label text-muted-foreground">{title}</span>
        <div className="flex items-center gap-2">
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              void copyText(body, "Copied to clipboard.");
            }}
            onKeyDown={() => {}}
            className="rounded-md border border-border p-1 text-subtle transition-colors hover:text-foreground"
          >
            <Copy className="size-3" />
          </span>
          {open ? (
            <ChevronUp className="size-3.5 text-subtle" />
          ) : (
            <ChevronDown className="size-3.5 text-subtle" />
          )}
        </div>
      </button>
      {open ? (
        <p
          className={cn(
            "whitespace-pre-wrap border-t border-border px-4 py-3 text-sm leading-relaxed text-secondary-foreground",
            mono && "font-mono text-[13px]",
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function PromptResult({
  result,
  format,
  generatedAt,
  onRegenerate,
  onEditBrief,
  onSave,
}: {
  result: AiResult;
  format: string;
  generatedAt: string;
  onRegenerate: () => void;
  onEditBrief: () => void;
  onSave: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const slides = result.slides ?? [];
  const allSlides = slides
    .map((s, i) => `${s.title ?? `SLIDE ${String(i + 1).padStart(2, "0")}`}\n${s.prompt ?? ""}`)
    .join("\n\n---\n\n");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-border-strong bg-accent/30 px-3 py-1 font-mono text-[10px] tracking-widest text-foreground">
          PROMPT READY
        </span>
        <span className="mono-label">FORMAT {format}</span>
        <span className="mono-label">
          {new Date(generatedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {result.final_prompt ? (
        <div className="panel glow-soft overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="mono-label text-primary">Final Production Prompt</span>
            <button
              onClick={() => setExpanded((e) => !e)}
              className="mono-label transition-colors hover:text-foreground"
            >
              {expanded ? "Collapse" : "Expand"}
            </button>
          </div>
          <p
            className={cn(
              "whitespace-pre-wrap px-4 py-4 font-mono text-[13px] leading-relaxed text-foreground",
              !expanded && "line-clamp-6",
            )}
          >
            {result.final_prompt}
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => void copyText(result.final_prompt ?? allSlides)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.01] sm:flex-none"
        >
          <Copy className="size-4" /> Copy Prompt
        </button>
        {result.negative_prompt ? (
          <button
            onClick={() =>
              void copyText(result.negative_prompt ?? "", "Negative prompt copied.")
            }
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            <ShieldAlert className="size-4" /> Copy Negative
          </button>
        ) : null}
        {slides.length ? (
          <button
            onClick={() => void copyText(allSlides, "All slides copied to clipboard.")}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            <Copy className="size-4" /> Copy All Slides
          </button>
        ) : null}
        <button
          onClick={onRegenerate}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
        >
          <RefreshCw className="size-4" /> Regenerate
        </button>
        <button
          onClick={onEditBrief}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
        >
          <PencilLine className="size-4" /> Edit Brief
        </button>
        <button
          onClick={onSave}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
        >
          <Save className="size-4" /> Save Prompt
        </button>
      </div>

      <div className="space-y-2">
        <Section title="Creative Direction" body={result.creative_direction ?? ""} />
        <Section title="Composition" body={result.composition ?? ""} />
        <Section title="Typography & Copy" body={result.typography ?? ""} />
        <Section title="Color & Lighting" body={result.color_lighting ?? ""} />
        <Section
          title="Product / Subject Direction"
          body={result.subject_direction ?? ""}
        />
        <Section title="Instagram Format" body={result.instagram_format ?? format} />
        <Section title="Negative Constraints" body={result.negative_prompt ?? ""} mono />
      </div>

      {slides.length ? (
        <div className="space-y-2">
          <p className="mono-label">Slide / Grid Prompts</p>
          {slides.map((s, i) => (
            <Section
              key={i}
              title={s.title ?? `SLIDE ${String(i + 1).padStart(2, "0")}`}
              body={s.prompt ?? ""}
              mono
            />
          ))}
        </div>
      ) : null}

      {result.copy ? (
        <div className="space-y-2">
          {Object.entries(result.copy).map(([key, values]) => (
            <Section
              key={key}
              title={key.replace(/_/g, " ")}
              body={(Array.isArray(values) ? values : [String(values)])
                .map((v, i) => `${i + 1}. ${v}`)
                .join("\n")}
              defaultOpen
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
