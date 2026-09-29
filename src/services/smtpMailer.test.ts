import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { createTransport, sendMail } = vi.hoisted(() => {
  const sendMail = vi.fn(async () => ({}));
  return { sendMail, createTransport: vi.fn(() => ({ sendMail })) };
});

vi.mock("server-only", () => ({}));
vi.mock("nodemailer", () => ({ default: { createTransport } }));

const mail = { replyTo: "ada@example.com", subject: "Hi", text: "Hello there" };

describe("smtpMailer", () => {
  beforeEach(() => {
    vi.resetModules();
    createTransport.mockClear();
    sendMail.mockClear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it.each([
    ["SMTP_USER", { SMTP_USER: "", SMTP_PASS: "pass" }],
    ["SMTP_PASS", { SMTP_USER: "site@joshmu.com", SMTP_PASS: "" }],
  ])("fails fast without sending when %s is missing", async (_, env) => {
    for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
    const { smtpMailer } = await import("@/services/smtpMailer");

    await expect(smtpMailer.send(mail)).rejects.toMatchObject({ code: "ECONFIG" });
    expect(createTransport).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("sends from SMTP_USER to the owner with replyTo set to the visitor", async () => {
    vi.stubEnv("SMTP_USER", "site@joshmu.com");
    vi.stubEnv("SMTP_PASS", "pass");
    const { smtpMailer } = await import("@/services/smtpMailer");

    await smtpMailer.send(mail);
    await smtpMailer.send(mail);

    expect(createTransport).toHaveBeenCalledTimes(1);
    expect(sendMail).toHaveBeenCalledWith({
      ...mail,
      from: "site@joshmu.com",
      to: "mu@joshmu.com",
    });
  });
});
