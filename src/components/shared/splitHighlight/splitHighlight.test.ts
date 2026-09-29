import { describe, expect, it } from "vitest";

import { splitHighlight } from "@/shared/splitHighlight/splitHighlight";

describe("splitHighlight", () => {
  it("splits around a highlight in the middle", () => {
    expect(splitHighlight("some companies I know", "companies")).toEqual([
      "some ",
      "companies",
      " I know",
    ]);
  });

  it("splits around a highlight at the start", () => {
    expect(splitHighlight("josh mu", "josh")).toEqual(["", "josh", " mu"]);
  });

  it("returns the whole text unhighlighted when the highlight is missing", () => {
    expect(splitHighlight("from the critics", "dancers")).toEqual(["from the critics", "", ""]);
  });
});
