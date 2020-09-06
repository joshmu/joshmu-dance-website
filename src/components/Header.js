import { useTransform, AnimatePresence } from 'framer-motion'
import { useGlobalContext } from '../context/globalContext'

import { motion } from 'framer-motion'
import Compressor from './Compressor'
import { useThemeContext } from '../context/themeContext'
import { isMobile } from 'react-device-detect'

// animation
const parentAnimation = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}
const childAnimation = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      // yoyo: Infinity,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
}

export default function Header() {
  const {
    SECTIONS,
    scrollYProgress,
    currentView,
    scrollToRef,
  } = useGlobalContext()
  const { toggleTheme } = useThemeContext()

  const widthProgress = useTransform(scrollYProgress, [0, 0.3, 1], [8, 0, 0])

  const handleClick = item => {
    scrollToRef(item)
  }

  return (
    <div className='fixed z-50 w-full mx-4 mt-4 sm:mx-0'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <div
            onClick={toggleTheme}
            className='h-full text-2xl font-semibold uppercase cursor-pointer '
          >
            <Compressor text='josh mu' hide='osh ' />
          </div>
          {!isMobile && (
            <div className='relative flex uppercase'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='absolute top-0 right-0 w-24 h-full -mr-24 transition-all duration-300 bg-themeText'
              ></motion.div>
              <motion.ul
                initial='hidden'
                animate='show'
                variants={parentAnimation}
                className='flex items-center justify-center h-full px-4 py-1 overflow-hidden text-sm transition-all duration-300 rounded-l-sm bg-themeText text-themeBackground'
              >
                {SECTIONS.map(item => (
                  <li key={item}>
                    <motion.button
                      onClick={() => handleClick(item)}
                      variants={childAnimation}
                      style={{
                        padding: '3px ' + (widthProgress.get() + 6) + 'px',
                        scale: currentView === item ? 1.5 : 1,
                      }}
                      className={`${
                        currentView === item
                          ? 'active font-semibold'
                          : 'font-normal'
                      } uppercase relative transition-colors duration-300 ease-in-out focus:outline-none`}
                      whileHover={{ scale: 1.5 }}
                    >
                      {item}
                    </motion.button>
                  </li>
                ))}
              </motion.ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
