import { Headphones, Mail, MessageCircle, ShieldCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const supportOptions = [
  {
    title: "Admissions and account access",
    desc: "Request password resets, device reset approval, and account access help.",
    action: "Email admissions",
    icon: Mail,
  },
  {
    title: "Academic concern",
    desc: "Ask about lesson sequencing, mock exams, subject materials, or lecturer notes.",
    action: "Message coordinator",
    icon: MessageCircle,
  },
  {
    title: "Technical support",
    desc: "Report playback issues, locked lesson problems, or portal loading errors.",
    action: "Contact support",
    icon: Headphones,
  },
];

export function SupportView() {
  return (
    <div className="flex flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
      <section>
        <p className="text-xs font-bold uppercase text-emerald-700">Support</p>
        <h2 className="mt-1 font-sans text-2xl font-black text-slate-950">
          Student assistance center
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Choose the right support path for account, academic, or technical concerns.
        </p>
      </section>

      <Alert>
        <ShieldCheck />
        <AlertTitle>Single-device account policy</AlertTitle>
        <AlertDescription>
          If you need to transfer access to another device, contact admissions so the admin
          can reset your active session.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 lg:grid-cols-3">
        {supportOptions.map((option) => {
          const Icon = option.icon;

          return (
            <Card key={option.title} className="shadow-sm">
              <CardHeader>
                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <CardTitle className="font-sans text-lg font-black text-slate-950">
                  {option.title}
                </CardTitle>
                <CardDescription>{option.desc}</CardDescription>
                <CardAction />
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
