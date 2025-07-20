'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'

import { initGA, logPageView } from '@/services/googleAnalytics'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
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
    <motion.div
      key="layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* theme wrapper style */}
      <div className="overflow-hidden font-sans antialiased transition-colors duration-300 ease-in-out">
        {/* content */}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </motion.div>
  )
}