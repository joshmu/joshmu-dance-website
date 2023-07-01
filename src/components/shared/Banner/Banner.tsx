import { FixedBackground } from '../FixedBackground/FixedBackground'
import { LineAccent } from '../LineAccent/LineAccent'
import { Overlay } from '../Overlay/Overlay'
import { Slider } from '../Slider/Slider'

export const Banner = ({
  title = '',
  titleHighlight = '',
  sliderContent,
  duration = 5000,
  image = '../../public/assets/waves.jpg',
  imageAlt = 'josh mu in the waves',
  header = null,
}) => {
  const txt = parseTxt(title, titleHighlight)

  return (
    <div className="relative w-full overflow-hidden h-96 text-themeBg">
      <FixedBackground src={image} alt={imageAlt}>
        <div className="relative flex items-center justify-center w-full h-full">
          <Overlay />
          <div className="relative z-10 flex flex-col h-full bottom-4 sm:bottom-2 md:bottom-0">
            {/* custom header or default based on title provided */}
            <div className="flex flex-col items-center justify-end flex-1 mb-8">
              {header ? (
                header
              ) : (
                <>
                  <h2 className="text-3xl font-light text-center uppercase whitespace-pre-wrap">
                    {txt[0]}
                    <span className="font-semibold ">{txt[1]}</span>
                    {txt[2]}
                  </h2>
                  <LineAccent center mb={0} />
                </>
              )}
            </div>

            <div className="flex-1 w-full mx-auto overflow-hidden md:w-4/5">
              <Slider content={sliderContent} duration={duration} />
            </div>
          </div>
        </div>
      </FixedBackground>
    </div>
  )
}

const parseTxt = (txt, highlight) => {
  // split text in to 3 parts
  const textArray = Array(3)
  textArray[0] = txt.slice(0, txt.indexOf(highlight))
  textArray[1] = highlight
  textArray[2] = txt.slice(txt.indexOf(highlight) + highlight.length)
  return textArray
}
