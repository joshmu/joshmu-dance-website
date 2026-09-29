import { useState } from "react";

import useLocation from "@/hooks/useLocation";
import { LineAccent } from "@/components/shared/LineAccent/LineAccent";
import { Reveal } from "@/shared/ux/Reveal";
import {
  type ContactMessage,
  type ContactMessageErrors,
  MAX_LENGTH,
  parseContactMessage,
} from "@/services/contactMessage";

type Status = "idle" | "sending" | "sent" | "error";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-themeAccent";

const fieldClass = (invalid: boolean) =>
  `w-full px-4 py-2 text-base bg-gray-100 rounded-sm focus:border-themeAccent ${FOCUS_RING} ${
    invalid ? "border-2 border-red-400" : "border border-gray-400"
  }`;

const errorsOf = (values: ContactMessage): ContactMessageErrors => {
  const result = parseContactMessage(values);
  return result.ok ? {} : result.errors;
};

const Contact = (props: React.ComponentProps<"section">) => {
  const { ref } = useLocation("contact");

  const [values, setValues] = useState<ContactMessage>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactMessageErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleEmailBlur = () => {
    const email = values.email ? errorsOf(values).email : undefined;
    setErrors((prev) => ({ ...prev, email }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const parsed = parseContactMessage(values);
    if (!parsed.ok) {
      setErrors(parsed.errors);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(parsed.value),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={ref} className="relative text-themeText" {...props}>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col w-full mb-12 text-center">
          <h2 className="mb-2 text-2xl font-light text-themeText sm:text-3xl">
            FEEL FREE TO <span className="font-semibold">CONTACT ME</span>
          </h2>
          <LineAccent center />
          <p className="mx-auto mt-4 text-sm italic leading-relaxed lg:w-2/3 text-themeTextSecondary">
            Let&apos;s talk!
          </p>
        </div>
        <div className="mx-auto lg:w-1/2 md:w-2/3">
          <form className="flex flex-wrap -m-2 text-gray-900" onSubmit={handleSubmit}>
            <div className="w-1/2 p-2">
              <label htmlFor="contact-name" className="sr-only">
                Name
              </label>
              <input
                id="contact-name"
                value={values.name}
                onChange={handleChange}
                className={fieldClass(!!errors.name)}
                aria-invalid={!!errors.name}
                placeholder="Name"
                name="name"
                type="text"
                maxLength={MAX_LENGTH.name}
                required
              />
            </div>
            <div className="w-1/2 p-2">
              <label htmlFor="contact-email" className="sr-only">
                Email
              </label>
              <input
                id="contact-email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                className={fieldClass(!!errors.email)}
                aria-invalid={!!errors.email}
                placeholder="Email"
                name="email"
                type="email"
                maxLength={MAX_LENGTH.email}
                required
              />
            </div>
            <div className="w-full p-2">
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                value={values.message}
                onChange={handleChange}
                className={`block h-48 resize-none ${fieldClass(!!errors.message)}`}
                aria-invalid={!!errors.message}
                placeholder="Message"
                name="message"
                maxLength={MAX_LENGTH.message}
                required
              />
            </div>
            <div className="w-full p-2">
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className={`${
                  status === "sending" || status === "sent" ? "opacity-50" : ""
                } flex px-8 py-2 mx-auto text-lg text-white uppercase transition-all duration-300 ease-in-out border-0 rounded-sm bg-themeAccent hover:bg-orange-500 ${FOCUS_RING}`}
              >
                {status === "sent" ? "✓" : status === "sending" ? "sending…" : "send"}
              </button>
            </div>
            <div className="w-full p-2 pt-8 mt-8 text-center border-t border-gray-200">
              <div role="status" aria-live="polite">
                {status === "error" && (
                  <Reveal>
                    <p className="text-xl italic text-red-500 motion-safe:animate-bounce">
                      A server error has occurred, please use my email instead.
                    </p>
                  </Reveal>
                )}
                {status === "sent" && (
                  <Reveal>
                    <p className="text-xl italic text-green-600 motion-safe:animate-bounce">
                      Message sent!
                    </p>
                  </Reveal>
                )}
              </div>
              {status !== "sent" && (
                <Reveal>
                  <a
                    href="&#109;&#097;&#105;&#108;&#116;&#111;:&#104;&#101;&#108;&#108;&#111;&#064;&#106;&#111;&#115;&#104;&#109;&#117;&#046;&#099;&#111;&#109;"
                    className={`transition-colors duration-300 ease-in-out text-themeText hover:text-orange-500 ${FOCUS_RING}`}
                  >
                    👋
                    &#104;&#101;&#108;&#108;&#111;&#064;&#106;&#111;&#115;&#104;&#109;&#117;&#046;&#099;&#111;&#109;
                  </a>
                </Reveal>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
