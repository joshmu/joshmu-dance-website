import { MdKeyboardArrowDown as ArrowDownIcon } from 'react-icons/md'
import { useThemeContext } from '../context/themeContext'
import useLocation from '../hooks/useLocation'
import { useGlobalContext } from '../context/globalContext'
import FixedBackground from './FixedBackground'
import Overlay from './Overlay'

export default function Hero() {
  const { scrollToRef } = useGlobalContext()
  const { toggleTheme } = useThemeContext()
  const { ref } = useLocation('home')

  return (
    <div ref={ref} className='relative w-full h-screen text-themeBackground'>
      <FixedBackground
        src='./assets/forearm.jpg'
        alt='josh mu upside down at carriageworks sydney, image taken by Pedro Grieg'
      >
        <Overlay />
        <div className='relative flex flex-col items-center justify-center w-full h-full'>
          <h1
            onClick={toggleTheme}
            className='z-10 font-semibold text-center uppercase cursor-pointer text-7xl sm:text-8xl'
          >
            josh mu
          </h1>
          <p className='z-10'>
            <span>performer</span> | <span>choreographer</span> |{' '}
            <span>teacher</span>
          </p>
        </div>
        <div className='absolute bottom-0 z-10 flex items-center justify-center w-full mb-8 text-4xl '>
          <ArrowDownIcon
            onClick={() => scrollToRef('about')}
            className='transition-colors duration-300 ease-in-out cursor-pointer fill-current animate-bounce hover:text-themeAccent'
          />
        </div>
      </FixedBackground>
    </div>
  )
}
