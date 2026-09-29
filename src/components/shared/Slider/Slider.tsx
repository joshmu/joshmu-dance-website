import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type FocusEvent, useEffect, useState } from "react";

export const Slider = ({ content, duration = 5000, ...props }) => {
  const [pos, setPos] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused;
  const shift = useReducedMotion() ? 0 : 100;

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => setPos((pos + 1) % content.length), duration);
    return () => clearTimeout(timer);
  }, [pos, duration, content.length, paused]);

  const handleBlur = (event: FocusEvent<HTMLUListElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
  };

  return (
    <ul
      className="flex items-start justify-center min-h-[6rem] px-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.li
          key={pos}
          initial={{ x: shift, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -shift, opacity: 0 }}
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
