import useLocation from '@/hooks/useLocation'
import LineAccent from '@/shared/LineAccent/LineAccent'
import Reveal from '@/shared/ux/Reveal'

const News = props => {
  const { ref } = useLocation('news')

  return (
    <>
      <div ref={ref} className='container py-24 mx-auto' {...props}>
        <h2 className='text-3xl font-light text-center uppercase'>
          What I'm doing in <span className='font-semibold'>2020</span>
        </h2>
        <LineAccent center />
        <div className='my-8 text-center'>
          <Reveal>
            <p className='text-center text-themeTextSecondary'>
              Here is a preview of my most recent work.
            </p>
          </Reveal>
          <span> </span>
          <Reveal
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: [0.6, 0.05, -0.01, 0.9],
            }}
          >
            <span className='text-3xl font-semibold tracking-tight text-center text-themeText'>
              ZERO
            </span>
          </Reveal>
        </div>

        {/* Video Embed */}
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
          <iframe
            src='https://player.vimeo.com/video/456437416?autoplay=1&loop=1&byline=0&portrait=0&muted=1'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            allowFullScreen
          ></iframe>
          <script src='https://player.vimeo.com/api/player.js'></script>
        </div>
      </div>
    </>
  )
}

export default News
