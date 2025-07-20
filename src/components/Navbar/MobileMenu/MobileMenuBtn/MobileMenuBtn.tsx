import { AnimatePresence, motion } from 'framer-motion'
import {
  RiCloseFill as CloseIcon,
  RiMenu5Line as HamburgerIcon,
} from 'react-icons/ri'

export default function MobileMenuBtn({ isOpen, toggleMenu }) {
  const handleClick = () => {
    toggleMenu()
  }
  return (
    <div
      onClick={handleClick}
      className='flex flex-col justify-center w-full h-full p-2 text-2xl bg-transparent cursor-pointer'
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key='opened'
            initial={{ opacity: 0, rotate: -180, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0 }}
            className='bg-transparent'
          >
            <CloseIcon className='fill-current' />
          </motion.div>
        ) : (
          <motion.div
            key='closed'
            initial={{ opacity: 0, rotate: -180, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 180, scale: 0 }}
            className='bg-transparent'
          >
            <HamburgerIcon className='fill-current' />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
