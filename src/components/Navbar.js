import { useState } from 'react'
import { useGlobalContext } from '../context/globalContext'

import { motion, AnimatePresence } from 'framer-motion'
import Compressor from './Compressor'
import { useThemeContext } from '../context/themeContext'
import { isMobile, mobileVendor } from 'react-device-detect'
import MobileMenuBtn from './MobileMenuBtn'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { SECTIONS, currentView, scrollToRef } = useGlobalContext()
  const { toggleTheme } = useThemeContext()

  const handleClick = item => {
    scrollToRef(item)
  }

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

  return (
    <div
      className={`${
        currentView !== 'home'
          ? 'text-themeBackground bg-themeText h-12 shadow-lg'
          : 'bg-transparent h-16 text-themeBackground'
      } fixed z-50 w-full items-center justify-center transition-all duration-700 ease-in-out`}
    >
      <div className='container h-full mx-auto'>
        <div className='flex items-center justify-between w-full h-full px-4'>
          <div
            onClick={toggleTheme}
            className='flex h-full text-2xl font-semibold uppercase cursor-pointer'
          >
            <Compressor text='josh mu' hide='osh ' />
          </div>

          {isMobile ? (
            <div className='relative flex flex-col items-center'>
              <MobileMenuBtn
                handleClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                }}
                isOpen={isMobileMenuOpen}
              />
            </div>
          ) : (
            <div className='relative flex h-full uppercase'>
              <motion.ul
                initial='hidden'
                animate='show'
                variants={parentAnimation}
                className='flex items-center justify-center h-full px-4 py-1 overflow-hidden text-sm rounded-l-sm'
              >
                {SECTIONS.map(item => (
                  <li key={item}>
                    <motion.button
                      onClick={() => handleClick(item)}
                      variants={childAnimation}
                      className={`${
                        currentView === item
                          ? 'active text-themeAccent'
                          : 'font-normal'
                      } uppercase relative px-3 py-2 focus:outline-none`}
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex justify-end w-full'
          >
            <MobileMenu
              sections={SECTIONS}
              currentView={currentView}
              handleClick={handleClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
