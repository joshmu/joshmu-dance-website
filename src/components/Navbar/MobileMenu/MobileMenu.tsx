import { motion, Variants } from "framer-motion";

import {
  SECTIONS,
  type SectionId,
  scrollToSection,
  useCurrentSection,
} from "@/context/sectionNavigation";

export default function MobileMenu({ onClose }: { onClose: () => void }) {
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

  const handleMobileMenuClick = (item: SectionId) => {
    onClose();
    scrollToSection(item);
  };

  return (
    <nav className="z-50 flex h-full text-right uppercase md:hidden">
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
            <motion.button
              onClick={() => handleMobileMenuClick(item)}
              variants={childAnimation}
              className={`${
                currentSection === item ? "active text-themeAccent" : "font-normal"
              } uppercase relative px-3 py-2 focus:outline-none`}
              whileHover={{ scale: 1.5 }}
            >
              {item}
            </motion.button>
          </li>
        ))}
      </motion.ul>
    </nav>
  );
}
