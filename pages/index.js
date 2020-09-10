import Layout from '../src/components/Layout'
import Hero from '../src/components/Hero'
import About from '../src/components/About'
import Companies from '../src/components/Companies'
import News from '../src/components/News'
import Twitter from '../src/components/Twitter'
import Gallery from '../src/components/Gallery'
import Critics from '../src/components/Critics'
import Contact from '../src/components/Contact'
import { useGlobalContext } from '../src/context/globalContext'

// todo: scrollToRef solution for mobile

export default function Home() {
  const { sectionRefs } = useGlobalContext()

  return (
    <Layout>
      <div ref={sectionRefs['home']}>
        <Hero />
      </div>
      <div ref={sectionRefs['about']}>
        <About />
        <Companies />
      </div>
      <div ref={sectionRefs['news']}>
        <News />
        <Twitter />
      </div>
      <div ref={sectionRefs['portfolio']}>
        <Gallery />
      </div>
      <div ref={sectionRefs['critics']}>
        <Critics />
      </div>
      <div ref={sectionRefs['contact']}>
        <Contact />
      </div>
    </Layout>
  )
}
