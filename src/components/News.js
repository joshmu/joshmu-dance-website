import LineAccent from './LineAccent'
import Reveal from './Reveal'
import useLocation from '../hooks/useLocation'

export default function News(props) {
  const { ref } = useLocation('news')

  return (
    <>
      <div ref={ref} className='container py-24 mx-auto' {...props}>
        <h2 className='text-3xl font-light text-center uppercase'>
          What I'm doing in <span className='font-semibold'>2020</span>
        </h2>
        <LineAccent center />
        <div className='my-8'>
          <Reveal>
            <p className='text-center text-themeTextSecondary'>
              Here is a preview of most recent creation...{' '}
              <span className='text-xl tracking-tight'>ZERO</span>. 🖤
            </p>
          </Reveal>
        </div>

        {/* ZERO Preview Footage */}
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
          <iframe
            src='https://player.vimeo.com/video/456437416?autoplay=1&loop=1&byline=0&portrait=0'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            frameBorder='0'
            allow='autoplay; fullscreen'
            allowFullScreen
          ></iframe>
          <script src='https://player.vimeo.com/api/player.js'></script>
        </div>
      </div>
    </>
  )
}
