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

  it("pauses while a mouse hovers and resumes after it leaves", async () => {
    render(<Slider content={items} duration={1000} />);
    const slider = screen.getByRole("list");

    fireEvent.pointerEnter(slider, { pointerType: "mouse" });
    await advance(5000);
    expect(shown()).toEqual(["first"]);

    fireEvent.pointerLeave(slider, { pointerType: "mouse" });
    await advance(1000);
    expect(shown()).toEqual(["second"]);
  });

  it("keeps rotating after a touch tap", async () => {
    render(<Slider content={items} duration={1000} />);

    fireEvent.pointerEnter(screen.getByRole("list"), { pointerType: "touch" });
    await advance(1000);
    expect(shown()).toEqual(["second"]);
  });

  it("restarts the full duration on resume", async () => {
    render(<Slider content={items} duration={1000} />);
    const slider = screen.getByRole("list");

    await advance(500);
    fireEvent.pointerEnter(slider, { pointerType: "mouse" });
    fireEvent.pointerLeave(slider, { pointerType: "mouse" });
    await advance(999);
    expect(shown()).toEqual(["first"]);

    await advance(1);
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

  it("stays paused while focus moves between items inside", async () => {
    const pairs = items.map((item) => (
      <>
        <a href={`#${item}`}>{item}</a>
        <a href={`#${item}-more`}>{`${item} more`}</a>
      </>
    ));
    render(<Slider content={pairs} duration={1000} />);

    act(() => screen.getByRole("link", { name: "first" }).focus());
    act(() => screen.getByRole("link", { name: "first more" }).focus());
    await advance(5000);
    expect(shown()).toEqual(["first"]);
  });
});
