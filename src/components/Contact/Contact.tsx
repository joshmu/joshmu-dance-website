import { type Variants, motion } from "framer-motion";

import { useSectionAnchor } from "@/context/sectionNavigation";
import { LineAccent } from "@/components/shared/LineAccent/LineAccent";
import { Reveal } from "@/shared/ux/Reveal";

const EMAIL = "hello@joshmu.com";

const bubbleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const pathVariants: Variants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 3, ease: "easeInOut" } },
};

const Contact = () => {
  const anchor = useSectionAnchor("contact");

  return (
    <section {...anchor} className="relative text-themeText">
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
        <div className="text-center">
          <div className="relative inline-block px-8 py-4">
            <Reveal>
              <a
                href={`mailto:${EMAIL}`}
                className="text-xl transition-colors duration-300 ease-in-out sm:text-2xl hover:text-themeAccent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-themeAccent"
              >
                {EMAIL}
              </a>
            </Reveal>
            <motion.svg
              aria-hidden="true"
              initial="hidden"
              whileInView="visible"
              variants={bubbleVariants}
              className="absolute top-0 right-0 w-6 h-6 text-themeAccent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <motion.path
                variants={pathVariants}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </motion.svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
