"use client";

import {
  ArrowRight,
  BookOpen,
  Calculator,
  Clock,
  FileCheck2,
  Landmark,
  Play,
  Scale,
  type LucideIcon,
} from "lucide-react";

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
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

import type { PortalSubject } from "./types";

type MyCoursesViewProps = {
  onOpenSubject: (subjectId: string) => void;
  subjects: PortalSubject[];
};

const thumbnailIcons: Record<string, LucideIcon> = {
  accounting: Calculator,
  auditing: FileCheck2,
  rfbt: Scale,
  taxation: Landmark,
};

export function MyCoursesView({ onOpenSubject, subjects }: MyCoursesViewProps) {
  return (
    <div className="flex flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
      <section>
        <p className="text-xs font-bold uppercase text-emerald-700">My Courses</p>
        <h2 className="mt-1 font-sans text-2xl font-black text-slate-950">
          Enrolled review subjects
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Open a subject to continue recorded lessons, track progress, and review the
          materials assigned to that program.
        </p>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {subjects.map((subject) => {
          const completedLessons = subject.lessons.filter(
            (lesson) => lesson.progress >= 100,
          ).length;
          const ThumbnailIcon = thumbnailIcons[subject.id] ?? BookOpen;

          return (
            <Card key={subject.id} className="gap-0 p-0 shadow-sm">
              <div
                aria-label={`${subject.title} course thumbnail`}
                className={cn(
                  "relative flex min-h-44 overflow-hidden bg-gradient-to-br p-5 text-white",
                  subject.thumbnail.tone,
                )}
                role="img"
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.18)_1px,transparent_1px,transparent_22px)]" />
                <div className="absolute right-5 top-5 grid grid-cols-3 gap-2 opacity-40">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <span
                      aria-hidden="true"
                      className="size-3 rounded-sm bg-white/60"
                      key={index}
                    />
                  ))}
                </div>
                <div className="relative mt-auto flex w-full items-end justify-between gap-4">
                  <div className="max-w-xs">
                    <p className="text-xs font-bold uppercase text-white/80">
                      {subject.thumbnail.label}
                    </p>
                    <h3 className="mt-2 font-sans text-2xl font-black leading-tight text-white">
                      {subject.title}
                    </h3>
                    <p className="mt-2 text-sm leading-5 text-white/80">
                      {subject.thumbnail.summary}
                    </p>
                  </div>
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-white/30 bg-white/15 backdrop-blur">
                    <ThumbnailIcon aria-hidden="true" size={30} />
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-11 items-center justify-center rounded-xl text-white",
                      subject.accent,
                    )}
                  >
                    <BookOpen size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <CardTitle className="font-sans text-lg font-black text-slate-950">
                      {subject.title}
                    </CardTitle>
                    <CardDescription>{subject.instructor}</CardDescription>
                  </div>
                </div>
                <CardAction>
                  <Badge variant="outline">{subject.progress}%</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Progress value={subject.progress} />
                <div className="grid gap-3 text-sm sm:grid-cols-3">
                  <div className="rounded-xl border bg-slate-50 p-3">
                    <p className="text-muted-foreground">Lessons</p>
                    <p className="mt-1 font-black">{subject.lessons.length}</p>
                  </div>
                  <div className="rounded-xl border bg-slate-50 p-3">
                    <p className="text-muted-foreground">Completed</p>
                    <p className="mt-1 font-black">{completedLessons}</p>
                  </div>
                  <div className="rounded-xl border bg-slate-50 p-3">
                    <p className="text-muted-foreground">Library</p>
                    <p className="mt-1 font-black">{subject.materials.length}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    <Clock data-icon="inline-start" />
                    Last watched this week
                  </Badge>
                  <Badge variant="secondary">
                    <Play data-icon="inline-start" />
                    Sequential unlock
                  </Badge>
                </div>
                <Button type="button" onClick={() => onOpenSubject(subject.id)}>
                  Continue subject
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
