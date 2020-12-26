import Link from 'next/link'
import {
  AiOutlineCopyright as CopyrightIcon,
  AiFillInstagram as InstagramIcon,
  AiOutlineTwitter as TwitterIcon,
} from 'react-icons/ai'
import { FaFacebookF as FacebookIcon } from 'react-icons/fa'
import { MdKeyboardArrowUp as ArrowUpIcon } from 'react-icons/md'
import { animateScroll as scroll } from 'react-scroll'

import Reveal from '@/shared/ux/Reveal'

const Footer = () => {
  const handleScrollToTopBtn = () => {
    scroll.scrollToTop()
  }

  return (
    <footer className='w-full bg-varDark text-varLight'>
      <div className='container relative mx-auto'>
        {/* scroll to top */}
        <div className='absolute top-0 left-1/2'>
          <div
            onClick={handleScrollToTopBtn}
            className='p-1 transition-colors duration-300 ease-in-out transform -translate-x-1/2 -translate-y-1/2 border-4 rounded-full cursor-pointer border-themeBg bg-themeAccent hover:bg-orange-500'
          >
            <ArrowUpIcon className='text-3xl fill-current sm:text-4xl' />
          </div>
        </div>

        <div className='flex items-center justify-between w-full px-4 '>
          {/* copyright */}
          <div className='text-sm'>
            <p>
              Developed by{' '}
              <Link href='https://joshmu.dev' target='_blank'>
                <span className='font-bold transition-colors duration-300 cursor-pointer text-themeAccent hover:text-orange-500'>
                  Josh Mu
                </span>
              </Link>{' '}
              <CopyrightIcon className='relative inline fill-current' />{' '}
              <span>{new Date().getFullYear()}</span>
            </p>
          </div>

          {/* social icons */}
          <div>
            <ul className='flex items-center justify-center'>
              <li>
                <Reveal
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    className='inline-block px-1 py-4 transition-colors duration-300 ease-in-out cursor-pointer hover:text-themeAccent'
                    href='https://www.facebook.com/josh.mu'
                  >
                    <FacebookIcon
                      aria-label='facebook'
                      className='text-xl fill-current'
                    />
                  </a>
                </Reveal>
              </li>
              <li>
                <Reveal
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    className='inline-block px-1 py-4 transition-colors duration-300 ease-in-out cursor-pointer hover:text-themeAccent'
                    href='https://www.instagram.com/joshmu'
                  >
                    <InstagramIcon
                      aria-label='instagram'
                      className='text-xl fill-current'
                    />
                  </a>
                </Reveal>
              </li>
              <li>
                <Reveal
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <a
                    className='inline-block px-1 py-4 transition-colors duration-300 ease-in-out cursor-pointer hover:text-themeAccent'
                    href='https://www.twitter.com/josh_mu_'
                  >
                    <TwitterIcon
                      aria-label='twitter'
                      className='text-xl fill-current'
                    />
                  </a>
                </Reveal>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
