import Slider from './Slider'
import LineAccent from './LineAccent'

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
    <div className='relative flex items-center justify-center w-full overflow-hidden h-96 text-themeBackground'>
      <img
        src={image}
        alt={imageAlt}
        className='absolute z-0 object-cover w-full h-full'
      />
      <div className='absolute top-0 bottom-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out opacity-50 bg-themeText'></div>

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
