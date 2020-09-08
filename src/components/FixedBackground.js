import { isMobile } from 'react-device-detect'

export default function FixedBackground({
  src = './assets/waves.jpg',
  children,
  ...props
}) {
  return (
    <div
      className='relative w-full h-full'
      style={{
        background: `url(${src})`,
        // disable when on mobile devices
        backgroundAttachment: isMobile
          ? 'scroll !important'
          : 'fixed !important',
        backgroundSize: 'cover !important',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      {...props}
    >
      {children}
    </div>
  )
}
