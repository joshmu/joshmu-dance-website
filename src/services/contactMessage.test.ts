import { describe, expect, it, vi } from "vitest";

import {
  handleContactRequest,
  type Mailer,
  parseContactMessage,
  sendContactMessage,
} from "@/services/contactMessage";

const valid = { name: "Ada", email: "ada@example.com", message: "Hello there" };

function inMemoryMailer(): Mailer & { sent: Parameters<Mailer["send"]>[0][] } {
  const sent: Parameters<Mailer["send"]>[0][] = [];
  return {
    sent,
    async send(mail) {
      sent.push(mail);
    },
  };
}

function post(body: string) {
  return new Request("http://localhost/api/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

describe("parseContactMessage", () => {
  it("trims every field", () => {
    const result = parseContactMessage({
      name: "  Ada ",
      email: " ada@example.com ",
      message: "\nHello there\n",
    });
    expect(result).toEqual({ ok: true, value: valid });
  });

  it("drops fields that are not part of a Contact message", () => {
    const result = parseContactMessage({ ...valid, sent: false, error: null });
    expect(result).toEqual({ ok: true, value: valid });
  });

  it("requires every field", () => {
    const result = parseContactMessage({ name: " ", message: 42 });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(Object.keys(result.errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("rejects input that is not an object", () => {
    expect(parseContactMessage(null).ok).toBe(false);
    expect(parseContactMessage("hello").ok).toBe(false);
    expect(parseContactMessage([valid]).ok).toBe(false);
  });

  it.each(["ada", "ada@", "@example.com", "ada@example", "ada @example.com"])(
    "rejects the bad email %j",
    (email) => {
      const result = parseContactMessage({ ...valid, email });
      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(Object.keys(result.errors)).toEqual(["email"]);
    },
  );

  it("rejects over-length input", () => {
    const result = parseContactMessage({
      name: "a".repeat(101),
      email: `${"a".repeat(250)}@example.com`,
      message: "a".repeat(5001),
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(Object.keys(result.errors).sort()).toEqual(["email", "message", "name"]);
  });
});

describe("sendContactMessage", () => {
  it("hands the Mailer a mail that replies to the visitor and names them", async () => {
    const mailer = inMemoryMailer();
    await sendContactMessage(valid, mailer);

    expect(mailer.sent).toEqual([
      {
        replyTo: "ada@example.com",
        subject: expect.stringContaining("Ada"),
        text: expect.stringMatching(/Hello there[\s\S]*Ada <ada@example.com>/),
      },
    ]);
  });
});

describe("handleContactRequest", () => {
  it("sends a valid Contact message with replyTo set to the visitor", async () => {
    const mailer = inMemoryMailer();
    const res = await handleContactRequest(post(JSON.stringify(valid)), mailer);

    expect(res.status).toBe(200);
    expect(mailer.sent).toHaveLength(1);
    expect(mailer.sent[0].replyTo).toBe("ada@example.com");
    expect(mailer.sent[0].subject).toContain("Ada");
    expect(mailer.sent[0].text).toContain("Hello there");
  });

  it("returns 400 for malformed JSON without sending", async () => {
    const mailer = inMemoryMailer();
    const res = await handleContactRequest(post("{not json"), mailer);

    expect(res.status).toBe(400);
    expect(mailer.sent).toHaveLength(0);
  });

  it("returns 400 with field errors for an invalid Contact message", async () => {
    const mailer = inMemoryMailer();
    const res = await handleContactRequest(
      post(JSON.stringify({ ...valid, email: "nope" })),
      mailer,
    );

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ errors: { email: expect.any(String) } });
    expect(mailer.sent).toHaveLength(0);
  });

  it("returns 502 without echoing the error when the Mailer fails", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const mailer: Mailer = {
      send: () => Promise.reject(new Error("535 auth failed for secret-user")),
    };
    const res = await handleContactRequest(post(JSON.stringify(valid)), mailer);
    const body = await res.text();

    expect(res.status).toBe(502);
    expect(body).not.toContain("secret-user");
    expect(JSON.stringify(consoleError.mock.calls)).not.toContain("ada@example.com");
    consoleError.mockRestore();
  });
});
