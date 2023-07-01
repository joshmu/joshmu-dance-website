import { useEffect, useState } from 'react'
import { AiOutlineTwitter as TwitterIcon } from 'react-icons/ai'

import Banner from '@/shared/Banner/Banner'

const twitterBannerImg = '/assets/falling_pg.jpg'

const Twitter = () => {
  const [twitterData, setTwitterData] = useState({
    header: Title(),
    duration: 6000,
    image: twitterBannerImg,
    imageAlt: 'josh mu falling through the air, image taken by Pedro Grieg',
    content: [],
  })

  useEffect(() => {
    // todo: what cache options do we have on the heroku side?
    fetch('https://mu-twitter-timeline-api.herokuapp.com/')
      .then((response) => response.json())
      .then((data) => {
        // let's limit to 10 tweets
        const tweets = data.slice(0, 10)
        // console.log({ tweets })
        setTwitterData({
          ...twitterData,
          content: tweets.map((tweetData) => Tweet(tweetData)),
        })
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      {twitterData.content.length > 0 && (
        <Banner
          header={twitterData.header}
          sliderContent={twitterData.content}
          duration={twitterData.duration}
          image={twitterData.image}
          imageAlt={twitterData.imageAlt}
        />
      )}
    </>
  )
}

function Title() {
  return (
    <div className="text-blue-400">
      <TwitterIcon
        aria-label="twitter"
        className="mx-auto text-5xl fill-current"
      />
      <a href="https://twitter.com/josh_mu_">@josh_mu_</a>
    </div>
  )
}

function Tweet(tweet) {
  const customTruncate = (txt) =>
    txt.length > 140 ? txt.slice(0, 140) + '...' : txt

  return (
    <div className="mx-auto w-4/5 text-center text-md">
      <a
        className="cursor-pointer"
        href={`https://twitter.com/josh_mu_/status/${tweet.id_str}`}
        target="_blank"
      >
        <p>{customTruncate(tweet.full_text)}</p>
      </a>
    </div>
  )
}

export default Twitter
