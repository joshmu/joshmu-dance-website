import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { SECTIONS, sectionLink, useCurrentSection } from "@/context/sectionNavigation";
import { useThemeContext } from "@/context/themeContext";
import { Compressor } from "@/shared/ux/Compressor";

import MobileMenu from "./MobileMenu/MobileMenu";
import MobileMenuBtn from "./MobileMenu/MobileMenuBtn/MobileMenuBtn";

const MOBILE_MENU_ID = "mobile-menu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentSection = useCurrentSection();
  const { toggleTheme } = useThemeContext();

  // animation
  const parentAnimation = {
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
  const childAnimation = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        // yoyo: Infinity,
      },
    },
  };

  return (
    <header
      className={`${
        currentSection !== "home"
          ? "text-themeBg bg-themeText h-12"
          : "bg-transparent h-16 text-themeBg"
      } fixed z-50 w-full items-center justify-center transition-all duration-700 ease-in-out`}
    >
      <div className="container h-full mx-auto">
        <div className="flex items-center justify-between w-full h-full px-4">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="josh mu, toggle theme"
            className="flex h-full text-2xl font-semibold uppercase cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-themeAccent"
          >
            <Compressor text="josh mu" hide="osh " />
          </button>

          <div className="relative flex flex-col items-center md:hidden">
            <MobileMenuBtn
              isOpen={isMobileMenuOpen}
              menuId={MOBILE_MENU_ID}
              onToggle={() => setIsMobileMenuOpen((open) => !open)}
            />
          </div>
          <nav className="relative hidden h-full uppercase md:flex">
            <motion.ul
              initial="hidden"
              animate="show"
              variants={parentAnimation}
              className="flex flex-wrap items-center justify-center h-full px-4 py-1 overflow-hidden text-sm"
            >
              {SECTIONS.map((item) => (
                <li key={item}>
                  <motion.a
                    {...sectionLink(item)}
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
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-end w-full -mt-px md:hidden"
            >
              <MobileMenu id={MOBILE_MENU_ID} onClose={() => setIsMobileMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
