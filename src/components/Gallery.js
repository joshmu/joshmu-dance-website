import { useEffect, useState } from 'react'
import LineAccent from './LineAccent'
import { motion } from 'framer-motion'
import { AiFillInstagram as InstagramIcon } from 'react-icons/ai'
import useLocation from '../hooks/useLocation'

export default function Gallery({ duration = 3000 }) {
  const { ref } = useLocation('portfolio')

  const [insta, setInsta] = useState([])
  const [images, setImages] = useState([])

  // initial
  useEffect(() => {
    fetch('/api/instagram')
      .then(res => res.json())
      .then(json => {
        const data = json.data.user.edge_owner_to_timeline_media.edges.map(
          parseInstagramEdge
        )
        // console.log(data)
        setInsta(data)
      })
  }, [])

  function imgUrl(shortcode) {
    return `https://www.instagram.com/p/${shortcode}/`
  }

  // initial state
  useEffect(() => {
    if (insta.length > 0 && images.length === 0) {
      setImages(insta.slice(0, 6))
    }
  }, [insta])

  // timer for change
  useEffect(() => {
    if (images.length === 0) return

    const timer = setTimeout(() => {
      // randomly select an image to change
      const randomImagesIndex = Math.floor(Math.random() * images.length)
      // randomly select an image that isn't in use
      const unusedImages = insta.filter(
        instaImg => !images.some(img => img.id === instaImg.id)
      )
      // random index of unused
      const unusedRandomImage =
        unusedImages[Math.floor(Math.random() * unusedImages.length)]
      // set
      const clone = [...images]
      clone[randomImagesIndex] = unusedRandomImage
      setImages([...clone])
    }, duration)

    return () => clearTimeout(timer)
  }, [images])

  return (
    <>
      {images.length > 0 && (
        <section
          ref={ref}
          className='transition-all duration-1000 ease-in-out body-font'
        >
          <div className='container flex flex-wrap px-5 py-24 mx-auto'>
            <div className='w-full mb-8 text-center'>
              <h2 className='text-3xl font-light uppercase whitespace-pre'>
                snapshots of my
                <span className='font-semibold '> life</span>
              </h2>
              <LineAccent center />
            </div>
            <div className='flex flex-wrap -m-1 md:-m-2'>
              <div className='flex flex-wrap w-full md:w-1/2'>
                <motion.div
                  key={images[0].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: [0.6, 0.05, -0.01, 0.9],
                    duration: 1,
                  }}
                  className='w-1/2 p-1 md:p-2'
                >
                  <a
                    className='cursor-pointer'
                    href={imgUrl(images[0].shortcode)}
                  >
                    <img
                      alt='gallery'
                      className='block object-cover object-center w-full h-full'
                      src={images[0].imageSrc}
                    />
                  </a>
                </motion.div>
                <motion.div
                  key={images[1].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: [0.6, 0.05, -0.01, 0.9],
                    duration: 1,
                  }}
                  className='w-1/2 p-1 md:p-2'
                >
                  <a
                    className='cursor-pointer'
                    href={imgUrl(images[1].shortcode)}
                  >
                    <img
                      alt='gallery'
                      className='block object-cover object-center w-full h-full'
                      src={images[1].imageSrc}
                    />
                  </a>
                </motion.div>
                <motion.div
                  key={images[2].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: [0.6, 0.05, -0.01, 0.9],
                    duration: 1,
                  }}
                  className='w-full p-1 md:p-2'
                >
                  <a
                    className='cursor-pointer'
                    href={imgUrl(images[2].shortcode)}
                  >
                    <img
                      alt='gallery'
                      className='block object-cover object-center w-full h-full'
                      src={images[2].imageSrc}
                    />
                  </a>
                </motion.div>
              </div>
              <div className='flex flex-wrap w-full md:w-1/2'>
                <motion.div
                  key={images[3].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: [0.6, 0.05, -0.01, 0.9],
                    duration: 1,
                  }}
                  className='w-full p-1 md:p-2'
                >
                  <a
                    className='cursor-pointer'
                    href={imgUrl(images[3].shortcode)}
                  >
                    <img
                      alt='gallery'
                      className='block object-cover object-center w-full h-full'
                      src={images[3].imageSrc}
                    />
                  </a>
                </motion.div>
                <motion.div
                  key={images[4].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: [0.6, 0.05, -0.01, 0.9],
                    duration: 1,
                  }}
                  className='w-1/2 p-1 md:p-2'
                >
                  <a
                    className='cursor-pointer'
                    href={imgUrl(images[4].shortcode)}
                  >
                    <img
                      alt='gallery'
                      className='block object-cover object-center w-full h-full'
                      src={images[4].imageSrc}
                    />
                  </a>
                </motion.div>
                <motion.div
                  key={images[5].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: [0.6, 0.05, -0.01, 0.9],
                    duration: 1,
                  }}
                  className='w-1/2 p-1 md:p-2'
                >
                  <a
                    className='cursor-pointer'
                    href={imgUrl(images[5].shortcode)}
                  >
                    <img
                      alt='gallery'
                      className='block object-cover object-center w-full h-full'
                      src={images[5].imageSrc}
                    />
                  </a>
                </motion.div>
              </div>
            </div>

            <div className='w-full mx-auto mt-8 text-center text-pink-600'>
              <InstagramIcon className='mx-auto text-4xl fill-current' />
              <a href='https://instagram.com/joshmu'>@joshmu</a>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function parseInstagramEdge(edge) {
  const { id, shortcode, is_video, taken_at_timestamp, dimensions } = edge.node

  // get the best quality image
  const imageSrc = edge.node.display_resources.filter(
    img =>
      img.config_height === dimensions.height &&
      img.config_width === dimensions.width
  )[0].src
  // const img = edge.node.display_resources.slice(-1)[0].src

  const output = {
    id,
    shortcode,
    is_video,
    taken_at_timestamp,
    dimensions,
    imageSrc,
  }
  return output
}
