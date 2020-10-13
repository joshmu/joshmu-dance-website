import useLocation from '@/hooks/useLocation'
import criticsBannerImg from '@/public/assets/standing_pg.jpg'
import Banner from '@/shared/Banner/Banner'

const Critics = props => {
  const { ref } = useLocation('critics')

  const critics = {
    title: 'from the critics',
    highlight: 'critics',
    duration: 6000,
    image: criticsBannerImg,
    imageAlt: 'josh mu standing straight, image taken by Pedro Grieg',
    raw: [
      {
        review:
          'Josh Mu is the salient dancer. He commands the stage both with his dramatic range and the perfect control he exercises over his body',
        critic: 'aussietheatre.com.au',
      },
      {
        review: "Josh Mu's slinky rippling opening solo",
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
    ],
  }

  critics.content = critics.raw.map(Critic)

  return (
    <div ref={ref} {...props}>
      <Banner
        title={critics.title}
        titleHighlight={critics.highlight}
        sliderContent={critics.content}
        duration={critics.duration}
        image={critics.image}
        imageAlt={critics.imageAlt}
      />
    </div>
  )
}

function Critic({ review, critic }) {
  return (
    <div className='w-full mx-auto text-center sm:w-4/5 text-md'>
      <p className=''>{review}</p>
      <p className='mt-2 font-semibold'>{critic}</p>
    </div>
  )
}

export default Critics
