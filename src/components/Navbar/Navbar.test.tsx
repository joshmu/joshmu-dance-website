import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Navbar from "@/components/Navbar/Navbar";
import { SectionProvider } from "@/context/sectionNavigation";

function renderNavbar() {
  render(
    <SectionProvider>
      <Navbar />
      <div id="about" />
    </SectionProvider>,
  );
}

const controlledMenu = (menuButton: HTMLElement) =>
  document.getElementById(menuButton.getAttribute("aria-controls") ?? "");

describe("Navbar", () => {
  beforeEach(() => {
    vi.mocked(Element.prototype.scrollIntoView).mockClear();
  });

  it("shows the desktop nav from md up and the menu button below md", () => {
    renderNavbar();

    expect(screen.getByRole("navigation").className).toMatch(/(^| )hidden( |$)/);
    expect(screen.getByRole("navigation").className).toContain("md:flex");
    expect(
      screen.getByRole("button", { name: "Open menu" }).closest(".md\\:hidden"),
    ).not.toBeNull();
  });

  it("opens the mobile menu from an accessible menu button", async () => {
    renderNavbar();
    const menuButton = screen.getByRole("button", { name: "Open menu" });
    expect(menuButton.getAttribute("type")).toBe("button");
    expect(menuButton.getAttribute("aria-expanded")).toBe("false");

    await userEvent.setup().click(menuButton);

    expect(menuButton.getAttribute("aria-expanded")).toBe("true");
    expect(menuButton.getAttribute("aria-label")).toBe("Close menu");
    expect(controlledMenu(menuButton)?.className).toContain("md:hidden");
  });

  it("closes the mobile menu after scrolling once to the chosen Section", async () => {
    renderNavbar();
    const user = userEvent.setup();
    const menuButton = screen.getByRole("button", { name: "Open menu" });
    await user.click(menuButton);
    const menu = controlledMenu(menuButton)!;

    await user.click(within(menu).getByRole("button", { name: "about" }));

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(menuButton.getAttribute("aria-expanded")).toBe("false");
    await waitFor(() => expect(menu.isConnected).toBe(false));
  });
});
