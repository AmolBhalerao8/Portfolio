"use client";

import { CursorProvider } from "@/components/providers/cursor-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <CursorProvider>{children}</CursorProvider>
    </LenisProvider>
  );
}
