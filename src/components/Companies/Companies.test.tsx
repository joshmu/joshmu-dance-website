import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Companies from "@/components/Companies/Companies";

describe("Companies", () => {
  it("renders its heading and the first company as a link", () => {
    render(<Companies />);

    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe(
      "some companies I have worked for",
    );
    expect(screen.getByText("companies").tagName).toBe("SPAN");
    expect(screen.getByRole("link", { name: "Sydney Dance Company" }).getAttribute("href")).toBe(
      "https://www.sydneydancecompany.com",
    );
  });
});
