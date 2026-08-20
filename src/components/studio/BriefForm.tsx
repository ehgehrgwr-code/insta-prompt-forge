import { useMemo } from "react";
import type { EngineConfig, EngineField } from "@/lib/engines";
import { cn } from "@/lib/utils";

const GROUP_ORDER = [
  "Brief",
  "Brand",
  "Visual Direction",
  "Typography",
  "Format",
  "Advanced Controls",
];

const inputClass =
  "w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-subtle transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring";

export function BriefForm({
  engine,
  values,
  onChange,
}: {
  engine: EngineConfig;
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}) {
  const groups = useMemo(() => {
    const map = new Map<string, EngineField[]>();
    engine.fields.forEach((f) => {
      map.set(f.group, [...(map.get(f.group) ?? []), f]);
    });
    return [...map.entries()].sort(
      (a, b) => GROUP_ORDER.indexOf(a[0]) - GROUP_ORDER.indexOf(b[0]),
    );
  }, [engine]);

  return (
    <div className="space-y-4">
      {groups.map(([group, fields]) => (
        <section key={group} className="panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-foreground">{group}</h3>
            <span className="mono-label">{fields.length} fields</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={cn(
                  field.type === "textarea" || field.type === "chips"
                    ? "sm:col-span-2"
                    : "",
                )}
              >
                <label className="mono-label mb-1.5 block" htmlFor={field.name}>
                  {field.label}
                  {field.required ? " *" : ""}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    value={values[field.name] ?? ""}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className={cn(inputClass, "min-h-[120px] resize-y leading-relaxed")}
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.name}
                    value={values[field.name] ?? ""}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Not specified</option>
                    {field.options?.map((o) => (
                      <option key={o} value={o} className="bg-surface">
                        {o}
                      </option>
                    ))}
                  </select>
                ) : field.type === "chips" ? (
                  <div className="flex flex-wrap gap-2">
                    {field.options?.map((o) => {
                      const active = values[field.name] === o;
                      return (
                        <button
                          type="button"
                          key={o}
                          onClick={() => onChange(field.name, active ? "" : o)}
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-xs transition-all duration-200",
                            active
                              ? "border-border-strong bg-accent/40 text-foreground glow-soft"
                              : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground",
                          )}
                        >
                          {o}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <input
                    id={field.name}
                    value={values[field.name] ?? ""}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className={inputClass}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
