import { MonitorCheck, User } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import type { PortalSubject } from "./types";

type StatusSidebarProps = {
  activeSubject: PortalSubject;
  overallProgress: number;
};

export function StatusSidebar({ activeSubject, overallProgress }: StatusSidebarProps) {
  return (
    <aside className="flex flex-col gap-5">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-sans text-lg font-black text-slate-950">
            Your Progress
          </CardTitle>
          <CardDescription>Overall completion across enrolled subjects.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="rounded-xl border bg-slate-50 p-4">
            <div className="flex items-end justify-between gap-3">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="text-3xl font-black text-slate-950">
                {overallProgress}%
              </span>
            </div>
            <Progress value={overallProgress} className="mt-4" />
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border p-3">
              <p className="text-muted-foreground">Study time</p>
              <p className="mt-1 font-black">18h 45m</p>
            </div>
            <div className="rounded-xl border p-3">
              <p className="text-muted-foreground">Streak</p>
              <p className="mt-1 font-black">7 days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-sans text-lg font-black text-slate-950">
            Device Status
          </CardTitle>
          <CardDescription>Single-device access is active.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <MonitorCheck />
            <AlertTitle>Device secured</AlertTitle>
            <AlertDescription>
              This student account is signed in on this browser only. Another device
              requires admin reset before access is allowed.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-sans text-lg font-black text-slate-950">
            Current Subject
          </CardTitle>
          <CardDescription>{activeSubject.title}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Progress value={activeSubject.progress} />
          <Separator />
          <div className="flex items-center gap-3">
            <User size={18} aria-hidden="true" className="text-emerald-800" />
            <div>
              <p className="text-sm font-bold">{activeSubject.instructor}</p>
              <p className="text-xs text-muted-foreground">Subject lecturer</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
