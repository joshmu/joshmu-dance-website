import {
  AiOutlineCopyright as CopyrightIcon,
  AiFillInstagram as InstagramIcon,
  AiOutlineTwitter as TwitterIcon,
} from 'react-icons/ai'
import { FaFacebookF as FacebookIcon } from 'react-icons/fa'

export default function Footer() {
  return (
    <div className='flex items-center justify-between w-full px-4 bg-themeText text-themeBackground'>
      <div className='text-sm'>
        <p>
          <span className='text-themeAccent'>Josh Mu</span>{' '}
          <CopyrightIcon className='relative inline fill-current' />{' '}
          <span>{new Date().getFullYear()}</span>
        </p>
      </div>
      <div>
        <ul className='flex items-center justify-center'>
          <li>
            <a
              className='inline-block px-1 py-4 transition-colors duration-300 ease-in-out cursor-pointer hover:text-themeAccent'
              href='https://www.facebook.com/josh.mu'
            >
              <FacebookIcon className='text-xl fill-current' />
            </a>
          </li>
          <li>
            <a
              className='inline-block px-1 py-4 transition-colors duration-300 ease-in-out cursor-pointer hover:text-themeAccent'
              href='https://www.instagram.com/joshmu'
            >
              <InstagramIcon className='text-xl fill-current' />
            </a>
          </li>
          <li>
            <a
              className='inline-block px-1 py-4 transition-colors duration-300 ease-in-out cursor-pointer hover:text-themeAccent'
              href='https://www.twitter.com/josh_mu_'
            >
              <TwitterIcon className='text-xl fill-current' />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
