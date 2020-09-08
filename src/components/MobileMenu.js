import { motion } from 'framer-motion'

export default function MobileMenu({
  currentView,
  sections,
  selectSection,
  toggleMenu,
}) {
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
      x: 50,
      opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        // yoyo: Infinity,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  }

  const handleMobileMenuClick = item => {
    toggleMenu(false)
    selectSection(item)
  }

  return (
    <div className='z-50 flex h-full text-right uppercase'>
      <motion.ul
        initial='hidden'
        animate='show'
        variants={parentAnimation}
        className={`${
          currentView !== 'home' ? 'bg-themeText shadow' : 'bg-transparent'
        } flex flex-col items-stretch transition-all duration-300 ease-in-out justify-center h-full px-4 py-1 overflow-hidden text-sm rounded-l-sm`}
      >
        {sections.map(item => (
          <li key={item}>
            <motion.button
              onClick={() => handleMobileMenuClick(item)}
              variants={childAnimation}
              className={`${
                currentView === item ? 'active text-themeAccent' : 'font-normal'
              } uppercase relative px-3 py-2 focus:outline-none bg-transparent`}
              whileHover={{ scale: 1.5 }}
            >
              {item}
            </motion.button>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}
