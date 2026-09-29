import type { ReactNode } from "react";

import { FixedBackground } from "../FixedBackground/FixedBackground";
import { LineAccent } from "../LineAccent/LineAccent";
import { Overlay } from "../Overlay/Overlay";
import { Slider } from "../Slider/Slider";
import { splitHighlight } from "../splitHighlight/splitHighlight";

interface BannerProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  title?: string;
  highlight?: string;
  duration?: number;
  image?: string;
  imageAlt?: string;
}

export const Banner = <T,>({
  items,
  renderItem,
  title = "",
  highlight = "",
  duration = 5000,
  image = "../../public/assets/waves.jpg",
  imageAlt = "josh mu in the waves",
}: BannerProps<T>) => {
  const [before, highlighted, after] = splitHighlight(title, highlight);

  return (
    <div className="relative w-full overflow-hidden h-96 text-themeBg">
      <FixedBackground src={image} alt={imageAlt}>
        <div className="relative flex items-center justify-center w-full h-full">
          <Overlay />
          <div className="relative z-10 flex flex-col h-full bottom-4 sm:bottom-2 md:bottom-0">
            <div className="flex flex-col items-center justify-end flex-1 mb-8">
              <h2 className="text-3xl font-light text-center uppercase whitespace-pre-wrap">
                {before}
                <span className="font-semibold ">{highlighted}</span>
                {after}
              </h2>
              <LineAccent center mb={0} />
            </div>

            <div className="flex-1 w-full mx-auto overflow-hidden md:w-4/5">
              <Slider content={items.map((item) => renderItem(item))} duration={duration} />
            </div>
          </div>
        </div>
      </FixedBackground>
    </div>
  );
};
