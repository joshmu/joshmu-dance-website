import { render, screen } from "@testing-library/react";
import { useInView } from "react-intersection-observer";
import { describe, expect, it } from "vitest";

import { triggerIntersection } from "./intersectionObserver";

const Probe = () => {
  const [ref, inView] = useInView();
  return <div ref={ref}>{inView ? "in view" : "out of view"}</div>;
};

describe("triggerIntersection", () => {
  it("drives useInView in and out of view", () => {
    render(<Probe />);
    const probe = screen.getByText("out of view");

    triggerIntersection(probe, true);
    expect(probe.textContent).toBe("in view");

    triggerIntersection(probe, false);
    expect(probe.textContent).toBe("out of view");
  });
});
