import {
  RiMenu5Line as HamburgerIcon,
  RiCloseFill as CloseIcon,
} from 'react-icons/ri'
import { AnimatePresence, motion } from 'framer-motion'

export default function MobileMenuBtn({ isOpen, handleClick }) {
  return (
    <div
      onClick={handleClick}
      className='flex flex-col justify-center w-full h-full pr-2 transition-transform duration-1000 ease-in-out'
    >
      <AnimatePresence exitBeforeEnter>
        {isOpen ? (
          <motion.div
            key='opened'
            initial={{ opacity: 0, rotate: -180, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0 }}
          >
            <CloseIcon />
          </motion.div>
        ) : (
          <motion.div
            key='closed'
            initial={{ opacity: 0, rotate: -180, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0 }}
          >
            <HamburgerIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
