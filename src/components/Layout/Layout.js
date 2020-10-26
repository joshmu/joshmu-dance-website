import { motion } from 'framer-motion'
import Head from 'next/head'
import { useEffect } from 'react'

import { initGA, logPageView } from '@/services/googleAnalytics'

import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import MetaTags from './MetaTags/MetaTags'

const Layout = ({ children }) => {
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

  const meta = {
    title: 'Josh Mu - Official Dance Website',
    description: 'The official website for professional dance artist Josh Mu.',
    imgUrl: 'https://joshmu.com/assets/avatar.jpg',
  }

  return (
    <motion.div
      key='layout'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <MetaTags
          title={meta.title}
          description={meta.description}
          imgUrl={meta.imgUrl}
        />
      </Head>

      {/* theme wrapper style */}
      <div className='overflow-hidden font-sans antialiased transition-colors duration-300 ease-in-out debug-screens'>
        {/* content */}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </motion.div>
  )
}

export default Layout
