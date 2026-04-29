import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hypatia Review Center | Excellence in Review Education",
  description:
    "Hypatia Review Center offers world-class review programs for licensure examinations. Expert lecturers, proven track record, and personalized learning paths.",
  keywords:
    "review center, licensure exam, board exam review, Philippines, Hypatia",
  openGraph: {
    title: "Hypatia Review Center",
    description: "Excellence in Review Education",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, playfair.variable, "font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
