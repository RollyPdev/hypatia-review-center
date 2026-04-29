"use client";

import Link from "next/link";
import { useEffect, type KeyboardEvent, type ReactNode, type SyntheticEvent } from "react";
import { Bell, LogOut, MonitorCheck, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { portalNavigationItems, type PortalViewId } from "./portal-navigation";

const protectedShortcutKeys = ["c", "p", "s", "x"];

type PortalShellProps = {
  activeView: PortalViewId;
  children: ReactNode;
  onLogout: () => void;
  onViewChange: (view: PortalViewId) => void;
};

export function PortalShell({
  activeView,
  children,
  onLogout,
  onViewChange,
}: PortalShellProps) {
  const activeItem =
    portalNavigationItems.find((item) => item.id === activeView) ??
    portalNavigationItems[0];

  useEffect(() => {
    const preventProtectedShortcuts = (event: globalThis.KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (
        (event.ctrlKey || event.metaKey) &&
        protectedShortcutKeys.includes(key)
      ) {
        event.preventDefault();
      }
    };

    const preventPrint = (event: Event) => {
      event.preventDefault();
    };

    window.addEventListener("keydown", preventProtectedShortcuts);
    window.addEventListener("beforeprint", preventPrint);

    return () => {
      window.removeEventListener("keydown", preventProtectedShortcuts);
      window.removeEventListener("beforeprint", preventPrint);
    };
  }, []);

  const stopPortalExtraction = (event: SyntheticEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const stopPortalShortcuts = (event: KeyboardEvent<HTMLElement>) => {
    const key = event.key.toLowerCase();

    if ((event.ctrlKey || event.metaKey) && protectedShortcutKeys.includes(key)) {
      event.preventDefault();
    }
  };

  return (
    <main
      className="min-h-screen bg-slate-50 text-slate-950"
      onContextMenu={stopPortalExtraction}
      onCopy={stopPortalExtraction}
      onCut={stopPortalExtraction}
      onDragStart={stopPortalExtraction}
      onKeyDown={stopPortalShortcuts}
    >
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden bg-emerald-950 px-5 py-6 text-white lg:flex lg:flex-col">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-white text-lg font-black text-emerald-950">
              H
            </div>
            <div>
              <p className="text-lg font-black uppercase">Hypatia</p>
              <p className="text-[10px] font-bold uppercase text-emerald-100">
                Review Center
              </p>
            </div>
          </Link>

          <nav className="mt-10 flex flex-col gap-2" aria-label="Student portal navigation">
            {portalNavigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-bold transition",
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-emerald-50 hover:bg-white/10",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-4">
            <div className="rounded-xl border border-white/10 bg-white/10 p-4">
              <MonitorCheck size={22} aria-hidden="true" />
              <p className="mt-3 font-bold">Device secured</p>
              <p className="mt-2 text-sm leading-6 text-emerald-50">
                Your account is active on this device only.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              onClick={onLogout}
            >
              <LogOut data-icon="inline-start" />
              Log out
            </Button>
          </div>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
              <div>
                <p className="text-xs font-bold uppercase text-emerald-700">
                  Student Portal
                </p>
                <h1 className="font-sans text-xl font-black text-slate-950">
                  {activeItem.label}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" aria-label="Search">
                  <Search />
                </Button>
                <Button variant="outline" size="icon" aria-label="Notifications">
                  <Bell />
                </Button>
                <Avatar>
                  <AvatarFallback className="bg-emerald-900 text-white">JD</AvatarFallback>
                </Avatar>
                <div className="hidden leading-tight sm:block">
                  <p className="text-sm font-bold">Juan Dela Cruz</p>
                  <p className="text-xs text-muted-foreground">Student</p>
                </div>
              </div>
            </div>
            <nav
              className="flex gap-2 overflow-x-auto border-t px-4 py-3 sm:px-6 lg:hidden"
              aria-label="Mobile student portal navigation"
            >
              {portalNavigationItems.map((item) => {
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onViewChange(item.id)}
                    className={cn(
                      "shrink-0 rounded-lg border px-3 py-2 text-sm font-bold transition",
                      isActive
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border-border bg-background text-muted-foreground hover:bg-muted",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </header>

          {children}
        </section>
      </div>
    </main>
  );
}
