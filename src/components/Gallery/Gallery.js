import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AiFillInstagram as InstagramIcon } from 'react-icons/ai'

import useLocation from '@/hooks/useLocation'
import LineAccent from '@/shared/LineAccent/LineAccent'

const Gallery = ({ duration = 3000, ...props }) => {
  const { ref } = useLocation('portfolio')

  const [insta, setInsta] = useState([])
  const [images, setImages] = useState([])

  // initial
  useEffect(() => {
    fetch('/api/instagram')
      .then(res => res.json())
      .then(json => {
        parseInstaData(json)
      })
  }, [])

  const parseInstaData = json => {
    // remove our engagement photo (at marlo's request ♡)
    const posts = json.filter(j => j.id !== '2059453213557158049')
    setInsta(posts)
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

  // if we do not receive any images then we will not show this section
  if (images.length === 0) return null

  return (
    <section ref={ref} {...props}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <div className='container flex flex-wrap px-5 py-24 mx-auto'>
          <div className='w-full mb-8 text-center'>
            <h2 className='text-3xl font-light uppercase whitespace-pre'>
              snapshots of my
              <span className='font-semibold'> life</span>
            </h2>
            <LineAccent center />
          </div>
          <div className='flex flex-wrap -m-1 overflow-hidden md:-m-2'>
            <div className='flex flex-wrap w-full md:w-1/2'>
              <div className='relative w-1/2 h-64 p-1 overflow-hidden md:h-80 md:p-2'>
                <motion.div
                  key={images[0].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: [0.6, 0.05, -0.01, 0.9],
                    duration: 2,
                  }}
                  className='w-full h-full overflow-hidden'
                >
                  <a
                    className='cursor-pointer ig-gallery-img'
                    href={images[0].url}
                  >
                    <img
                      alt='gallery'
                      className='block object-cover object-center w-full h-full'
                      src={images[0].src}
                      width={images[0].width}
                      height={images[0].height}
                    />
                  </a>
                </motion.div>
              </div>
              <div className='relative w-1/2 h-64 p-1 overflow-hidden md:h-80 md:p-2'>
                <motion.div
                  key={images[1].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: [0.6, 0.05, -0.01, 0.9],
                    duration: 2,
                  }}
                  className='w-full h-full overflow-hidden'
                >
                  <a
                    className='cursor-pointer ig-gallery-img'
                    href={images[1].url}
                  >
                    <img
                      alt='gallery'
                      className='block object-cover object-center w-full h-full'
                      src={images[1].src}
                      width={images[1].width}
                      height={images[1].height}
                    />
                  </a>
                </motion.div>
              </div>
              <div className='relative w-full h-64 p-1 overflow-hidden md:h-96 md:p-2'>
                <motion.div
                  key={images[2].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: [0.6, 0.05, -0.01, 0.9],
                    duration: 2,
                  }}
                  className='w-full h-full overflow-hidden'
                >
                  <a
                    className='cursor-pointer ig-gallery-img'
                    href={images[2].url}
                  >
                    <img
                      alt='gallery'
                      className='block object-cover object-center w-full h-full'
                      src={images[2].src}
                      width={images[2].width}
                      height={images[2].height}
                    />
                  </a>
                </motion.div>
              </div>
            </div>
            <div className='flex flex-wrap w-full md:w-1/2'>
              <div className='relative w-full p-1 overflow-hidden h-96 md:h-96 md:p-2'>
                <motion.div
                  key={images[3].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: [0.6, 0.05, -0.01, 0.9],
                    duration: 2,
                  }}
                  className='w-full h-full overflow-hidden'
                >
                  <a
                    className='cursor-pointer ig-gallery-img'
                    href={images[3].url}
                  >
                    <img
                      alt='gallery'
                      className='block object-cover object-center w-full h-full'
                      src={images[3].src}
                      width={images[3].width}
                      height={images[3].height}
                    />
                  </a>
                </motion.div>
              </div>
              <div className='relative w-1/2 h-48 p-1 overflow-hidden md:h-80 md:p-2'>
                <motion.div
                  key={images[4].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: [0.6, 0.05, -0.01, 0.9],
                    duration: 2,
                  }}
                  className='w-full h-full overflow-hidden'
                >
                  <a
                    className='cursor-pointer ig-gallery-img'
                    href={images[4].url}
                  >
                    <img
                      alt='gallery'
                      className='block object-cover object-center w-full h-full'
                      src={images[4].src}
                      width={images[4].width}
                      height={images[4].height}
                    />
                  </a>
                </motion.div>
              </div>
              <div className='relative w-1/2 h-48 p-1 overflow-hidden md:h-80 md:p-2'>
                <motion.div
                  key={images[5].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: [0.6, 0.05, -0.01, 0.9],
                    duration: 2,
                  }}
                  className='w-full h-full overflow-hidden'
                >
                  <a
                    className='cursor-pointer ig-gallery-img'
                    href={images[5].url}
                  >
                    <img
                      alt='gallery'
                      className='block object-cover object-center w-full h-full'
                      src={images[5].src}
                      width={images[5].width}
                      height={images[5].height}
                    />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>

          <div className='w-full mx-auto mt-8 text-center text-pink-700'>
            <InstagramIcon
              aria-label='instagram'
              className='mx-auto text-4xl fill-current'
            />
            <a href='https://instagram.com/joshmu'>@joshmu</a>
          </div>
        </div>
      </AnimatePresence>
    </section>
  )
}

export default Gallery
