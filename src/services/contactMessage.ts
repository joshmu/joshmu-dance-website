export type ContactMessage = { name: string; email: string; message: string };

export type ContactMessageErrors = Partial<Record<keyof ContactMessage, string>>;

type ParseResult =
  | { ok: true; value: ContactMessage }
  | { ok: false; errors: ContactMessageErrors };

export interface Mailer {
  send(mail: { replyTo: string; subject: string; text: string }): Promise<void>;
}

export const MAX_LENGTH: Record<keyof ContactMessage, number> = {
  name: 100,
  email: 254,
  message: 5000,
};

const FIELDS = ["name", "email", "message"] as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactMessage(input: unknown): ParseResult {
  const source = typeof input === "object" && input !== null && !Array.isArray(input) ? input : {};
  const value = {} as ContactMessage;
  const errors: ContactMessageErrors = {};

  for (const field of FIELDS) {
    const raw = (source as Record<string, unknown>)[field];
    value[field] = typeof raw === "string" ? raw.trim() : "";

    if (!value[field]) errors[field] = "Required";
    else if (value[field].length > MAX_LENGTH[field]) errors[field] = "Too long";
    else if (field === "email" && !EMAIL_PATTERN.test(value.email)) errors.email = "Invalid email";
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}

export function sendContactMessage(msg: ContactMessage, mailer: Mailer): Promise<void> {
  return mailer.send({
    replyTo: msg.email,
    subject: `✨DANCE CONTACT: ${msg.name}`,
    text: `${msg.message}\n\nFrom: ${msg.name} <${msg.email}>`,
  });
}

type SmtpErrorFields = { code?: string; responseCode?: number; command?: string };

export async function handleContactRequest(req: Request, mailer: Mailer): Promise<Response> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Malformed request" }, { status: 400 });
  }

  const parsed = parseContactMessage(body);
  if (!parsed.ok) return Response.json({ errors: parsed.errors }, { status: 400 });

  try {
    await sendContactMessage(parsed.value, mailer);
  } catch (err) {
    const { code = "unknown", responseCode, command } = (err ?? {}) as SmtpErrorFields;
    console.error("Contact message send failed:", { code, responseCode, command });
    return Response.json({ error: "Could not send message" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
