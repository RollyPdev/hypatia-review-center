"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProtectedMaterialReader } from "./protected-material-reader";
import { ReviewMaterialCard } from "./review-material-card";
import type { PortalSubject, ReviewMaterial } from "./types";

type ReviewLibraryViewProps = {
  subjects: PortalSubject[];
};

type SelectedMaterial = {
  material: ReviewMaterial;
  subjectTitle: string;
};

export function ReviewLibraryView({ subjects }: ReviewLibraryViewProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<SelectedMaterial | null>(
    null,
  );

  return (
    <div className="flex flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
      <section>
        <p className="text-xs font-bold uppercase text-emerald-700">Review Library</p>
        <h2 className="mt-1 font-sans text-2xl font-black text-slate-950">
          Subject materials
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Protected review notes, drills, templates, and lecture decks are grouped by
          enrolled subject and open inside the portal reader.
        </p>
      </section>

      <div className="grid gap-5">
        {subjects.map((subject) => (
          <section key={subject.id} className="flex flex-col gap-3">
            <Card size="sm" className="shadow-sm">
              <CardHeader>
                <CardTitle className="font-sans text-lg font-black text-slate-950">
                  {subject.title}
                </CardTitle>
                <CardDescription>
                  {subject.materials.length} protected review materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  Tap a cover to read the material as a watermarked flipbook. Download,
                  copy, and print controls are intentionally not available.
                </p>
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {subject.materials.map((material) => (
                <ReviewMaterialCard
                  key={`${subject.id}-${material.title}`}
                  material={material}
                  onOpen={() =>
                    setSelectedMaterial({
                      material,
                      subjectTitle: subject.title,
                    })
                  }
                  subject={subject}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <ProtectedMaterialReader
        key={selectedMaterial?.material.title ?? "no-selected-material"}
        material={selectedMaterial?.material ?? null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedMaterial(null);
          }
        }}
        open={selectedMaterial !== null}
        subjectTitle={selectedMaterial?.subjectTitle ?? ""}
      />
    </div>
  );
}
