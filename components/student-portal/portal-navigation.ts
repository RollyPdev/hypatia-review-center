import {
  BookOpen,
  CalendarDays,
  Headphones,
  Library,
  Menu,
  Play,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PortalViewId =
  | "dashboard"
  | "my-courses"
  | "recorded-lessons"
  | "review-library"
  | "schedule"
  | "support";

export const portalNavigationItems: Array<{
  id: PortalViewId;
  label: string;
  icon: LucideIcon;
}> = [
  { id: "dashboard", label: "Dashboard", icon: Menu },
  { id: "my-courses", label: "My Courses", icon: BookOpen },
  { id: "recorded-lessons", label: "Recorded Lessons", icon: Play },
  { id: "review-library", label: "Review Library", icon: Library },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "support", label: "Support", icon: Headphones },
];
