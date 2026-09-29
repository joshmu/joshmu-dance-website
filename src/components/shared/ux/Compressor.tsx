import { motion, useAnimation, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";

import { splitHighlight } from "@/shared/splitHighlight/splitHighlight";

export const Compressor = ({ text, hide, ...props }) => {
  const output = splitHighlight(text, hide);
  const [toggle, setToggle] = useState(false);

  const { scrollY } = useScroll();
  const controls = useAnimation();

  useEffect(() => {
    setToggle(window.scrollY > 0);
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => setToggle(y > 0));

  useEffect(() => {
    controls.start(toggle ? "hide" : "show");
  }, [toggle]);

  const animationVariants = {
    hide: {
      width: 0,
      opacity: 0,
    },
    show: {
      width: "auto",
      opacity: 1,
    },
    transition: {
      duration: 1,
    },
  };

  return (
    <span className="flex items-center justify-center whitespace-pre" {...props}>
      <span>{output[0]}</span>
      <motion.span
        variants={animationVariants as any}
        animate={controls}
        className="overflow-hidden"
      >
        <span>{output[1]}</span>
      </motion.span>
      <span>{output[2]}</span>
    </span>
  );
};
