import { handleContactRequest } from "@/services/contactMessage";
import { smtpMailer } from "@/services/smtpMailer";

export const POST = (req: Request) => handleContactRequest(req, smtpMailer);
