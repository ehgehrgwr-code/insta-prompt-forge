import type { ReactNode } from "react";
import { SidebarContent } from "./Sidebar";
import { Topbar } from "./Topbar";

export function StudioShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] border-r border-sidebar-border lg:block">
        <SidebarContent />
      </aside>
      <div className="lg:pl-[264px]">
        <Topbar />
        <main className="studio-grid min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </div>
  );
}
