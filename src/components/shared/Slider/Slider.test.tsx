import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Slider } from "@/shared/Slider/Slider";

const items = ["first", "second", "third"];

const links = items.map((item) => (
  <a key={item} href={`#${item}`}>
    {item}
  </a>
));

const shown = () => items.filter((item) => screen.queryByText(item));

const advance = async (ms: number) => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
};

describe("Slider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the first item immediately", () => {
    render(<Slider content={items} duration={1000} />);
    expect(shown()).toEqual(["first"]);
  });

  it("shows each item once per cycle, then wraps to the first", async () => {
    render(<Slider content={items} duration={1000} />);
    const seen = [shown()];

    for (let tick = 0; tick < items.length; tick++) {
      await advance(1000);
      seen.push(shown());
    }

    expect(seen).toEqual([["first"], ["second"], ["third"], ["first"]]);
  });

  it("pauses while hovered and resumes after the pointer leaves", async () => {
    render(<Slider content={items} duration={1000} />);
    const slider = screen.getByRole("list");

    fireEvent.mouseEnter(slider);
    await advance(5000);
    expect(shown()).toEqual(["first"]);

    fireEvent.mouseLeave(slider);
    await advance(1000);
    expect(shown()).toEqual(["second"]);
  });

  it("pauses while focus is inside and resumes after focus leaves", async () => {
    render(
      <>
        <Slider content={links} duration={1000} />
        <button type="button">outside</button>
      </>,
    );

    act(() => screen.getByRole("link", { name: "first" }).focus());
    await advance(5000);
    expect(shown()).toEqual(["first"]);

    act(() => screen.getByRole("button", { name: "outside" }).focus());
    await advance(1000);
    expect(shown()).toEqual(["second"]);
  });
});
