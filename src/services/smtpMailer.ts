import "server-only";
import nodemailer from "nodemailer";

import type { Mailer } from "@/services/contactMessage";

const OWNER = "mu@joshmu.com";

let transporter: ReturnType<typeof nodemailer.createTransport> | undefined;

export const smtpMailer: Mailer = {
  async send(mail) {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!user || !pass) throw new Error("SMTP_USER and SMTP_PASS must be set");

    transporter ??= nodemailer.createTransport({
      host: "smtp.dreamhost.com",
      port: 587,
      secure: false,
      auth: { user, pass },
    });

    await transporter.sendMail({ ...mail, from: user, to: OWNER });
  },
};
