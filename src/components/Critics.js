import Slider from './Slider'
import LineAccent from './LineAccent'

export default function Critics() {
  const content = [
    {
      review:
        'Josh Mu is the salient dancer. He commands the stage both with his dramatic range and the perfect control he exercises over his body',
      critic: 'aussietheatre.com.au',
    },
    {
      review: 'Josh Mu’s slinky rippling opening solo',
      critic: 'ArtsHub',
    },
    {
      review: 'the joy, elevation and vivacity of Josh Mu',
      critic: 'Capital Times',
    },
    {
      review:
        'Josh Mu is a strong performer, equally talented in drama and dance',
      critic: 'Dance Australia',
    },
    {
      review: 'Mu inhabitating some extremely precise phrases',
      critic: 'theatreview.org.nz',
    },
    {
      review: 'The opening sequence of an outstandingly flexible male solo',
      critic: 'Sydney Morning Herald',
    },
    {
      review: 'Josh Mu is a powerfully agile dancer',
      critic: 'Daily Review',
    },
  ]
  const sliderContent = content.map(Review)

  return (
    <div className='relative w-full mt-24 text-center h-80 text-themeBackground'>
      <img
        src='./assets/theatre.jpg'
        alt='josh mu airborne on the beach'
        className='absolute z-0 object-cover w-full h-full'
      />
      <div className='absolute z-10 w-full h-full transition-all duration-300 ease-in-out opacity-50 bg-themeText'></div>

      <div className='relative z-10 py-20'>
        <h2 className='text-3xl text-center uppercase'>
          From the <span className='font-semibold'>critics</span>
        </h2>
        <LineAccent center />
        <div className='py-8'>
          <Slider
            content={sliderContent}
            duration={6000}
            className='w-3/5 mx-auto text-center'
          />
        </div>
      </div>
    </div>
  )
}

function Review({ review, critic }) {
  return (
    <div>
      <p className='uppercase'>{review}</p>
      <p className='mt-2 font-semibold'>{critic}</p>
    </div>
  )
}
