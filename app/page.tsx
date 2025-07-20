'use client'

import About from '@/components/About/About'
import Companies from '@/components/Companies/Companies'
import Contact from '@/components/Contact/Contact'
import Critics from '@/components/Critics/Critics'
import Hero from '@/components/Hero/Hero'
import News from '@/components/News/News'
import Twitter from '@/components/Twitter/Twitter'
import { LayoutWrapper } from './layout-wrapper'

export default function Home() {
  return (
    <LayoutWrapper>
      {/* use ids to designate where to scroll to */}
      <Hero id='home' />
      <About id='about' />
      <Companies />
      <News id='news' />
      <Twitter />
      {/* // TODO: update instagram api */}
      {/* <Gallery id='portfolio' /> */}
      <Critics id='critics' />
      <Contact id='contact' />
    </LayoutWrapper>
  )
}