import Image from 'next/image'

import useLocation from '@/hooks/useLocation'
import headshotImg from '@/public/assets/headshot.jpg'
import LineAccent from '@/shared/LineAccent/LineAccent'

const About = props => {
  const { ref } = useLocation('about')

  return (
    <div ref={ref} className='container py-12 mx-auto sm:py-24' {...props}>
      <div className='flex flex-col items-center justify-center w-full md:flex-row md:items-start'>
        <div className='flex-1 mx-8 md:ml-0 md:mr-4'>
          <Image
            src={headshotImg}
            width='744'
            height='841'
            alt='josh mu headshot'
            className='object-cover w-full h-full'
          />
        </div>
        <div className='flex flex-col flex-1 m-8 md:m-0'>
          <h2 className='text-3xl font-light uppercase'>
            A bit <span className='font-semibold'>about me</span>
          </h2>
          <LineAccent />
          <div className='leading-7 text-themeTextSecondary'>
            <p className='mt-2'>
              Josh Mu is an Australian-based independent contemporary dancer and
              yoga practitioner who has performed and taught internationally for
              over 10 years. His movement roots begin in breakdance and hip hop
              culture, and have expanded to include contemporary, ballet,
              circus, gymnastics, physical theatre and yoga.
            </p>
            <p className='mt-2'>
              An award recipient for Outstanding Performance, Mu has performed
              with many of Australia’s leading major dance companies. Some of
              which are Chunky Move, Dancenorth, Stephanie Lake Company, Force
              Majeure, Shaun Parker & Company, and Marrugeku.
            </p>
            <p className='mt-2'>
              Mu has choreographed works for Tracks Dance Theatre, Foxtel, Style
              Impressions Breakdance Krew, Ev & Bow, and his latest work ZERO
              for Sydney Dance Company.
            </p>
            <p className='mt-2'>
              Mu is continually exploring potential for new phsyical expression,
              investigating the overlap of Arts and Technology, and providing
              non dancers tools and techniques to encourage movement curiosity
              for improved health and freedom.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
