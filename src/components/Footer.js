import {
  AiOutlineCopyright as CopyrightIcon,
  AiFillInstagram as InstagramIcon,
  AiOutlineTwitter as TwitterIcon,
} from 'react-icons/ai'
import { FaFacebookF as FacebookIcon } from 'react-icons/fa'
import Reveal from './Reveal'

export default function Footer() {
  return (
    <div className='flex items-center justify-between w-full px-4 bg-varDark text-varLight'>
      <div className='text-sm'>
        <p>
          <span className='text-themeAccent'>Josh Mu</span>{' '}
          <CopyrightIcon className='relative inline fill-current' />{' '}
          <span>{new Date().getFullYear()}</span>
        </p>
      </div>
      <div>
        <ul className='flex items-center justify-center'>
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
              <FacebookIcon className='text-xl fill-current' />
            </a>
          </Reveal>
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
              <InstagramIcon className='text-xl fill-current' />
            </a>
          </Reveal>
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
              <TwitterIcon className='text-xl fill-current' />
            </a>
          </Reveal>
        </ul>
      </div>
    </div>
  )
}
