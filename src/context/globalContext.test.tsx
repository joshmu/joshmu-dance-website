import { act, render } from "@testing-library/react";
import { useScroll } from "framer-motion";
import { describe, expect, it, vi } from "vitest";

import { GlobalProvider, useGlobalContext } from "@/context/globalContext";

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  const page = { scrollY: actual.motionValue(0), scrollYProgress: actual.motionValue(0) };
  return { ...actual, useScroll: () => page };
});

const page = useScroll();

describe("GlobalProvider", () => {
  it("does not re-render its consumers when the page scrolls", () => {
    let renders = 0;
    const Consumer = () => {
      useGlobalContext();
      renders++;
      return null;
    };
    render(
      <GlobalProvider>
        <Consumer />
      </GlobalProvider>,
    );
    const before = renders;

    act(() => {
      page.scrollY.set(200);
      page.scrollYProgress.set(0.5);
    });

    expect(renders).toBe(before);
  });
});
