import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import MobileMenu from "@/components/Navbar/MobileMenu/MobileMenu";
import { SectionProvider } from "@/context/sectionNavigation";

describe("MobileMenu", () => {
  beforeEach(() => {
    vi.mocked(Element.prototype.scrollIntoView).mockClear();
  });

  it("scrolls to the chosen Section once and closes the menu", async () => {
    const onClose = vi.fn();
    render(
      <SectionProvider>
        <MobileMenu onClose={onClose} />
        <div id="about" />
      </SectionProvider>,
    );

    await userEvent.setup().click(screen.getByRole("button", { name: "about" }));

    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView.mock.contexts[0]).toBe(document.getElementById("about"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
