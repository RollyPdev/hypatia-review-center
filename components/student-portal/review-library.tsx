"use client";

import { useState } from "react";
import { BookOpenCheck, Eye, Library, LockKeyhole } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { ProtectedMaterialReader } from "./protected-material-reader";
import type { PortalSubject } from "./types";

type ReviewLibraryProps = {
  subject: PortalSubject;
};

export function ReviewLibrary({ subject }: ReviewLibraryProps) {
  const [selectedMaterialTitle, setSelectedMaterialTitle] = useState<string | null>(
    null,
  );
  const selectedMaterial =
    subject.materials.find((material) => material.title === selectedMaterialTitle) ??
    null;

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader>
          <div>
            <CardTitle className="font-sans text-xl font-black text-slate-950">
              Review Library
            </CardTitle>
            <CardDescription>
              Materials are grouped per subject for protected in-portal review.
            </CardDescription>
          </div>
          <CardAction>
            <Button variant="outline">
              <Library data-icon="inline-start" />
              View all
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {subject.materials.map((material) => (
              <div
                key={material.title}
                className="flex min-h-72 flex-col overflow-hidden rounded-lg border bg-background"
              >
                <div
                  aria-label={`${material.title} book cover`}
                  className={cn(
                    "relative flex min-h-36 bg-gradient-to-br p-4 text-white",
                    material.coverTone,
                  )}
                  role="img"
                >
                  <div className="absolute inset-y-0 left-0 w-6 bg-black/25" />
                  <div className="relative flex flex-col justify-between pl-4">
                    <Badge variant="secondary">{material.type}</Badge>
                    <div>
                      <BookOpenCheck aria-hidden="true" size={20} />
                      <p className="mt-3 text-xs font-bold uppercase text-white/75">
                        {subject.title}
                      </p>
                      <p className="mt-1 font-sans text-base font-black leading-tight text-white">
                        {material.title}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-3 p-4">
                  <div>
                    <p className="font-bold leading-snug">{material.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Updated {material.updated}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-900">
                    <LockKeyhole aria-hidden="true" size={14} />
                    Protected viewer
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedMaterialTitle(material.title)}
                  >
                    <Eye data-icon="inline-start" />
                    Open reader
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ProtectedMaterialReader
        key={selectedMaterial?.title ?? "no-selected-material"}
        material={selectedMaterial}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedMaterialTitle(null);
          }
        }}
        open={selectedMaterial !== null}
        subjectTitle={subject.title}
      />
    </>
  );
}
