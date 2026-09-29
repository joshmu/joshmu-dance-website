import { motion, Variants } from "framer-motion";

import { SECTIONS, sectionLink, useCurrentSection } from "@/context/sectionNavigation";

export default function MobileMenu({ id, onClose }: { id: string; onClose: () => void }) {
  const currentSection = useCurrentSection();

  // animation
  const parentAnimation: Variants = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const childAnimation: Variants = {
    hidden: {
      x: 50,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        // yoyo: Infinity,
      },
    },
  };

  return (
    <nav id={id} className="z-50 flex h-full text-right uppercase md:hidden">
      <motion.ul
        initial="hidden"
        animate="show"
        variants={parentAnimation}
        className={`${
          currentSection !== "home" ? "bg-themeText" : "bg-transparent"
        } flex flex-col items-stretch transition-all duration-700 ease-in-out justify-center h-full px-4 py-1 overflow-hidden text-sm`}
      >
        {SECTIONS.map((item) => (
          <li key={item}>
            <motion.a
              {...sectionLink(item, onClose)}
              variants={childAnimation}
              className={`${
                currentSection === item ? "active text-themeAccent" : "font-normal"
              } uppercase relative inline-block px-3 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-themeAccent`}
              whileHover={{ scale: 1.5 }}
            >
              {item}
            </motion.a>
          </li>
        ))}
      </motion.ul>
    </nav>
  );
}
