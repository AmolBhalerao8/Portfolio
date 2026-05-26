import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amol Bhalerao - AI Founder & Systems Architect",
  description:
    "Cinematic AI founder portfolio. Building intelligent systems that merge AI, automation, voice, vision, and real-world execution. YC MVP builder. $12K ARR.",
  keywords: [
    "AI Engineer",
    "Founder",
    "Data Scientist",
    "Multimodal AI",
    "Voice AI",
    "LLM Orchestration",
    "Startup",
    "Amol Bhalerao",
  ],
  authors: [{ name: "Amol Bhalerao" }],
  openGraph: {
    title: "Amol Bhalerao - AI Engineer & Founder",
    description:
      "Building intelligent systems that merge AI, automation, voice, vision, and real-world execution.",
    type: "website",
    locale: "en_US",
    siteName: "Amol Bhalerao Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amol Bhalerao - AI Engineer & Founder",
    description:
      "Building intelligent systems that merge AI, automation, voice, vision, and real-world execution.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
