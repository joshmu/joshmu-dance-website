import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Critics from "@/components/Critics/Critics";

describe("Critics", () => {
  it("renders its heading and the first critic review", () => {
    render(<Critics />);

    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("from the critics");
    expect(screen.getByText("critics").tagName).toBe("SPAN");
    expect(screen.getByText(/Josh Mu is the salient dancer/)).toBeTruthy();
    expect(screen.getByText("aussietheatre.com.au")).toBeTruthy();
  });
});
