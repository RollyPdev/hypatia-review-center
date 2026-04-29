import { CalendarDays, Clock, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const scheduleItems = [
  {
    title: "Auditing Theory Live Consultation",
    date: "May 04, 2026",
    time: "7:00 PM - 8:30 PM",
    type: "Online",
  },
  {
    title: "Taxation Problem Solving Clinic",
    date: "May 07, 2026",
    time: "6:30 PM - 8:00 PM",
    type: "Online",
  },
  {
    title: "Mock Exam Readiness Briefing",
    date: "May 11, 2026",
    time: "9:00 AM - 10:00 AM",
    type: "Campus",
  },
];

export function ScheduleView() {
  return (
    <div className="flex flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
      <section>
        <p className="text-xs font-bold uppercase text-emerald-700">Schedule</p>
        <h2 className="mt-1 font-sans text-2xl font-black text-slate-950">
          Upcoming review activities
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Keep track of live consultations, clinics, and exam readiness sessions assigned
          to your batch.
        </p>
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-sans text-lg font-black text-slate-950">
              This month
            </CardTitle>
            <CardDescription>Scheduled sessions from the academic team.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {scheduleItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-xl border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                    <CalendarDays size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.date}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.time}</p>
                  </div>
                </div>
                <Badge variant="secondary">{item.type}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="font-sans text-lg font-black text-slate-950">
              Today
            </CardTitle>
            <CardDescription>Recommended preparation window.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-xl border bg-slate-50 p-4">
              <Clock className="text-emerald-800" size={22} aria-hidden="true" />
              <p className="mt-3 text-sm text-muted-foreground">Suggested study block</p>
              <p className="mt-1 text-2xl font-black text-slate-950">2h 15m</p>
            </div>
            <Button>
              <Video data-icon="inline-start" />
              Join next session
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
