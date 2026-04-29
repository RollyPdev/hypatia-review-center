"use client";

import { Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { Lesson, PortalSubject } from "./types";
import { VideoLessonCard } from "./video-lesson-card";

type LessonDashboardProps = {
  activeSubjectId: string;
  completedLessons: number;
  lessonProgress: number[];
  onAdvanceVideo: () => void;
  onSelectLesson: (index: number) => void;
  onSubjectChange: (subjectId: string) => void;
  onVideoProgress: (progress: number) => void;
  selectedLesson: Lesson;
  selectedLessonIndex: number;
  selectedProgress: number;
  subjects: PortalSubject[];
};

export function LessonDashboard({
  activeSubjectId,
  completedLessons,
  lessonProgress,
  onAdvanceVideo,
  onSelectLesson,
  onSubjectChange,
  onVideoProgress,
  selectedLesson,
  selectedLessonIndex,
  selectedProgress,
  subjects,
}: LessonDashboardProps) {
  return (
    <Tabs value={activeSubjectId} onValueChange={onSubjectChange}>
      <div className="flex flex-col gap-3 rounded-xl border bg-background p-3 lg:flex-row lg:items-center lg:justify-between">
        <TabsList className="w-full overflow-x-auto lg:w-fit">
          {subjects.map((subject) => (
            <TabsTrigger key={subject.id} value={subject.id}>
              {subject.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <Badge variant="outline" className="w-fit text-emerald-800">
          <Clock data-icon="inline-start" />
          Last watched today
        </Badge>
      </div>

      {subjects.map((subject) => (
        <TabsContent key={subject.id} value={subject.id} className="mt-5">
          <VideoLessonCard
            completedLessons={completedLessons}
            lessonProgress={lessonProgress}
            onAdvanceVideo={onAdvanceVideo}
            onSelectLesson={onSelectLesson}
            onVideoProgress={onVideoProgress}
            selectedLesson={selectedLesson}
            selectedLessonIndex={selectedLessonIndex}
            selectedProgress={selectedProgress}
            subject={subject}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
