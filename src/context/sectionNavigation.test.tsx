import { act, fireEvent, render, screen } from "@testing-library/react";
import { useScroll } from "framer-motion";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  type SectionId,
  SectionProvider,
  scrollToSection,
  sectionLink,
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

describe("Section links", () => {
  const onNavigate = vi.fn();

  function renderLink() {
    render(
      <SectionProvider>
        <a {...sectionLink("about", onNavigate)}>go to about</a>
        <Section id="about" />
      </SectionProvider>,
    );
    return screen.getByRole("link", { name: "go to about" });
  }

  beforeEach(() => {
    vi.mocked(Element.prototype.scrollIntoView).mockClear();
    onNavigate.mockClear();
  });

  afterEach(() => {
    history.replaceState(null, "", "/");
  });

  it("links to the Section by its hash", () => {
    expect(renderLink().getAttribute("href")).toBe("#about");
  });

  it("scrolls to the Section once on a plain click and puts it in the URL", () => {
    const link = renderLink();

    const notPrevented = fireEvent.click(link);

    expect(notPrevented).toBe(false);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(vi.mocked(Element.prototype.scrollIntoView).mock.contexts[0]).toBe(
      screen.getByText("about"),
    );
    expect(window.location.hash).toBe("#about");
    expect(onNavigate).toHaveBeenCalledTimes(1);
  });

  it.each(["ctrlKey", "metaKey", "shiftKey", "altKey"])(
    "leaves a %s click to the browser",
    (modifier) => {
      const link = renderLink();

      const notPrevented = fireEvent.click(link, { [modifier]: true });

      expect(notPrevented).toBe(true);
      expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
      expect(onNavigate).not.toHaveBeenCalled();
    },
  );

  it("leaves a middle click to the browser", () => {
    const link = renderLink();

    const notPrevented = fireEvent.click(link, { button: 1 });

    expect(notPrevented).toBe(true);
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  });
});
