"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  FileText,
  GraduationCap,
  Landmark,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  Trophy,
  UserCheck,
  Users,
  X,
} from "lucide-react";

import { EnrollmentModal } from "@/components/enrollment/enrollment-modal";

const NAV_ITEMS = [
  { label: "Institution", id: "about" },
  { label: "Programs", id: "programs" },
  { label: "Lecturers", id: "lecturers" },
  { label: "Method", id: "method" },
  { label: "Admissions", id: "contact" },
];

const HERO_SLIDES = [
  {
    eyebrow: "Established 1999",
    location: "Quezon City Campus",
    title: "Board exam preparation with academic discipline and professional care.",
    desc: "Hypatia Review Center helps aspiring professionals prepare with focused modules, expert lecturers, mock examinations, and admissions guidance from enrollment to exam day.",
    image: "/hero-academic.png",
    imageAlt: "Students attending a structured review class",
    cardLabel: "Next Batch",
    cardValue: "June 15, 2026",
    cardText: "Orientation and diagnostic exam",
    sideLabel: "Admissions Desk",
    sideValue: "24 hrs",
    sideText: "Average response time for inquiries",
    chips: ["Licensure review", "Civil service", "CPD seminars"],
  },
  {
    eyebrow: "Expert Faculty",
    location: "Mentor-led Review",
    title: "Learn from practitioners who know what exam readiness requires.",
    desc: "Our lecturers combine subject mastery, board exam strategy, and weekly checkpoints so students can study with structure instead of guesswork.",
    image: "/hero-professional.png",
    imageAlt: "Faculty-led review discussion in a professional classroom",
    cardLabel: "Faculty Support",
    cardValue: "120+",
    cardText: "Lecturers, mentors, and academic coaches",
    sideLabel: "Review System",
    sideValue: "3-step",
    sideText: "Diagnose, review, and simulate",
    chips: ["Faculty coaching", "Mock exams", "Study calendar"],
  },
  {
    eyebrow: "Proven Outcomes",
    location: "Professional Pathways",
    title: "Prepare with the confidence of a review center built for results.",
    desc: "Students train through updated modules, realistic exam simulations, and guided admissions support for licensure, civil service, and CPD tracks.",
    image: "/hero-success.png",
    imageAlt: "Professional mentor in a modern academic campus",
    cardLabel: "Alumni Network",
    cardValue: "50k+",
    cardText: "Professionals who started their journey with Hypatia",
    sideLabel: "Track Options",
    sideValue: "3",
    sideText: "LEC, CSE, and CPD programs",
    chips: ["Updated modules", "Career outcomes", "Exam strategy"],
  },
];

const PROGRAMS = [
  {
    id: "lec",
    title: "Criminologist Licensure",
    label: "LEC Review",
    desc: "A disciplined review track for future law enforcement professionals, focused on board exam mastery and applied criminology.",
    icon: Trophy,
    image: "/hero-professional.png",
    features: ["PRC-aligned modules", "Board-style mock exams", "Case-based mentoring"],
  },
  {
    id: "cse",
    title: "Civil Service Exam",
    label: "CSE Professional",
    desc: "A practical preparation program for analytical reasoning, verbal aptitude, numerical ability, and general information.",
    icon: ClipboardCheck,
    image: "/hero-academic.png",
    features: ["Timed drills", "Reasoning workshops", "Diagnostic coaching"],
  },
  {
    id: "cpd",
    title: "CPD Provider Services",
    label: "Professional CPD",
    desc: "Continuing education seminars and learning sessions designed for licensed professionals who need credible development hours.",
    icon: Users,
    image: "/hero-success.png",
    features: ["PRC credited", "Industry lecturers", "Updated learning modules"],
  },
];

const LECTURERS = [
  {
    name: "Dr. Rosario Dela Cruz",
    initials: "RD",
    photo: "/lecturer-portraits.png",
    photoPosition: "left center",
    role: "Academic Director",
    expertise: "Criminology Board Strategy",
    summary:
      "Leads licensure review planning, faculty calibration, and post-mock exam coaching for high-stakes board preparation.",
    credentials: ["PhD Criminology", "Board review mentor", "Mock exam panelist"],
  },
  {
    name: "Atty. Miguel Reyes",
    initials: "MR",
    photo: "/lecturer-portraits.png",
    photoPosition: "center center",
    role: "Legal Reasoning Lecturer",
    expertise: "Criminal Law and Procedure",
    summary:
      "Guides students through rule application, case analysis, and examination patterns for law-heavy review topics.",
    credentials: ["Legal reasoning", "Case-based lectures", "Exam strategy"],
  },
  {
    name: "Prof. Elena Mercado",
    initials: "EM",
    photo: "/lecturer-portraits.png",
    photoPosition: "right center",
    role: "Civil Service Coach",
    expertise: "Quantitative and Analytical Skills",
    summary:
      "Builds speed, accuracy, and confidence through diagnostic drills, timed practice, and structured feedback sessions.",
    credentials: ["CSE Professional", "Reasoning drills", "Performance tracking"],
  },
];

const STATS = [
  { icon: Trophy, value: "98%", label: "Reported passing rate" },
  { icon: GraduationCap, value: "50k+", label: "Alumni professionals" },
  { icon: Users, value: "120+", label: "Faculty and mentors" },
  { icon: Calendar, value: "25+", label: "Years of review excellence" },
];

const METHOD_STEPS = [
  {
    title: "Diagnose",
    desc: "Students begin with a readiness assessment so faculty can identify strengths, gaps, and pacing needs.",
    icon: FileText,
  },
  {
    title: "Review",
    desc: "Core lessons are taught through structured modules, live discussions, and guided problem-solving sessions.",
    icon: BookOpen,
  },
  {
    title: "Simulate",
    desc: "Mock exams mirror licensure pressure, timing, and question patterns, followed by detailed performance coaching.",
    icon: ShieldCheck,
  },
];

const DIFFERENTIATORS = [
  "Updated modules reviewed against current examination trends",
  "Faculty-led consultations for difficult subjects and exam strategy",
  "Structured review calendar with weekly milestone checkpoints",
];

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enrollmentOpen, setEnrollmentOpen] = useState(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const activeHeroSlide = HERO_SLIDES[currentHeroSlide];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCurrentHeroSlide((slide) => (slide + 1) % HERO_SLIDES.length);
    }, 6500);

    return () => window.clearTimeout(timer);
  }, [currentHeroSlide]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);

    if (el) {
      const offset = 84;
      const elementPosition =
        el.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const goToPreviousHeroSlide = () => {
    setCurrentHeroSlide((slide) =>
      slide === 0 ? HERO_SLIDES.length - 1 : slide - 1,
    );
  };

  const goToNextHeroSlide = () => {
    setCurrentHeroSlide((slide) => (slide + 1) % HERO_SLIDES.length);
  };

  const openEnrollmentModal = () => {
    setMobileMenuOpen(false);
    setEnrollmentOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <EnrollmentModal
        open={enrollmentOpen}
        onOpenChange={setEnrollmentOpen}
        programs={PROGRAMS.map(({ id, title }) => ({ id, title }))}
      />
      <div className="bg-emerald-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 text-xs font-semibold sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-emerald-50">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={14} aria-hidden="true" />
              Official PRC CPD Provider No. 2024-123
            </span>
            <span className="hidden text-emerald-200 sm:inline">
              Enrollment consultations now open
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-emerald-100">
            <a
              href="tel:+630281234567"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone size={14} aria-hidden="true" />
              +63 (02) 8123-4567
            </a>
            <a
              href="mailto:admissions@hypatia.edu.ph"
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail size={14} aria-hidden="true" />
              admissions@hypatia.edu.ph
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            <a
              href="#"
              className="flex items-center gap-3"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Hypatia Review Center home"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-900 text-xl font-bold text-white shadow-sm">
                H
              </div>
              <div className="leading-none">
                <span className="block text-lg font-black uppercase text-emerald-950">
                  Hypatia
                </span>
                <span className="mt-1 block text-[10px] font-bold uppercase text-slate-500">
                  Review Center
                </span>
              </div>
            </a>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className="text-sm font-bold text-slate-600 transition-colors hover:text-emerald-700"
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/student-portal"
                className="rounded-lg border border-emerald-200 px-3 py-2 text-sm font-bold text-emerald-800 transition-colors hover:border-emerald-700 hover:bg-emerald-50"
              >
                Student Portal
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openEnrollmentModal}
                className="hidden rounded-lg bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-emerald-900/15 transition hover:bg-emerald-800 sm:inline-flex"
              >
                Enroll Now
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-emerald-950 transition hover:border-emerald-700 hover:text-emerald-700 lg:hidden"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav
              className="max-h-[calc(100vh-9rem)] overflow-y-auto border-t border-slate-200 py-3 lg:hidden"
              aria-label="Mobile navigation"
            >
              <div className="grid gap-2">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(item.id);
                    }}
                    className="rounded-lg px-3 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  href="/student-portal"
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-bold text-emerald-800 transition-colors hover:border-emerald-700 hover:bg-emerald-100"
                >
                  Student Portal
                </Link>
                <button
                  type="button"
                  onClick={openEnrollmentModal}
                  className="mt-1 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white"
                >
                  Enroll Now
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute inset-x-0 top-0 h-1 bg-emerald-900" aria-hidden="true" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-12 pt-14 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8 lg:pb-16 lg:pt-16">
            <div
              className="lg:col-span-6"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800">
                <Star size={14} className="fill-emerald-700 text-emerald-700" aria-hidden="true" />
                {activeHeroSlide.eyebrow}
                <span className="h-1 w-1 rounded-full bg-emerald-700" aria-hidden="true" />
                {activeHeroSlide.location}
              </div>

              <h1 className="max-w-3xl text-4xl leading-[1.05] text-emerald-950 sm:text-5xl lg:text-6xl">
                {activeHeroSlide.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {activeHeroSlide.desc}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => scrollTo("programs")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800"
                >
                  Explore Programs
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-900 px-6 py-4 text-sm font-bold text-emerald-950 transition hover:bg-emerald-950 hover:text-white"
                >
                  Request Admissions Call
                </button>
              </div>

              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
                {activeHeroSlide.chips.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 shadow-sm"
                  >
                    <CheckCircle size={16} className="text-emerald-700" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-3" aria-label="Hero slider controls">
                <button
                  type="button"
                  onClick={goToPreviousHeroSlide}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-50"
                  aria-label="Show previous hero slide"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
                  {HERO_SLIDES.map((slide, index) => (
                    <button
                      key={slide.title}
                      type="button"
                      onClick={() => setCurrentHeroSlide(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        currentHeroSlide === index
                          ? "w-9 bg-emerald-800"
                          : "w-2.5 bg-slate-300 hover:bg-emerald-300"
                      }`}
                      role="tab"
                      aria-selected={currentHeroSlide === index}
                      aria-label={`Show hero slide ${index + 1}: ${slide.eyebrow}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={goToNextHeroSlide}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-emerald-950 transition hover:border-emerald-800 hover:bg-emerald-50"
                  aria-label="Show next hero slide"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
                <span className="ml-1 text-xs font-bold uppercase text-slate-500">
                  {currentHeroSlide + 1} / {HERO_SLIDES.length}
                </span>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-xl">
                <div className="relative aspect-[5/4] overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-300/40">
                  <Image
                    key={activeHeroSlide.image}
                    src={activeHeroSlide.image}
                    alt={activeHeroSlide.imageAlt}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover transition duration-700"
                  />
                  <div className="absolute inset-0 bg-emerald-950/10" aria-hidden="true" />
                </div>

                <div className="absolute -bottom-6 left-4 right-4 rounded-lg border border-slate-200 bg-white p-4 shadow-xl shadow-slate-300/30 sm:left-8 sm:right-auto sm:w-72">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                      <Award size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500">
                        {activeHeroSlide.cardLabel}
                      </p>
                      <p className="mt-1 text-base font-black text-emerald-950">
                        {activeHeroSlide.cardValue}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {activeHeroSlide.cardText}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-2 -top-6 hidden w-56 rounded-lg border border-emerald-100 bg-emerald-950 p-4 text-white shadow-xl shadow-emerald-950/20 sm:block">
                  <p className="text-xs font-bold uppercase text-emerald-200">
                    {activeHeroSlide.sideLabel}
                  </p>
                  <p className="mt-2 text-2xl font-black">{activeHeroSlide.sideValue}</p>
                  <p className="mt-1 text-sm text-emerald-100">
                    {activeHeroSlide.sideText}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
            <div className="grid overflow-hidden rounded-lg border border-slate-200 bg-slate-50 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat) => {
                const StatIcon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="border-b border-slate-200 p-6 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-emerald-800 shadow-sm">
                        <StatIcon size={22} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-3xl font-black text-emerald-950">{stat.value}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-500">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="about" className="bg-slate-50 py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-300/30">
                <Image
                  src="/hero-professional.png"
                  alt="Faculty-led review discussion at Hypatia Review Center"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-sm font-black uppercase text-emerald-700">
                The Institution
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl leading-tight text-emerald-950 sm:text-4xl lg:text-5xl">
                Built for students who need structure, confidence, and measurable progress.
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Hypatia blends rigorous instruction with a guided student experience.
                Each review cycle is organized around clear milestones, responsive
                faculty support, and exam simulations that prepare students for the
                pressure of the actual test.
              </p>

              <div className="mt-8 grid gap-4">
                {DIFFERENTIATORS.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <CheckCircle className="mt-0.5 shrink-0 text-emerald-700" size={21} aria-hidden="true" />
                    <p className="font-semibold leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="programs" className="bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-sm font-black uppercase text-emerald-700">
                  Academic Tracks
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl leading-tight text-emerald-950 sm:text-4xl lg:text-5xl">
                  Programs designed around the exam you need to pass.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:col-span-5">
                Each track has a clear learning path, curated materials, and review
                checkpoints so students know where they stand before examination day.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {PROGRAMS.map((program) => {
                const ProgramIcon = program.icon;

                return (
                  <article
                    key={program.id}
                    className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/30"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <Image
                        src={program.image}
                        alt={`${program.title} program preview`}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-4 top-4 rounded-lg bg-white/95 px-3 py-2 text-xs font-black text-emerald-950 shadow-sm">
                        {program.label}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                        <ProgramIcon size={24} aria-hidden="true" />
                      </div>
                      <h3 className="text-2xl text-emerald-950">{program.title}</h3>
                      <p className="mt-4 leading-7 text-slate-600">{program.desc}</p>
                      <ul className="mt-6 space-y-3">
                        {program.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                          >
                            <ChevronRight size={16} className="text-emerald-700" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => scrollTo("contact")}
                        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold text-emerald-950 transition hover:border-emerald-900 hover:bg-emerald-950 hover:text-white"
                      >
                        Inquire About This Track
                        <ArrowRight size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="lecturers" className="border-y border-slate-200 bg-slate-50 py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="text-sm font-black uppercase text-emerald-700">
                  Lecturers
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl leading-tight text-emerald-950 sm:text-4xl lg:text-5xl">
                  Faculty who teach with clarity, discipline, and board exam focus.
                </h2>
              </div>
              <div className="rounded-lg border border-emerald-100 bg-white p-6 shadow-sm lg:col-span-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                    <UserCheck size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-emerald-700">
                      Faculty Standard
                    </p>
                    <p className="mt-2 leading-7 text-slate-600">
                      Every lecturer is selected for subject mastery, exam strategy,
                      and the ability to turn difficult topics into structured review
                      sessions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {LECTURERS.map((lecturer) => (
                <article
                  key={lecturer.name}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/30"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={lecturer.photo}
                      alt={`${lecturer.name}, ${lecturer.role}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: lecturer.photoPosition }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-base font-black text-emerald-950 shadow-lg">
                      {lecturer.initials}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <h3 className="text-2xl text-emerald-950">{lecturer.name}</h3>
                        <p className="mt-1 text-sm font-bold text-emerald-700">
                          {lecturer.role}
                        </p>
                      </div>
                      <Award className="mt-1 shrink-0 text-emerald-700" size={22} aria-hidden="true" />
                    </div>

                    <div className="mt-6 border-t border-slate-200 pt-5">
                      <p className="text-xs font-black uppercase text-slate-500">
                        Area of Focus
                      </p>
                      <p className="mt-2 font-bold text-emerald-950">
                        {lecturer.expertise}
                      </p>
                    </div>

                    <p className="mt-5 leading-7 text-slate-600">{lecturer.summary}</p>

                    <ul className="mt-6 space-y-3">
                      {lecturer.credentials.map((credential) => (
                        <li
                          key={credential}
                          className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                        >
                          <CheckCircle size={16} className="text-emerald-700" aria-hidden="true" />
                          {credential}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="method" className="bg-emerald-950 py-20 text-white lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <p className="text-sm font-black uppercase text-emerald-300">
                  The Hypatia Method
                </p>
                <h2 className="mt-4 text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                  A review rhythm that keeps students accountable.
                </h2>
                <p className="mt-6 text-lg leading-8 text-emerald-100">
                  The program is designed to replace guesswork with a repeatable
                  preparation cycle: diagnose, review, simulate, and refine.
                </p>
              </div>

              <div className="grid gap-4 lg:col-span-7">
                {METHOD_STEPS.map((step, index) => {
                  const StepIcon = step.icon;

                  return (
                    <div
                      key={step.title}
                      className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.06] p-6 sm:grid-cols-[auto_1fr]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-emerald-900">
                        <StepIcon size={24} aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-emerald-300">
                            0{index + 1}
                          </span>
                          <h3 className="text-2xl text-white">{step.title}</h3>
                        </div>
                        <p className="mt-3 leading-7 text-emerald-100">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
            <div className="lg:col-span-6">
              <p className="text-sm font-black uppercase text-emerald-700">
                Student Experience
              </p>
              <h2 className="mt-4 text-3xl leading-tight text-emerald-950 sm:text-4xl lg:text-5xl">
                Serious preparation without making students feel lost.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                From the first inquiry to final mock examination, students receive a
                clear view of their schedule, requirements, and academic standing.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
              {[
                { icon: Landmark, title: "Campus-ready", text: "In-person sessions in structured classroom environments." },
                { icon: UserCheck, title: "Mentor-guided", text: "Faculty touchpoints for academic and strategy concerns." },
                { icon: Building2, title: "Professional tone", text: "A review center experience built for career outcomes." },
                { icon: Clock, title: "Clear schedule", text: "Weekly milestones that help students maintain momentum." },
              ].map((item) => {
                const ItemIcon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                      <ItemIcon size={22} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl text-emerald-950">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-start lg:px-8">
            <div className="lg:col-span-5">
              <p className="text-sm font-black uppercase text-emerald-700">
                Admissions
              </p>
              <h2 className="mt-4 text-3xl leading-tight text-emerald-950 sm:text-4xl lg:text-5xl">
                Begin with a guided enrollment conversation.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Send your details and an admissions coordinator will help you choose
                the right track, schedule, and preparation path.
              </p>

              <div className="mt-9 grid gap-4">
                <a
                  href="mailto:admissions@hypatia.edu.ph"
                  className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-200 hover:bg-emerald-50"
                >
                  <Mail className="mt-1 shrink-0 text-emerald-800" size={22} aria-hidden="true" />
                  <div>
                    <p className="text-xs font-black uppercase text-slate-500">
                      Email Admissions
                    </p>
                    <p className="mt-1 font-bold text-emerald-950">
                      admissions@hypatia.edu.ph
                    </p>
                  </div>
                </a>
                <div className="flex gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <MapPin className="mt-1 shrink-0 text-emerald-800" size={22} aria-hidden="true" />
                  <div>
                    <p className="text-xs font-black uppercase text-slate-500">
                      Central Campus
                    </p>
                    <p className="mt-1 font-bold text-emerald-950">
                      123 University Ave., Quezon City
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-lg border border-emerald-100 bg-emerald-50 p-5">
                  <Clock className="mt-1 shrink-0 text-emerald-800" size={22} aria-hidden="true" />
                  <div>
                    <p className="text-xs font-black uppercase text-emerald-800">
                      Service Hours
                    </p>
                    <p className="mt-1 font-bold text-emerald-950">
                      Monday to Saturday, 8:00 AM to 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-300/30 sm:p-8 lg:p-10">
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                      <CheckCircle size={42} aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 text-3xl text-emerald-950">
                      Application request sent.
                    </h3>
                    <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
                      Thank you for choosing Hypatia. An admissions officer will
                      contact you within 24 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-8 rounded-lg bg-emerald-700 px-6 py-4 text-sm font-bold text-white transition hover:bg-emerald-800"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8 border-b border-slate-200 pb-6">
                      <p className="text-sm font-bold uppercase text-emerald-700">
                        Request Information
                      </p>
                      <h3 className="mt-2 text-3xl text-emerald-950">
                        Admissions Inquiry
                      </h3>
                      <p className="mt-3 text-slate-600">
                        Complete the form and our team will recommend your next step.
                      </p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                      }}
                      className="grid gap-6"
                    >
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="full-name"
                            className="mb-2 block text-xs font-black uppercase text-slate-500"
                          >
                            Legal Full Name
                          </label>
                          <input
                            id="full-name"
                            type="text"
                            placeholder="Juan Dela Cruz"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 font-medium text-slate-800 outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="mb-2 block text-xs font-black uppercase text-slate-500"
                          >
                            Email Address
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="name@email.com"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 font-medium text-slate-800 outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="program"
                            className="mb-2 block text-xs font-black uppercase text-slate-500"
                          >
                            Prospective Program
                          </label>
                          <select
                            id="program"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 font-medium text-slate-800 outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
                            required
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Select a track
                            </option>
                            {PROGRAMS.map((program) => (
                              <option key={program.id} value={program.id}>
                                {program.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="mb-2 block text-xs font-black uppercase text-slate-500"
                          >
                            Mobile Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            placeholder="+63 917 000 0000"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 font-medium text-slate-800 outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-xs font-black uppercase text-slate-500"
                        >
                          Inquiry Details
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          placeholder="Tell us which exam you are preparing for and your preferred schedule."
                          className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 font-medium text-slate-800 outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
                        />
                      </div>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800"
                      >
                        Submit Admissions Inquiry
                        <ArrowRight size={17} aria-hidden="true" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-emerald-900 bg-emerald-950 py-14 text-emerald-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-lg font-bold text-emerald-950">
                  H
                </div>
                <div>
                  <p className="font-black uppercase text-white">Hypatia</p>
                  <p className="text-xs font-bold uppercase text-emerald-300">
                    Review Center
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-sm leading-7 text-emerald-100">
                Professional review education for licensure, civil service, and
                continuing professional development.
              </p>
            </div>

            <div>
              <h6 className="text-sm font-black uppercase text-white">Programs</h6>
              <ul className="mt-5 space-y-3 text-sm">
                {PROGRAMS.map((program) => (
                  <li key={program.id}>
                    <a href="#programs" className="transition hover:text-white">
                      {program.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h6 className="text-sm font-black uppercase text-white">Institution</h6>
              <ul className="mt-5 space-y-3 text-sm">
                {NAV_ITEMS.slice(0, 4).map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(item.id);
                      }}
                      className="transition hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h6 className="text-sm font-black uppercase text-white">Admissions</h6>
              <ul className="mt-5 space-y-3 text-sm">
                <li>123 University Ave., Quezon City</li>
                <li>
                  <a href="tel:+630281234567" className="transition hover:text-white">
                    +63 (02) 8123-4567
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:admissions@hypatia.edu.ph"
                    className="transition hover:text-white"
                  >
                    admissions@hypatia.edu.ph
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs font-bold text-emerald-300 sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; {new Date().getFullYear()} Hypatia Review Center.</span>
            <span>ISO 9001:2015 Certified Institution</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
