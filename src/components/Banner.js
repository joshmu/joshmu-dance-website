import Slider from './Slider'
import LineAccent from './LineAccent'
import FixedBackground from './FixedBackground'
import Overlay from './Overlay'

export default function Banner({
  title = '',
  titleHighlight = '',
  sliderContent,
  duration = 5000,
  image = './assets/waves.jpg',
  imageAlt = 'josh mu in the waves',
  header = null,
}) {
  const txt = parseTxt(title, titleHighlight)

  return (
    <div className='relative w-full overflow-hidden h-96 text-themeBackground'>
      <FixedBackground src={image} alt={imageAlt}>
        <div className='relative flex items-center justify-center w-full h-full'>
          <Overlay />
          <div className='relative z-10'>
            {/* custom header or default based on title provided */}
            <div className='flex flex-col items-center justify-center'>
              {header ? (
                header
              ) : (
                <>
                  <h2 className='text-3xl font-light uppercase whitespace-pre'>
                    {txt[0]}
                    <span className='font-semibold '>{txt[1]}</span>
                    {txt[2]}
                  </h2>
                  <LineAccent center />
                </>
              )}
            </div>

            <div className='py-8'>
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
