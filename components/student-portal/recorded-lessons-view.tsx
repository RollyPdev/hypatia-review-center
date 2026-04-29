"use client";

import { LessonDashboard } from "./lesson-dashboard";
import { StatusSidebar } from "./status-sidebar";
import type { Lesson, PortalSubject } from "./types";

type RecordedLessonsViewProps = {
  activeSubject: PortalSubject;
  activeSubjectId: string;
  completedLessons: number;
  lessonProgress: number[];
  onAdvanceVideo: () => void;
  onSelectLesson: (index: number) => void;
  onSubjectChange: (subjectId: string) => void;
  onVideoProgress: (progress: number) => void;
  overallProgress: number;
  selectedLesson: Lesson;
  selectedLessonIndex: number;
  selectedProgress: number;
  subjects: PortalSubject[];
};

export function RecordedLessonsView({
  activeSubject,
  activeSubjectId,
  completedLessons,
  lessonProgress,
  onAdvanceVideo,
  onSelectLesson,
  onSubjectChange,
  onVideoProgress,
  overallProgress,
  selectedLesson,
  selectedLessonIndex,
  selectedProgress,
  subjects,
}: RecordedLessonsViewProps) {
  return (
    <div className="grid gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
      <LessonDashboard
        activeSubjectId={activeSubjectId}
        completedLessons={completedLessons}
        lessonProgress={lessonProgress}
        onAdvanceVideo={onAdvanceVideo}
        onSelectLesson={onSelectLesson}
        onSubjectChange={onSubjectChange}
        onVideoProgress={onVideoProgress}
        selectedLesson={selectedLesson}
        selectedLessonIndex={selectedLessonIndex}
        selectedProgress={selectedProgress}
        subjects={subjects}
      />
      <StatusSidebar activeSubject={activeSubject} overallProgress={overallProgress} />
    </div>
  );
}
