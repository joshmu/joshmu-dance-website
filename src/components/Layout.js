import Head from 'next/head'
import Footer from './Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeContext } from '../context/themeContext'
import Navbar from './Navbar'

export default function Layout({ children }) {
  const { theme } = useThemeContext()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Head>
          <title>Josh Mu</title>
        </Head>

        {/* theme wrapper style */}
        <div
          className={`${
            theme === 'dark' ? 'theme-dark' : 'theme-light'
          } text-themeText bg-themeBackground transition-colors duration-300 ease-in-out font-sans overflow-x-hidden`}
        >
          {/* content */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
