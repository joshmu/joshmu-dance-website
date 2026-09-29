import {
  createContext,
  type MouseEvent,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";

export const SECTIONS = ["home", "about", "news", "critics", "contact"] as const;
export type SectionId = (typeof SECTIONS)[number];

const CurrentSectionContext = createContext<SectionId>("home");
const SetCurrentSectionContext = createContext<(id: SectionId) => void>(() => {});

export function SectionProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<SectionId>("home");

  return (
    <SetCurrentSectionContext.Provider value={setCurrent}>
      <CurrentSectionContext.Provider value={current}>{children}</CurrentSectionContext.Provider>
    </SetCurrentSectionContext.Provider>
  );
}

export function useCurrentSection(): SectionId {
  return useContext(CurrentSectionContext);
}

export function useSectionAnchor(id: SectionId) {
  const setCurrent = useContext(SetCurrentSectionContext);
  // A -50% margin shrinks the viewport to its middle line, so one Section is in view at a time.
  const [ref, inView] = useInView({ rootMargin: "-50%" });

  useEffect(() => {
    if (inView) setCurrent(id);
  }, [inView, id, setCurrent]);

  return { id, ref };
}

export function scrollToSection(target: SectionId | "top") {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

  if (target === "top") window.scrollTo({ top: 0, behavior });
  else document.getElementById(target)?.scrollIntoView({ behavior, block: "start" });
}

export function sectionLink(id: SectionId, onNavigate?: () => void) {
  return {
    href: `#${id}`,
    onClick(event: MouseEvent<HTMLAnchorElement>) {
      // Modified and non-primary clicks open the link the browser's way (new tab, copy, download).
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      scrollToSection(id);
      history.replaceState(history.state, "", `#${id}`);
      onNavigate?.();
    },
  };
}
