import { act, render, screen } from "@testing-library/react";
import { useScroll } from "framer-motion";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  type SectionId,
  SectionProvider,
  scrollToSection,
  useCurrentSection,
  useSectionAnchor,
} from "@/context/sectionNavigation";
import { triggerIntersection } from "../test/intersectionObserver";

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  const page = { scrollY: actual.motionValue(0), scrollYProgress: actual.motionValue(0) };
  return { ...actual, useScroll: () => page };
});

const page = useScroll();

const Section = ({ id }: { id: SectionId }) => <div {...useSectionAnchor(id)}>{id}</div>;

const CurrentSection = () => <p>current: {useCurrentSection()}</p>;

function renderPage() {
  render(
    <SectionProvider>
      <CurrentSection />
      <Section id="home" />
      <Section id="about" />
    </SectionProvider>,
  );
}

function prefersReducedMotion(matches: boolean) {
  vi.mocked(window.matchMedia).mockImplementation(
    (query) =>
      ({
        matches: matches && query === "(prefers-reduced-motion: reduce)",
        media: query,
      }) as MediaQueryList,
  );
}

describe("Section navigation", () => {
  beforeEach(() => {
    vi.mocked(Element.prototype.scrollIntoView).mockClear();
  });

  afterEach(() => {
    vi.mocked(window.matchMedia).mockRestore();
    vi.restoreAllMocks();
  });

  it("starts on the home Section before any Section is in view", () => {
    renderPage();
    expect(screen.getByText(/current:/).textContent).toBe("current: home");
  });

  it("makes a Section current when it enters view", () => {
    renderPage();
    triggerIntersection(screen.getByText("about"), true);
    expect(screen.getByText(/current:/).textContent).toBe("current: about");
  });

  it("gives each Section its id as the anchor", () => {
    renderPage();
    expect(screen.getByText("about").id).toBe("about");
  });

  it("does not re-render its consumers when the page scrolls", () => {
    let renders = 0;
    const Consumer = () => {
      useCurrentSection();
      renders++;
      return null;
    };
    render(
      <SectionProvider>
        <Consumer />
      </SectionProvider>,
    );
    const before = renders;

    act(() => {
      page.scrollY.set(200);
      page.scrollYProgress.set(0.5);
    });

    expect(renders).toBe(before);
  });

  it("scrolls a Section into view smoothly", () => {
    prefersReducedMotion(false);
    renderPage();
    scrollToSection("about");

    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView.mock.contexts[0]).toBe(screen.getByText("about"));
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });

  it("jumps instead of animating when the visitor prefers reduced motion", () => {
    prefersReducedMotion(true);
    renderPage();
    scrollToSection("about");

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: "auto",
      block: "start",
    });
  });

  it("scrolls back to the top of the page", () => {
    prefersReducedMotion(false);
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    scrollToSection("top");
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
