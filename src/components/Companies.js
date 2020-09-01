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
    <div className='w-full mt-24'>
      <h2 className='text-3xl text-center uppercase'>
        some <span className='font-semibold'>companies</span> I have worked with
      </h2>
      <LineAccent center />
      <div className='py-4'>
        <Slider
          content={sliderContent}
          duration={2000}
          className='text-lg uppercase'
        />
      </div>
    </div>
  )
}
