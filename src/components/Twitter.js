import { useEffect, useState } from 'react'
import Slider from './Slider'
import LineAccent from './LineAccent'
import { AiOutlineTwitter as TwitterIcon } from 'react-icons/ai'

export default function Twitter() {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    fetch('https://mu-twitter-timeline-api.herokuapp.com/')
      .then(response => response.json())
      .then(data => {
        // let's limit to 10 tweets
        const tweets = data.slice(0, 10)
        console.log({ tweets })
        setTweets(tweets.map(tweetData => Tweet(tweetData)))
      })
  }, [])

  return (
    <div className='relative w-full mt-24 h-80'>
      <img
        src='./assets/yoga.jpg'
        alt='josh mu airborne on the beach'
        className='absolute z-0 object-cover w-full h-full'
      />
      <div className='absolute z-10 w-full h-full transition-all duration-300 ease-in-out opacity-75 bg-themeBackground'></div>

      <div className='container relative z-10 py-16 mx-auto'>
        <div className='flex flex-col items-center justify-center w-full text-blue-500'>
          <TwitterIcon className='text-5xl fill-current' />
          <a href='https://twitter.com/josh_mu_'>@josh_mu_</a>
        </div>
        <Slider
          content={tweets}
          duration={6000}
          className='mt-8 text-lg uppercase'
        />
      </div>
    </div>
  )
}

function Tweet(tweet) {
  return (
    <div className='text-sm text-center'>
      <a
        className='cursor-pointer'
        href={`https://twitter.com/josh_mu_/status/${tweet.id_str}`}
        target='_blank'
      >
        <p className=''>{tweet.full_text}</p>
      </a>
    </div>
  )
}
