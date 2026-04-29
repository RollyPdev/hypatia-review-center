"use client";

import { BookOpenCheck, Eye, LockKeyhole } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { PortalSubject, ReviewMaterial } from "./types";

type ReviewMaterialCardProps = {
  material: ReviewMaterial;
  onOpen: () => void;
  subject: PortalSubject;
};

export function ReviewMaterialCard({
  material,
  onOpen,
  subject,
}: ReviewMaterialCardProps) {
  return (
    <Card className="gap-0 overflow-hidden p-0 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <button
        aria-label={`Open ${material.title} in protected reader`}
        className={cn(
          "relative flex aspect-[4/3] overflow-hidden bg-gradient-to-br p-4 text-left text-white",
          material.coverTone,
        )}
        onClick={onOpen}
        type="button"
      >
        <div className="absolute inset-y-0 left-0 w-7 bg-black/25" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_1px,transparent_1px,transparent_24px)]" />
        <div className="relative flex h-full w-full flex-col justify-between pl-5">
          <div className="flex items-start justify-between gap-3">
            <Badge variant="secondary">{material.type}</Badge>
            <div className="flex size-10 items-center justify-center rounded-lg border border-white/30 bg-white/15 backdrop-blur">
              <BookOpenCheck aria-hidden="true" size={20} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-white/75">
              {subject.title}
            </p>
            <h3 className="mt-2 font-sans text-xl font-black leading-tight text-white">
              {material.title}
            </h3>
            <p className="mt-2 text-sm leading-5 text-white/80">
              {material.coverSubtitle}
            </p>
          </div>
        </div>
      </button>
      <CardHeader>
        <CardTitle className="font-sans text-base font-black text-slate-950">
          {material.title}
        </CardTitle>
        <CardDescription>Updated {material.updated}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-900">
          <LockKeyhole aria-hidden="true" size={14} />
          Protected portal viewing only
        </div>
        <Button type="button" onClick={onOpen}>
          <Eye data-icon="inline-start" />
          Open reader
        </Button>
      </CardContent>
    </Card>
  );
}
