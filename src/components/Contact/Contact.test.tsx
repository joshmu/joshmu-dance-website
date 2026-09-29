import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Contact from "@/components/Contact/Contact";
import { HONEYPOT } from "@/services/contactMessage";

const fetchMock = vi.fn<typeof fetch>();

function respondWith(status: number) {
  fetchMock.mockResolvedValue(Response.json({}, { status }));
}

async function fillAndSend() {
  const user = userEvent.setup();
  render(<Contact />);
  await user.type(screen.getByLabelText("Name"), "Ada");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.type(screen.getByLabelText("Message"), "Hello there");
  await user.click(screen.getByRole("button", { name: /send/i }));
}

describe("Contact", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    fetchMock.mockReset();
    vi.unstubAllGlobals();
  });

  it("reports an error, never success, when the send is rejected", async () => {
    respondWith(400);
    await fillAndSend();

    expect((await screen.findByRole("status")).textContent).toMatch(/please use my email/i);
    expect(screen.queryByText("Message sent!")).toBeNull();
  });

  it("reports an error when the network fails", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    await fillAndSend();

    expect(await screen.findByText(/please use my email/i)).toBeTruthy();
    expect(screen.queryByText("Message sent!")).toBeNull();
  });

  it("keeps the typed values and re-enables the button after an error", async () => {
    respondWith(502);
    await fillAndSend();
    await screen.findByText(/please use my email/i);

    expect(screen.getByRole<HTMLButtonElement>("button", { name: /send/i }).disabled).toBe(false);
    expect(screen.getByLabelText<HTMLInputElement>("Name").value).toBe("Ada");
    expect(screen.getByLabelText<HTMLInputElement>("Email").value).toBe("ada@example.com");
    expect(screen.getByLabelText<HTMLTextAreaElement>("Message").value).toBe("Hello there");
    expect(screen.getByRole("link", { name: /hello@joshmu\.com/ })).toBeTruthy();
  });

  it("shows success and posts the Contact message with an empty honeypot on a 200", async () => {
    respondWith(200);
    await fillAndSend();

    expect(await screen.findByText("Message sent!")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/email");
    expect(JSON.parse(init?.body as string)).toEqual({
      name: "Ada",
      email: "ada@example.com",
      message: "Hello there",
      [HONEYPOT]: "",
    });
  });

  it("keeps the honeypot out of the accessibility tree and the tab order", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    const honeypot = screen.getByLabelText<HTMLInputElement>("Website");

    expect(honeypot.name).toBe(HONEYPOT);
    expect(honeypot.autocomplete).toBe("off");
    expect(screen.queryByRole("textbox", { name: /website/i })).toBeNull();
    expect(screen.getAllByRole("textbox")).toHaveLength(3);

    for (let i = 0; i < 6; i++) {
      await user.tab();
      expect(document.activeElement).not.toBe(honeypot);
    }
  });

  it("posts whatever a bot puts in the honeypot", async () => {
    respondWith(200);
    const user = userEvent.setup();
    render(<Contact />);
    fireEvent.change(screen.getByLabelText("Website"), {
      target: { value: "https://spam.example" },
    });
    await user.type(screen.getByLabelText("Name"), "Ada");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Message"), "Hello there");
    await user.click(screen.getByRole("button", { name: /send/i }));

    await screen.findByText("Message sent!");
    const [, init] = fetchMock.mock.calls[0];
    expect(JSON.parse(init?.body as string)[HONEYPOT]).toBe("https://spam.example");
  });

  it("does not post an invalid Contact message", async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.type(screen.getByLabelText("Name"), "Ada");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Message"), "   ");
    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Message").getAttribute("aria-invalid")).toBe("true");
  });
});
