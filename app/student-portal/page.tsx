"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { DashboardView } from "@/components/student-portal/dashboard-view";
import { PortalLoginScreen } from "@/components/student-portal/login-screen";
import { MyCoursesView } from "@/components/student-portal/my-courses-view";
import type { PortalViewId } from "@/components/student-portal/portal-navigation";
import { portalSubjects } from "@/components/student-portal/portal-data";
import { PortalShell } from "@/components/student-portal/portal-shell";
import { RecordedLessonsView } from "@/components/student-portal/recorded-lessons-view";
import { ReviewLibraryView } from "@/components/student-portal/review-library-view";
import { ScheduleView } from "@/components/student-portal/schedule-view";
import { SupportView } from "@/components/student-portal/support-view";

export default function StudentPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeSubjectId, setActiveSubjectId] = useState(portalSubjects[0].id);
  const [activeView, setActiveView] = useState<PortalViewId>("dashboard");
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(2);
  const [lessonProgress, setLessonProgress] = useState(
    portalSubjects[0].lessons.map((lesson) => lesson.progress),
  );

  const activeSubject = useMemo(
    () =>
      portalSubjects.find((subject) => subject.id === activeSubjectId) ??
      portalSubjects[0],
    [activeSubjectId],
  );

  const completedLessons = lessonProgress.filter((progress) => progress >= 100).length;
  const selectedLesson = activeSubject.lessons[selectedLessonIndex] ?? activeSubject.lessons[0];
  const selectedProgress = lessonProgress[selectedLessonIndex] ?? 0;
  const overallProgress = Math.round(
    portalSubjects.reduce((total, subject) => total + subject.progress, 0) /
      portalSubjects.length,
  );

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const submittedUsername = String(formData.get("username") ?? "").trim();
    const submittedPassword = String(formData.get("password") ?? "").trim();

    if (!submittedUsername || !submittedPassword) {
      setLoginError("Enter the username and password issued by the admin.");
      return;
    }

    setLoginError("");
    setIsLoggedIn(true);
  };

  const changeSubject = (subjectId: string) => {
    const nextSubject =
      portalSubjects.find((subject) => subject.id === subjectId) ?? portalSubjects[0];
    const nextLessonIndex = nextSubject.lessons.findIndex(
      (lesson) => lesson.progress < 100,
    );

    setActiveSubjectId(nextSubject.id);
    setSelectedLessonIndex(nextLessonIndex >= 0 ? nextLessonIndex : 0);
    setLessonProgress(nextSubject.lessons.map((lesson) => lesson.progress));
  };

  const selectLesson = (index: number) => {
    const previousLessonDone = index === 0 || lessonProgress[index - 1] >= 100;

    if (!previousLessonDone) {
      return;
    }

    setSelectedLessonIndex(index);
  };

  const advanceVideo = () => {
    setLessonProgress((progress) =>
      progress.map((value, index) =>
        index === selectedLessonIndex ? Math.min(value + 25, 100) : value,
      ),
    );
  };

  const updateVideoProgress = (nextProgress: number) => {
    setLessonProgress((progress) =>
      progress.map((value, index) =>
        index === selectedLessonIndex ? Math.max(value, nextProgress) : value,
      ),
    );
  };

  const openSubjectLessons = (subjectId: string) => {
    changeSubject(subjectId);
    setActiveView("recorded-lessons");
  };

  if (!isLoggedIn) {
    return <PortalLoginScreen loginError={loginError} onLogin={handleLogin} />;
  }

  const sharedLessonViewProps = {
    activeSubject,
    activeSubjectId,
    completedLessons,
    lessonProgress,
    onAdvanceVideo: advanceVideo,
    onSelectLesson: selectLesson,
    onSubjectChange: changeSubject,
    onVideoProgress: updateVideoProgress,
    overallProgress,
    selectedLesson,
    selectedLessonIndex,
    selectedProgress,
    subjects: portalSubjects,
  };

  const activePortalView = (() => {
    switch (activeView) {
      case "my-courses":
        return (
          <MyCoursesView subjects={portalSubjects} onOpenSubject={openSubjectLessons} />
        );
      case "recorded-lessons":
        return <RecordedLessonsView {...sharedLessonViewProps} />;
      case "review-library":
        return <ReviewLibraryView subjects={portalSubjects} />;
      case "schedule":
        return <ScheduleView />;
      case "support":
        return <SupportView />;
      case "dashboard":
      default:
        return <DashboardView {...sharedLessonViewProps} />;
    }
  })();

  return (
    <PortalShell
      activeView={activeView}
      onLogout={() => setIsLoggedIn(false)}
      onViewChange={setActiveView}
    >
      {activePortalView}
    </PortalShell>
  );
}
