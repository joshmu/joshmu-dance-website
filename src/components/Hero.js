import { MdKeyboardArrowDown as ArrowDownIcon } from 'react-icons/md'
import { useThemeContext } from '../context/themeContext'
import useLocation from '../hooks/useLocation'
import FixedBackground from './FixedBackground'
import Overlay from './Overlay'
import { scroller } from 'react-scroll'
import heroImg from '../../public/assets/forearm_pg.jpg'

export default function Hero(props) {
  const { toggleTheme } = useThemeContext()
  const { ref } = useLocation('home')

  const scrollTo = elemId => {
    scroller.scrollTo(elemId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
  }

  return (
    <div ref={ref} className='relative w-full h-screen text-themeBg' {...props}>
      <FixedBackground
        src={heroImg}
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
            onClick={() => scrollTo('about')}
            className='transition-colors duration-300 ease-in-out cursor-pointer fill-current animate-bounce hover:text-themeAccent'
          />
        </div>
      </FixedBackground>
    </div>
  )
}
