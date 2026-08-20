import { useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, Copy, Trash2, Settings } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { SidebarContent, NAV_ITEMS } from "./Sidebar";
import { clearHistory, loadHistory, clearBrandKit } from "@/lib/storage";

export function Topbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const current = NAV_ITEMS.find((n) =>
    n.to === "/" ? pathname === "/" : pathname.startsWith(n.to),
  );

  const copyLast = async () => {
    const last = loadHistory()[0];
    if (!last) {
      toast.error("No prompt generated yet.");
      return;
    }
    await navigator.clipboard.writeText(last.prompt);
    toast.success("Prompt copied to clipboard.");
  };

  const clearWorkspace = () => {
    clearHistory();
    clearBrandKit();
    toast.success("Workspace cleared.");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl lg:px-6">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-foreground lg:hidden">
          <Menu className="size-4" />
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] border-sidebar-border p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarContent onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="mono-label hidden shrink-0 sm:block">
        Instagram Studio / {current?.label ?? "Studio"}
      </div>

      <div className="relative mx-auto hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-subtle" />
        <input
          placeholder="Describe what you want to create…"
          className="h-9 w-full rounded-lg border border-border bg-surface/60 pl-9 pr-3 text-sm text-foreground placeholder:text-subtle focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-lg border border-border bg-surface/60 px-3 py-1.5 sm:flex">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          <span className="mono-label">AI Engine • Ready</span>
        </div>
        <button
          onClick={copyLast}
          className="rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
        >
          <Copy className="size-3.5 sm:hidden" />
          <span className="hidden sm:inline">Copy Last Prompt</span>
        </button>
        <button
          onClick={clearWorkspace}
          className="rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
        >
          <Trash2 className="size-3.5 sm:hidden" />
          <span className="hidden sm:inline">Clear Workspace</span>
        </button>
        <button
          onClick={() => toast("Settings arrive in a later version.")}
          className="hidden rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground lg:block"
        >
          <Settings className="size-3.5" />
        </button>
      </div>
    </header>
  );
}
