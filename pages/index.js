import Reveal from '../src/components/Reveal'
import Layout from '../src/components/Layout'
import Hero from '../src/components/Hero'
import About from '../src/components/About'
import Companies from '../src/components/Companies'
import LineAccent from '../src/components/LineAccent'
import Twitter from '../src/components/Twitter'
import Critics from '../src/components/Critics'
import Contact from '../src/components/Contact'

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Companies />

      <div className='container mx-auto mt-24'>
        <h2 className='text-3xl font-light text-center uppercase'>
          What I'm doing in <span className='font-semibold'>2020</span>
        </h2>
        <LineAccent center />
        <div className='mt-8'>
          <Reveal>
            <p className='text-center'>nothing. 😭</p>
          </Reveal>
        </div>

        <div className='flex items-center justify-center w-full mt-8'>
          <iframe
            className='w-4/5 h-96'
            // width='900'
            // height='400'
            src='https://www.youtube-nocookie.com/embed/LK-DOKAX_RU'
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <Twitter />

      <div>Gallery</div>

      <Critics />

      <Contact />

      {/* <Reveal>
          <h1 className='p-8 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500'>
            Next.js Tailwind CSS Starte
            <span className='text-blue-500 uppercase animate-pulse'>r</span>
          </h1>
        </Reveal> */}
    </Layout>
  )
}
