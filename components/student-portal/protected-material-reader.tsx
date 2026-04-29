"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import {
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import type { ReviewMaterial } from "./types";

type ProtectedMaterialReaderProps = {
  material: ReviewMaterial | null;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  studentName?: string;
  subjectTitle: string;
};

export function ProtectedMaterialReader({
  material,
  onOpenChange,
  open,
  studentName = "Juan Dela Cruz",
  subjectTitle,
}: ProtectedMaterialReaderProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [turnDirection, setTurnDirection] = useState<"next" | "previous" | null>(
    null,
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const preventProtectedShortcuts = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if ((event.ctrlKey || event.metaKey) && ["c", "p", "s", "x"].includes(key)) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", preventProtectedShortcuts);

    return () => {
      window.removeEventListener("keydown", preventProtectedShortcuts);
    };
  }, [open]);

  if (!material) {
    return null;
  }

  const totalPages = material.pages.length;
  const currentPage = material.pages[pageIndex] ?? material.pages[0];
  const canGoPrevious = pageIndex > 0;
  const canGoNext = pageIndex < totalPages - 1;

  const turnPage = (direction: "next" | "previous") => {
    const nextIndex = direction === "next" ? pageIndex + 1 : pageIndex - 1;

    if (nextIndex < 0 || nextIndex >= totalPages) {
      return;
    }

    setTurnDirection(direction);
    setPageIndex(nextIndex);
    window.setTimeout(() => setTurnDirection(null), 430);
  };

  const stopProtectedAction = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="grid h-[min(92dvh,900px)] max-h-[calc(100dvh-1rem)] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 overflow-hidden p-0 sm:max-w-[min(1100px,calc(100vw-2rem))]"
        onContextMenu={stopProtectedAction}
        onCopy={stopProtectedAction}
        onCut={stopProtectedAction}
        onDragStart={stopProtectedAction}
      >
        <DialogHeader className="shrink-0 border-b px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-3 pr-8">
            <div className="min-w-0">
              <DialogTitle className="font-sans text-lg font-black text-slate-950 sm:text-xl">
                {material.title}
              </DialogTitle>
              <DialogDescription>
                {subjectTitle} protected review material
              </DialogDescription>
            </div>
            <Badge variant="secondary">
              <ShieldCheck data-icon="inline-start" />
              Portal protected
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid min-h-0 overflow-y-auto lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden border-r bg-slate-50 p-5 lg:block">
            <div
              className={cn(
                "relative mx-auto flex aspect-[3/4] max-w-56 overflow-hidden rounded-lg bg-gradient-to-br p-5 text-white shadow-xl",
                material.coverTone,
              )}
            >
              <div className="absolute inset-y-0 left-0 w-8 bg-black/25" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0,rgba(255,255,255,0.16)_1px,transparent_1px,transparent_24px)]" />
              <div className="relative flex h-full flex-col justify-between pl-5">
                <div className="flex size-12 items-center justify-center rounded-lg border border-white/30 bg-white/15 backdrop-blur">
                  <BookOpenCheck aria-hidden="true" size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-white/75">
                    {subjectTitle}
                  </p>
                  <h3 className="mt-2 font-sans text-xl font-black leading-tight text-white">
                    {material.title}
                  </h3>
                  <p className="mt-3 text-sm leading-5 text-white/80">
                    {material.coverSubtitle}
                  </p>
                </div>
              </div>
            </div>

            <Alert className="mt-4">
              <LockKeyhole aria-hidden="true" />
              <AlertTitle>Viewing restrictions active</AlertTitle>
              <AlertDescription>
                Download, print, copy, right-click, and drag actions are disabled in
                this portal reader.
              </AlertDescription>
            </Alert>
          </aside>

          <section className="min-h-0 bg-slate-100 p-3 sm:p-4 lg:p-5">
            <div className="mx-auto flex max-w-2xl flex-col gap-4">
              <div className="[perspective:1600px]">
                <article
                  key={`${material.title}-${pageIndex}`}
                  className={cn(
                    "relative min-h-[360px] overflow-hidden rounded-lg bg-background p-4 shadow-xl ring-1 ring-black/10 transition-transform [transform-style:preserve-3d] sm:min-h-[420px] sm:p-6 lg:min-h-[460px]",
                    turnDirection === "next" &&
                      "animate-[protected-page-flip-next_420ms_ease-out]",
                    turnDirection === "previous" &&
                      "animate-[protected-page-flip-previous_420ms_ease-out]",
                  )}
                  >
                  <div className="pointer-events-none absolute inset-0 select-none bg-[linear-gradient(90deg,rgba(15,23,42,0.08),transparent_14%,transparent_86%,rgba(15,23,42,0.08))]" />
                  <div className="pointer-events-none absolute inset-0 flex rotate-[-24deg] select-none items-center justify-center text-center font-sans text-3xl font-black uppercase text-slate-900/5 sm:text-5xl">
                    {studentName} Protected Copy
                  </div>
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between gap-3 border-b pb-3">
                      <Badge variant="outline">{material.type}</Badge>
                      <p className="text-xs font-bold uppercase text-muted-foreground">
                        Page {pageIndex + 1} of {totalPages}
                      </p>
                    </div>

                    <div className="py-5 sm:py-6">
                      <p className="text-xs font-bold uppercase text-emerald-700">
                        {subjectTitle}
                      </p>
                      <h4 className="mt-2 font-sans text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
                        {currentPage.heading}
                      </h4>
                      <ul className="mt-5 flex flex-col gap-3 text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
                        {currentPage.points.map((point) => (
                          <li className="flex gap-3" key={point}>
                            <span className="mt-2 size-2 shrink-0 rounded-full bg-emerald-700" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto rounded-lg bg-emerald-50 p-3 text-xs leading-5 text-emerald-950 sm:text-sm sm:leading-6">
                      This page is watermarked for the active student account and is
                      intended for in-portal review only.
                    </div>
                  </div>
                </article>
              </div>

              <div className="flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => turnPage("previous")}
                  disabled={!canGoPrevious}
                >
                  <ChevronLeft data-icon="inline-start" />
                  Previous
                </Button>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-background">
                  <div
                    className="h-full rounded-full bg-emerald-700 transition-all"
                    style={{
                      width: `${((pageIndex + 1) / totalPages) * 100}%`,
                    }}
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => turnPage("next")}
                  disabled={!canGoNext}
                >
                  Next
                  <ChevronRight data-icon="inline-end" />
                </Button>
              </div>
            </div>
          </section>
        </div>

        <DialogFooter
          className="mx-0 mb-0 shrink-0 rounded-none px-4 py-3 sm:px-6"
          showCloseButton
        />
      </DialogContent>
    </Dialog>
  );
}
