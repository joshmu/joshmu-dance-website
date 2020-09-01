import Slider from './Slider'
import LineAccent from './LineAccent'

export default function Companies() {
  const sliderContent = [
    'Sydney Dance Company',
    'Marrugeku',
    'Force Majeure',
    'Chunky Move',
  ]

  return (
    <div className='relative w-full mt-24 text-themeBackground'>
      <img
        src='./assets/sand.jpg'
        alt='josh mu airborne on the beach'
        className='absolute z-0 object-cover w-full h-full'
      />
      <div className='absolute z-10 w-full h-full transition-all duration-300 ease-in-out opacity-50 bg-themeText'></div>

      <div className='relative z-10 py-20'>
        <h2 className='text-3xl font-light text-center uppercase'>
          some <span className='font-semibold'>companies</span> I have worked
          with
        </h2>
        <LineAccent center />
        <div className='py-8'>
          <Slider
            content={sliderContent}
            duration={2000}
            className='text-lg uppercase'
          />
        </div>
      </div>
    </div>
  )
}
