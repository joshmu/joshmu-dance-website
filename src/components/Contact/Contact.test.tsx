import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Contact from "@/components/Contact/Contact";

import { triggerIntersection } from "../../test/intersectionObserver";

describe("Contact", () => {
  it("is the contact Section", () => {
    const { container } = render(<Contact />);
    expect(container.querySelector("section#contact")).not.toBeNull();
  });

  it("links straight to hello@joshmu.com instead of a form", () => {
    const { container } = render(<Contact />);

    const link = screen.getByRole("link", { name: "hello@joshmu.com" });
    expect(link.getAttribute("href")).toBe("mailto:hello@joshmu.com");
    expect(container.querySelector("form")).toBeNull();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("draws the chat bubble in when it comes into view", async () => {
    const { container } = render(<Contact />);
    const bubble = container.querySelector("svg")!;
    const path = bubble.querySelector("path")!;
    expect(path.getAttribute("stroke-dasharray")).toBe("0px 1px");

    triggerIntersection(bubble, true);

    await waitFor(() => expect(path.getAttribute("stroke-dasharray")).toBe("1px 1px"));
    expect(bubble.style.opacity).toBe("1");
  });
});
