import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Square,
  RectangleVertical,
  GalleryHorizontalEnd,
  Smartphone,
  Grid3X3,
  ShoppingBag,
  Type,
  Palette,
  History,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  meta?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard, meta: "HOME" },
  { label: "Feed 1:1", to: "/feed-square", icon: Square, meta: "1:1" },
  { label: "Feed 4:5", to: "/feed-portrait", icon: RectangleVertical, meta: "4:5" },
  { label: "Carousel", to: "/carousel", icon: GalleryHorizontalEnd, meta: "3–10" },
  { label: "Story / Reels", to: "/stories", icon: Smartphone, meta: "9:16" },
  { label: "9-Feed Grid", to: "/grid-9", icon: Grid3X3, meta: "9" },
  { label: "Product Ads", to: "/ads", icon: ShoppingBag, meta: "AD" },
  { label: "Caption & Hook", to: "/captions", icon: Type, meta: "COPY" },
  { label: "Brand Kit", to: "/brand-kit", icon: Palette, meta: "DNA" },
  { label: "Prompt History", to: "/history", icon: History, meta: "LOG" },
];

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary glow-soft">
          <Zap className="size-5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold text-foreground">
            Instagram Creative Studio
          </p>
          <p className="mono-label mt-0.5">AI Visual Prompt Engine</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="mono-label px-2 pb-2">Creative Modes</p>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            activeOptions={{ exact: item.to === "/" }}
            className="group flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-sm text-muted-foreground transition-all duration-200 hover:border-border hover:bg-surface hover:text-foreground"
            activeProps={{
              className: cn(
                "border-border-strong bg-accent/35 text-foreground glow-soft",
              ),
            }}
          >
            <item.icon className="size-4 shrink-0 opacity-80" />
            <span className="flex-1 truncate">{item.label}</span>
            {item.meta ? (
              <span className="font-mono text-[10px] tracking-widest text-subtle">
                {item.meta}
              </span>
            ) : null}
          </Link>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          <span className="mono-label">Engine Online</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-subtle">
          Prompts only. Generate the final image manually in ChatGPT.
        </p>
      </div>
    </div>
  );
}
