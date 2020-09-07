import { MdKeyboardArrowDown as ArrowDownIcon } from 'react-icons/md'
import { useThemeContext } from '../context/themeContext'
import useLocation from '../hooks/useLocation'
import { useGlobalContext } from '../context/globalContext'
import FixedBackground from './FixedBackground'

export default function Hero() {
  const { scrollToRef } = useGlobalContext()
  const { toggleTheme } = useThemeContext()
  const { ref } = useLocation('home')

  return (
    <div ref={ref} className='relative w-full h-screen overflow-hidden'>
      <FixedBackground
        src='./assets/waves.jpg'
        alt='josh upside down in the waves'
      >
        <div className='absolute z-10 w-full h-full transition-all duration-300 ease-in-out opacity-50 bg-themeBackground'></div>
        <div className='relative z-20 flex flex-col items-center justify-center w-full h-full'>
          <h1
            onClick={toggleTheme}
            className='font-semibold text-center uppercase cursor-pointer text-7xl text-themeText sm:text-8xl'
          >
            josh mu
          </h1>
          <p>
            <span>performer</span> | <span>choreographer</span> |{' '}
            <span>teacher</span>
          </p>
        </div>
        <div className='absolute bottom-0 z-30 flex items-center justify-center w-full mb-8 text-4xl '>
          <ArrowDownIcon
            onClick={() => scrollToRef('about')}
            className='transition-colors duration-300 ease-in-out cursor-pointer fill-current animate-bounce hover:text-themeAccent'
          />
        </div>
      </FixedBackground>
    </div>
  )
}
