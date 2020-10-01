import { useEffect } from 'react'
import Head from 'next/head'
import Footer from './Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeContext } from '../context/themeContext'
import Navbar from './Navbar'
import { initGA, logPageView } from '../services/googleAnalytics'

export default function Layout({ children }) {
  const { theme } = useThemeContext()

  // initialise google analytics on load
  useEffect(() => {
    // @ts-ignore
    if (!window.GA_INITIALIZED) {
      initGA()
      // @ts-ignore
      window.GA_INITIALIZED = true
    }
    logPageView()
  }, [])

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
        <div className='overflow-hidden font-sans antialiased transition-colors duration-300 ease-in-out text-themeText bg-themeBg'>
          {/* content */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
