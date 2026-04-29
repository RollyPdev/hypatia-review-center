"use client";

import { useCallback, type SyntheticEvent } from "react";
import dynamic from "next/dynamic";
import { Check, ChevronRight, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

import type { Lesson, PortalSubject } from "./types";

const ReactPlayer = dynamic(() => import("react-player"), {
  loading: () => (
    <div className="flex size-full items-center justify-center bg-emerald-950 text-sm font-bold text-white">
      Loading recorded video...
    </div>
  ),
  ssr: false,
});

const DEMO_RECORDED_LESSON_URL =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

function protectRecordedVideo(video: HTMLVideoElement) {
  video.setAttribute("controlsList", "nodownload noplaybackrate noremoteplayback");
  video.setAttribute("disablePictureInPicture", "");
  video.setAttribute("disableRemotePlayback", "");
  video.disablePictureInPicture = true;
  video.disableRemotePlayback = true;
  video.draggable = false;
}

type VideoLessonCardProps = {
  completedLessons: number;
  lessonProgress: number[];
  onAdvanceVideo: () => void;
  onSelectLesson: (index: number) => void;
  onVideoProgress: (progress: number) => void;
  selectedLesson: Lesson;
  selectedLessonIndex: number;
  selectedProgress: number;
  subject: PortalSubject;
};

export function VideoLessonCard({
  completedLessons,
  lessonProgress,
  onAdvanceVideo,
  onSelectLesson,
  onVideoProgress,
  selectedLesson,
  selectedLessonIndex,
  selectedProgress,
  subject,
}: VideoLessonCardProps) {
  const videoSource = selectedLesson.videoUrl ?? DEMO_RECORDED_LESSON_URL;

  const setProtectedVideoRef = useCallback((video: HTMLVideoElement | null) => {
    if (video) {
      protectRecordedVideo(video);
    }
  }, []);

  const preventProtectedVideoGesture = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const handleVideoTimeUpdate = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;

    if (!Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    const nextProgress = Math.min(
      100,
      Math.floor((video.currentTime / video.duration) * 100),
    );

    if (nextProgress > selectedProgress) {
      onVideoProgress(nextProgress);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b">
        <div>
          <CardTitle className="font-sans text-xl font-black text-slate-950">
            {subject.title}: {selectedLesson.title}
          </CardTitle>
          <CardDescription>
            {subject.instructor} / Chapter {selectedLessonIndex + 1} / Recorded lesson
          </CardDescription>
        </div>
        <CardAction>
          <Badge className="bg-emerald-700">
            {completedLessons} of {subject.lessons.length} complete
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="grid gap-5 pt-4 xl:grid-cols-[minmax(0,1fr)_310px]">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-xl bg-emerald-950 text-white">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
              <div>
                <Badge className="bg-white text-emerald-950">Recorded lesson</Badge>
                <p className="mt-2 text-sm font-bold">{selectedLesson.title}</p>
              </div>
              <span className="text-sm font-bold">{selectedLesson.duration}</span>
            </div>
            <div
              className="relative aspect-video select-none bg-black"
              onContextMenu={preventProtectedVideoGesture}
              onCopy={preventProtectedVideoGesture}
              onCut={preventProtectedVideoGesture}
              onDragStart={preventProtectedVideoGesture}
            >
              <ReactPlayer
                controls
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                disableRemotePlayback
                height="100%"
                onEnded={() => onVideoProgress(100)}
                onContextMenu={preventProtectedVideoGesture}
                onDragStart={preventProtectedVideoGesture}
                onTimeUpdate={handleVideoTimeUpdate}
                pip={false}
                playsInline
                preload="metadata"
                ref={setProtectedVideoRef}
                src={videoSource}
                style={{
                  height: "100%",
                  width: "100%",
                }}
                width="100%"
              />
            </div>
            <div className="flex flex-col gap-3 px-4 py-3">
              <Progress value={selectedProgress} />
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <span>{selectedProgress}% watched</span>
                <span className="font-bold">Hypatia Review Center / {subject.title}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 rounded-xl border bg-slate-50 p-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">You are watching</p>
              <p className="text-sm font-bold">Lesson {selectedLessonIndex + 1}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Progress</p>
              <p className="text-sm font-bold">{selectedProgress}%</p>
            </div>
            <div className="flex items-center justify-start gap-2 sm:justify-end">
              <button
                type="button"
                onClick={onAdvanceVideo}
                disabled={selectedProgress >= 100}
                className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
              >
                <Check size={16} aria-hidden="true" />
                {selectedProgress >= 100 ? "Completed" : "Simulate watch"}
              </button>
            </div>
          </div>
        </div>

        <LessonList
          lessons={subject.lessons}
          lessonProgress={lessonProgress}
          selectedLessonIndex={selectedLessonIndex}
          onSelectLesson={onSelectLesson}
        />
      </CardContent>
    </Card>
  );
}

type LessonListProps = {
  lessonProgress: number[];
  lessons: Lesson[];
  onSelectLesson: (index: number) => void;
  selectedLessonIndex: number;
};

function LessonList({
  lessonProgress,
  lessons,
  onSelectLesson,
  selectedLessonIndex,
}: LessonListProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-bold">Recorded Lessons</p>
          <p className="text-xs text-muted-foreground">
            Finish each video to unlock the next.
          </p>
        </div>
        <Badge variant="secondary">{lessons.length} lessons</Badge>
      </div>

      <div className="flex flex-col gap-2">
        {lessons.map((lesson, index) => {
          const progress = lessonProgress[index] ?? 0;
          const isLocked = index > 0 && (lessonProgress[index - 1] ?? 0) < 100;
          const isSelected = selectedLessonIndex === index;

          return (
            <button
              key={lesson.title}
              type="button"
              onClick={() => onSelectLesson(index)}
              disabled={isLocked}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-3 py-3 text-left transition",
                isSelected
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-transparent bg-slate-50 hover:border-slate-200 hover:bg-background",
                isLocked && "cursor-not-allowed opacity-60",
              )}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-black",
                  progress >= 100 && "bg-emerald-700 text-white",
                  progress < 100 && isLocked && "bg-slate-200 text-slate-500",
                  progress < 100 &&
                    !isLocked &&
                    "bg-white text-emerald-800 ring-1 ring-emerald-200",
                )}
              >
                {progress >= 100 ? (
                  <Check size={15} aria-hidden="true" />
                ) : isLocked ? (
                  <Lock size={14} aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold">{lesson.title}</span>
                <span className="text-xs text-muted-foreground">
                  {isLocked ? "Locked until previous lesson is completed" : lesson.duration}
                </span>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
