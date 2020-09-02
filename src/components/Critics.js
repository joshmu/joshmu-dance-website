import Banner from './Banner'

export default function Critics() {
  const critics = {
    title: 'from the critics',
    highlight: 'critics',
    duration: 6000,
    image: './assets/theatre.jpg',
    imageAlt: 'josh mu on a stage in a theatre',
    raw: [
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
    ],
  }

  critics.content = critics.raw.map(Critic)

  return (
    <Banner
      title={critics.title}
      titleHighlight={critics.highlight}
      sliderContent={critics.content}
      duration={critics.duration}
      image={critics.image}
      imageAlt={critics.imageAlt}
    />
  )
}

function Critic({ review, critic }) {
  return (
    <div className='w-3/5 mx-auto text-center'>
      <p className='uppercase text-md'>{review}</p>
      <p className='mt-2 font-semibold'>{critic}</p>
    </div>
  )
}
