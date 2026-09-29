import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Slider = ({ content, duration = 5000, ...props }) => {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setPos((pos + 1) % content.length), duration);
    return () => clearTimeout(timer);
  }, [pos, duration, content.length]);

  return (
    <ul className="flex items-start justify-center min-h-[6rem] px-2">
      <AnimatePresence initial={false} mode="wait">
        <motion.li
          key={pos}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <span {...props}>{content[pos]}</span>
        </motion.li>
      </AnimatePresence>
    </ul>
  );
};
