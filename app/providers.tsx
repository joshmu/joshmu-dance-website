"use client";

import { AnimatePresence } from "framer-motion";
import { SectionProvider } from "@/context/sectionNavigation";
import { ThemeProvider } from "@/context/themeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SectionProvider>
      <ThemeProvider>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </ThemeProvider>
    </SectionProvider>
  );
}
