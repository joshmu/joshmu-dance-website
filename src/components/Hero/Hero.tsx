import { MdKeyboardArrowDown as ArrowDownIcon } from "react-icons/md";

import { useThemeContext } from "@/context/themeContext";
import { scrollToSection, useSectionAnchor } from "@/context/sectionNavigation";
import { FixedBackground } from "@/shared/FixedBackground/FixedBackground";
import { Overlay } from "@/shared/Overlay/Overlay";

const heroImg = "/assets/forearm_pg.jpg";

const Hero = () => {
  const { toggleTheme } = useThemeContext();

  return (
    <div {...useSectionAnchor("home")} className="relative w-full h-screen text-themeBg">
      <FixedBackground
        src={heroImg}
        alt="josh mu upside down at carriageworks sydney, image taken by Pedro Grieg"
      >
        <Overlay />
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <h1 className="z-10 font-semibold text-center uppercase text-7xl sm:text-8xl">
            <button
              type="button"
              onClick={toggleTheme}
              title="Toggle theme"
              className="uppercase cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-themeAccent"
            >
              josh mu
            </button>
          </h1>
          <p className="z-10">
            <span>performer</span> | <span>choreographer</span> | <span>teacher</span>
          </p>
        </div>
        <div className="absolute bottom-0 z-10 flex items-center justify-center w-full mb-8 text-4xl ">
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            aria-label="Scroll to about"
            className="transition-colors duration-300 ease-in-out rounded-full cursor-pointer animate-bounce hover:text-themeAccent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-themeAccent"
          >
            <ArrowDownIcon aria-hidden className="fill-current" />
          </button>
        </div>
      </FixedBackground>
    </div>
  );
};

export default Hero;
