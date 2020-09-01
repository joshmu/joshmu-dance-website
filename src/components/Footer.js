import {
  AiOutlineCopyright as CopyrightIcon,
  AiFillInstagram as InstagramIcon,
  AiOutlineTwitter as TwitterIcon,
} from 'react-icons/ai'
import { FaFacebookF as FacebookIcon } from 'react-icons/fa'

export default function Footer() {
  return (
    <div className='flex items-center justify-between w-full px-4 py-2 bg-themeText text-themeBackground'>
      <div className='text-sm'>
        <p>
          <span className='text-themeAccent'>Josh Mu</span>{' '}
          <CopyrightIcon className='relative inline fill-current' />{' '}
          <span>{new Date().getFullYear()}</span>
        </p>
      </div>
      <div>
        <ul className='flex items-center justify-center text-xl'>
          <li className='px-1'>
            <a
              className='p-2 transition-colors duration-300 ease-in-out cursor-pointer hover:text-themeAccent'
              href='https://www.facebook.com/josh.mu'
            >
              <FacebookIcon className='fill-current' />
            </a>
          </li>
          <li className='px-1'>
            <a
              className='p-2 transition-colors duration-300 ease-in-out cursor-pointer hover:text-themeAccent'
              href='https://www.instagram.com/joshmu'
            >
              <InstagramIcon className='fill-current' />
            </a>
          </li>
          <li className='px-1'>
            <a
              className='p-2 transition-colors duration-300 ease-in-out cursor-pointer hover:text-themeAccent'
              href='https://www.twitter.com/josh_mu_'
            >
              <TwitterIcon />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
