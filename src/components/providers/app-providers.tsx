"use client";

import { CursorProvider } from "@/components/providers/cursor-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <CursorProvider>{children}</CursorProvider>;
}
