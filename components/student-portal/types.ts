export type Lesson = {
  title: string;
  duration: string;
  progress: number;
  videoUrl?: string;
};

export type ReviewMaterial = {
  coverSubtitle: string;
  coverTone: string;
  pages: Array<{
    heading: string;
    points: string[];
  }>;
  type: string;
  title: string;
  updated: string;
};

export type CourseThumbnail = {
  label: string;
  summary: string;
  tone: string;
};

export type PortalSubject = {
  id: string;
  title: string;
  instructor: string;
  accent: string;
  thumbnail: CourseThumbnail;
  progress: number;
  lessons: Lesson[];
  materials: ReviewMaterial[];
};
