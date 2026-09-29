import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Banner } from "@/shared/Banner/Banner";

describe("Banner", () => {
  it("renders the title with its highlight in its own element, and the first item", () => {
    render(
      <Banner
        title="from the critics"
        highlight="critics"
        items={[{ name: "first" }, { name: "second" }]}
        renderItem={(item) => <p>{item.name}</p>}
      />,
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toBe("from the critics");
    expect(screen.getByText("critics").tagName).toBe("SPAN");
    expect(screen.getByText("first")).toBeTruthy();
    expect(screen.queryByText("second")).toBeNull();
  });
});
