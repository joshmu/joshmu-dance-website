import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Compressor } from "@/shared/ux/Compressor";

describe("Compressor", () => {
  it("renders the full text on first render", () => {
    const html = renderToString(<Compressor text="josh mu" hide="osh " />);
    const text = new DOMParser().parseFromString(html, "text/html").body.textContent;
    expect(text).toBe("josh mu");
  });
});
