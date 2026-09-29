import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import Contact from "@/components/Contact/Contact";

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
  vi.stubGlobal("fetch", fetchMock);

  afterEach(() => {
    fetchMock.mockReset();
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

  it("shows success and posts exactly the Contact message on a 200", async () => {
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
    });
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
