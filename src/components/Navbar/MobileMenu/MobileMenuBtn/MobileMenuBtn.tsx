import { AnimatePresence, motion } from "framer-motion";
import { RiCloseFill as CloseIcon, RiMenu5Line as HamburgerIcon } from "react-icons/ri";

interface MobileMenuBtnProps {
  isOpen: boolean;
  menuId: string;
  onToggle: () => void;
}

export default function MobileMenuBtn({ isOpen, menuId, onToggle }: MobileMenuBtnProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={menuId}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="flex flex-col justify-center w-full h-full p-2 text-2xl bg-transparent cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-themeAccent"
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.span
            key="opened"
            initial={{ opacity: 0, rotate: -180, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0 }}
            className="block bg-transparent"
          >
            <CloseIcon aria-hidden className="fill-current" />
          </motion.span>
        ) : (
          <motion.span
            key="closed"
            initial={{ opacity: 0, rotate: -180, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0 }}
            className="block bg-transparent"
          >
            <HamburgerIcon aria-hidden className="fill-current" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
