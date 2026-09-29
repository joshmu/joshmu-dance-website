import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import MobileMenu from "@/components/Navbar/MobileMenu/MobileMenu";
import { SectionProvider } from "@/context/sectionNavigation";

const onClose = vi.fn();

function renderMenu() {
  render(
    <SectionProvider>
      <MobileMenu id="mobile-menu" onClose={onClose} />
      <div id="about" />
    </SectionProvider>,
  );
}

describe("MobileMenu", () => {
  beforeEach(() => {
    vi.mocked(Element.prototype.scrollIntoView).mockClear();
    onClose.mockClear();
  });

  afterEach(() => {
    history.replaceState(null, "", "/");
  });

  it("links each item to its Section", () => {
    renderMenu();
    expect(screen.getByRole("link", { name: "about" }).getAttribute("href")).toBe("#about");
  });

  it("scrolls to the chosen Section once and closes the menu", async () => {
    renderMenu();

    await userEvent.setup().click(screen.getByRole("link", { name: "about" }));

    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView.mock.contexts[0]).toBe(document.getElementById("about"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("stays open when a modified click opens the Section elsewhere", () => {
    renderMenu();

    expect(fireEvent.click(screen.getByRole("link", { name: "about" }), { metaKey: true })).toBe(
      true,
    );
    expect(onClose).not.toHaveBeenCalled();
  });
});
