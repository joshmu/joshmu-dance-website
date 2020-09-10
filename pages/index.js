import Layout from '../src/components/Layout'
import Hero from '../src/components/Hero'
import About from '../src/components/About'
import Companies from '../src/components/Companies'
import News from '../src/components/News'
import Twitter from '../src/components/Twitter'
import Gallery from '../src/components/Gallery'
import Critics from '../src/components/Critics'
import Contact from '../src/components/Contact'

export default function Home() {
  return (
    <Layout>
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
