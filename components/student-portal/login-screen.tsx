"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { Lock, ShieldCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type PortalLoginScreenProps = {
  loginError: string;
  onLogin: (event: FormEvent<HTMLFormElement>) => void;
};

export function PortalLoginScreen({ loginError, onLogin }: PortalLoginScreenProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="grid min-h-screen lg:grid-cols-[1fr_480px]">
        <div className="hidden bg-emerald-950 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-2xl font-black">
              H
            </div>
            <div>
              <p className="text-xl font-black uppercase tracking-normal">Hypatia</p>
              <p className="text-xs font-bold uppercase text-emerald-100">
                Student Learning Portal
              </p>
            </div>
          </div>

          <div className="max-w-2xl">
            <Badge className="bg-amber-400 text-emerald-950">
              Admin-issued access only
            </Badge>
            <h1 className="mt-8 max-w-xl font-sans text-5xl font-black leading-tight text-white">
              Continue your review program from one secured device.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-8 text-emerald-50">
              Watch recorded lessons in sequence, open subject review libraries, and keep
              your board exam preparation organized in one professional dashboard.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm text-emerald-50">
            {["Sequential videos", "Subject libraries", "Device lock"].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <ShieldCheck className="mb-3" size={20} aria-hidden="true" />
                <p className="font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center px-5 py-10">
          <Card className="w-full max-w-md shadow-sm">
            <CardHeader>
              <CardTitle className="font-sans text-2xl font-black text-emerald-950">
                Student Portal
              </CardTitle>
              <CardDescription>
                Sign in with the username and password provided by the admin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onLogin} className="flex flex-col gap-5">
                <FieldGroup>
                  <Field data-invalid={Boolean(loginError)}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      id="username"
                      name="username"
                      placeholder="student-2026-001"
                      aria-invalid={Boolean(loginError)}
                      autoComplete="username"
                    />
                  </Field>
                  <Field data-invalid={Boolean(loginError)}>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter admin-issued password"
                      aria-invalid={Boolean(loginError)}
                      autoComplete="current-password"
                    />
                    <FieldDescription>
                      This portal has no public sign up. Access is created by the admin.
                    </FieldDescription>
                  </Field>
                </FieldGroup>

                {loginError ? (
                  <Alert variant="destructive">
                    <Lock />
                    <AlertTitle>Login details required</AlertTitle>
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                ) : null}

                <Button type="submit" size="lg" className="bg-emerald-700 hover:bg-emerald-800">
                  <ShieldCheck data-icon="inline-start" />
                  Login to portal
                </Button>
              </form>
            </CardContent>
            <CardFooter className="justify-between gap-4 text-xs text-muted-foreground">
              <span>One active device per student</span>
              <Link href="/" className="font-bold text-emerald-800">
                Back to website
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
}
