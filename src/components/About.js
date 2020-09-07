import React from 'react'
import useLocation from '../hooks/useLocation'
import LineAccent from './LineAccent'

export default function About() {
  const { ref } = useLocation('about')

  return (
    <div ref={ref} className='container py-12 mx-auto sm:py-24'>
      <div className='flex flex-col items-center justify-center w-full md:flex-row md:items-start'>
        <div className='flex-1 mx-2 sm:mx-0'>
          <img
            src='./assets/headshot.jpg'
            alt='placeholder'
            className='object-cover w-full h-full'
          />
        </div>
        <div className='flex flex-col flex-1 mt-4 ml-4 md:mt-0'>
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
              Majeure, Shaun Parker & Company, and Sydney Theatre Company.
            </p>
            <p className='mt-2'>
              Mu has choreographed works for Tracks Dance Theatre - Endurance &
              Man Made, Style Impressions Breakdance Krew - United, Ev & Bow -
              Chrysalis, and Foxtel. Recently Mu has created ZERO, a new work
              for Sydney Dance Company for their New Breed 2019 Season.
            </p>
            <p className='mt-2'>
              Mu is continually exploring potential for new movement pathways,
              choreographic expression through an individual’s somatic
              experience, and provide non dancers tools and techniques to
              encourage movement curiosity for improved health and freedom.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
