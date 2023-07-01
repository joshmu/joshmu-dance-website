import { motion } from 'framer-motion'
import Head from 'next/head'
import { useEffect } from 'react'

import { initGA, logPageView } from '@/services/googleAnalytics'

import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

const metaData = {
  title: 'Josh Mu - Official Dance Website',
  description: 'The official website for professional dance artist Josh Mu.',
  keywords: 'josh mu, dance, yoga, web dev, art, official',
  origin: 'https://joshmu.com',
  imgUrl: 'https://joshmu.com/assets/avatar.jpg',
}

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

  return (
    <motion.div
      key="layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>{metaData.title}</title>

        {/* // * meta needs to be direct child of <Head> otherwise nextjs breaks... */}
        {/* HTML Meta Tags */}
        {/* Meta Tags Generated via http://heymeta.com</meta> */}
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content={metaData.title} />
        <meta itemProp="description" content={metaData.description} />
        <meta itemProp="image" content={metaData.imgUrl} />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content={metaData.origin} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.imgUrl} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaData.title} />
        <meta name="twitter:description" content={metaData.description} />
        <meta name="twitter:image" content={metaData.imgUrl} />

        {/* favicon */}
        {/* https://realfavicongenerator.net/ */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      {/* theme wrapper style */}
      <div className="overflow-hidden font-sans antialiased transition-colors duration-300 ease-in-out debug-screens">
        {/* content */}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </motion.div>
  )
}

export default Layout
