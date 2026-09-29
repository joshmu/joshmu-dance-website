import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LineAccent } from "@/shared/LineAccent/LineAccent";

describe("LineAccent", () => {
  it("centres its lines when asked", () => {
    const { container } = render(<LineAccent center />);
    expect(container.firstElementChild?.className).toContain("items-center");
  });
});
