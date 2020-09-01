import Reveal from '../src/components/Reveal'
import Layout from '../src/components/Layout'
import Hero from '../src/components/Hero'
import About from '../src/components/About'
import Companies from '../src/components/Companies'

export default function Home() {
  return (
    <Layout>
      <div className='font-sans'>
        <Hero />
        <About />
        <Companies />

        <Reveal>
          <h1 className='p-8 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500'>
            Next.js Tailwind CSS Starte
            <span className='text-blue-500 uppercase animate-pulse'>r</span>
          </h1>
        </Reveal>
      </div>
    </Layout>
  )
}
