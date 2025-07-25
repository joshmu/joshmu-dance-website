import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { scroller } from 'react-scroll'

import { useGlobalContext } from '@/context/globalContext'
import { useThemeContext } from '@/context/themeContext'
import useScreenSize from '@/hooks/useScreenSize'
import { Compressor } from '@/shared/ux/Compressor'

import MobileMenu from './MobileMenu/MobileMenu'
import MobileMenuBtn from './MobileMenu/MobileMenuBtn/MobileMenuBtn'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { SECTIONS, currentView } = useGlobalContext()
  const { toggleTheme } = useThemeContext()

  const screenSize = useScreenSize()

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
      },
    },
  }

  const toggleMenu = (choice) => {
    const decision = choice === undefined ? !isMobileMenuOpen : choice
    setIsMobileMenuOpen(decision)
  }

  const scrollTo = (elemId) => {
    scroller.scrollTo(elemId, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    })
  }

  return (
    <header
      className={`${
        currentView !== 'home'
          ? 'text-themeBg bg-themeText h-12'
          : 'bg-transparent h-16 text-themeBg'
      } fixed z-50 w-full items-center justify-center transition-all duration-700 ease-in-out`}
    >
      <div className="container h-full mx-auto">
        <div className="flex items-center justify-between w-full h-full px-4">
          <div
            onClick={toggleTheme}
            className="flex h-full text-2xl font-semibold uppercase cursor-pointer"
          >
            <Compressor text="josh mu" hide="osh " />
          </div>

          {screenSize.name === 'sm' ? (
            <div className="relative flex flex-col items-center">
              <MobileMenuBtn
                toggleMenu={toggleMenu}
                isOpen={isMobileMenuOpen}
              />
            </div>
          ) : (
            <nav className="relative flex h-full uppercase">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={parentAnimation}
                className="flex flex-wrap items-center justify-center h-full px-4 py-1 overflow-hidden text-sm"
              >
                {SECTIONS.map((item) => (
                  <li key={item}>
                    <motion.button
                      onClick={() => scrollTo(item)}
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
            </nav>
          )}
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-end w-full -mt-px"
            >
              <MobileMenu
                sections={SECTIONS}
                currentView={currentView}
                scrollTo={scrollTo}
                toggleMenu={toggleMenu}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Navbar
