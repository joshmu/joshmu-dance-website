import { act, getDefaultNormalizer, render, screen, waitFor } from "@testing-library/react";
import { useScroll } from "framer-motion";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Compressor } from "@/shared/ux/Compressor";

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  const page = { scrollY: actual.motionValue(0) };
  return { ...actual, useScroll: () => page };
});

const page = useScroll();

function scrollWindowTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  act(() => page.scrollY.set(y));
}

const hiddenPart = () =>
  screen.getByText("osh ", { normalizer: getDefaultNormalizer({ trim: false }) }).parentElement!;

describe("Compressor", () => {
  afterEach(() => scrollWindowTo(0));

  it("renders the full text on first render", () => {
    const html = renderToString(<Compressor text="josh mu" hide="osh " />);
    const text = new DOMParser().parseFromString(html, "text/html").body.textContent;
    expect(text).toBe("josh mu");
  });

  it("shows the full name at scroll 0 and compresses it after scrolling", async () => {
    render(<Compressor text="josh mu" hide="osh " />);
    await waitFor(() => expect(hiddenPart().style.opacity).toBe("1"));

    scrollWindowTo(200);
    await waitFor(() => expect(hiddenPart().style.opacity).toBe("0"));

    scrollWindowTo(0);
    await waitFor(() => expect(hiddenPart().style.opacity).toBe("1"));
  });

  it("shows the compressed name on mount when the page is already scrolled", async () => {
    Object.defineProperty(window, "scrollY", { value: 300, configurable: true });
    render(<Compressor text="josh mu" hide="osh " />);
    await waitFor(() => expect(hiddenPart().style.opacity).toBe("0"));
  });
});
