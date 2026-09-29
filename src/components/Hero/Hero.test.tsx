import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Hero from "@/components/Hero/Hero";
import { SectionProvider } from "@/context/sectionNavigation";
import { ThemeProvider } from "@/context/themeContext";

describe("Hero", () => {
  beforeEach(() => {
    vi.mocked(Element.prototype.scrollIntoView).mockClear();
  });

  it("is the home Section", () => {
    const { container } = render(
      <SectionProvider>
        <Hero />
      </SectionProvider>,
    );
    expect(container.querySelector("#home")).not.toBeNull();
  });

  it("scrolls to the about Section from its down arrow button", async () => {
    render(
      <SectionProvider>
        <Hero />
        <div id="about" />
      </SectionProvider>,
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "Scroll to about" }));

    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView.mock.contexts[0]).toBe(document.getElementById("about"));
  });

  it("toggles the theme from a button on the name", async () => {
    render(
      <ThemeProvider>
        <SectionProvider>
          <Hero />
        </SectionProvider>
      </ThemeProvider>,
    );
    const name = screen.getByRole("button", { name: "josh mu" });
    expect(name.closest("h1")).not.toBeNull();
    expect(document.body.classList.contains("theme-light")).toBe(true);

    await userEvent.setup().click(name);

    expect(document.body.classList.contains("theme-dark")).toBe(true);
  });
});
