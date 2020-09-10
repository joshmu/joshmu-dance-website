import LineAccent from './LineAccent'
import Reveal from './Reveal'
import useLocation from '../hooks/useLocation'

export default function News(props) {
  const { ref } = useLocation('news')

  return (
    <div ref={ref} className='container py-24 mx-auto' {...props}>
      <h2 className='text-3xl font-light text-center uppercase'>
        What I'm doing in <span className='font-semibold'>2020</span>
      </h2>
      <LineAccent center />
      <div className='mt-8'>
        <Reveal>
          <p className='text-center text-themeTextSecondary'>hibernating. 😴</p>
        </Reveal>
      </div>

      <div className='flex items-center justify-center w-full mt-8'>
        <iframe
          // className='w-full h-96'
          width='900'
          height='400'
          src='https://www.youtube-nocookie.com/embed/LK-DOKAX_RU'
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}
