import { motion } from 'framer-motion'
import Head from 'next/head'
import { useEffect, useRef } from 'react'

import { initGA, logPageView } from '@/services/googleAnalytics'

import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

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

  const metaRef = useRef({
    title: 'Josh Mu - Official Dance Website',
    description: 'The official website for professional dance artist Josh Mu.',
    keywords: 'josh mu, dance, yoga, web dev, art, official',
    origin: null,
    imgUrl: '/assets/avatar.jpg',
  })
  useEffect(() => {
    const origin = window.location.origin
    metaRef.current.origin = origin
    metaRef.current.imgUrl = origin + metaRef.current.imgUrl
  }, [])

  return (
    <motion.div
      key='layout'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>{metaRef.current.title}</title>

        {/* // * meta needs to be direct child of <Head> otherwise nextjs breaks... */}
        {/* HTML Meta Tags */}
        {/* Meta Tags Generated via http://heymeta.com</meta> */}
        <meta name='description' content={metaRef.current.description} />
        <meta name='keywords' content={metaRef.current.keywords} />

        {/* Google / Search Engine Tags */}
        <meta itemProp='name' content={metaRef.current.title} />
        <meta itemProp='description' content={metaRef.current.description} />
        <meta itemProp='image' content={metaRef.current.imgUrl} />

        {/* Facebook Meta Tags */}
        <meta property='og:url' content={metaRef.current.origin} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={metaRef.current.title} />
        <meta property='og:description' content={metaRef.current.description} />
        <meta property='og:image' content={metaRef.current.imgUrl} />

        {/* Twitter Meta Tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={metaRef.current.title} />
        <meta
          name='twitter:description'
          content={metaRef.current.description}
        />
        <meta name='twitter:image' content={metaRef.current.imgUrl} />
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
