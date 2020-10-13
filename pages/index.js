import About from '@/components/About/About'
import Companies from '@/components/Companies/Companies'
import Contact from '@/components/Contact/Contact'
import Critics from '@/components/Critics/Critics'
import Gallery from '@/components/Gallery/Gallery'
import Hero from '@/components/Hero/Hero'
import Layout from '@/components/Layout/Layout'
import News from '@/components/News/News'
import Twitter from '@/components/Twitter/Twitter'

const Home = () => {
  return (
    <Layout>
      {/* use ids to designate where to scroll to */}
      <Hero id='home' />
      <About id='about' />
      <Companies />
      <News id='news' />
      <Twitter />
      <Gallery id='portfolio' />
      <Critics id='critics' />
      <Contact id='contact' />
    </Layout>
  )
}

export default Home
