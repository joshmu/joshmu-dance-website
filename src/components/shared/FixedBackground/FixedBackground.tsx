import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

export const FixedBackground = ({
  src = '/assets/waves.jpg',
  alt = 'image from joshmu.com',
  children,
  ...props
}) => {
  const [isMobileAfterLoad, setIsMobileAfterLoad] = useState(null)

  // we need to initially recreate isMobile as it loads src using 'undefined'
  useEffect(() => {
    if (Boolean(isMobile)) setIsMobileAfterLoad(isMobile)
  }, [])

  const divStyle = {
    background: `url(${src})`,
    // disable when on mobile devices
    backgroundAttachment: isMobileAfterLoad ? 'scroll' : 'fixed',
    // backgroundAttachment: 'scroll',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    zIndex: 1,
  }

  return (
    <div style={divStyle} {...props}>
      {children}
    </div>
  )
}
