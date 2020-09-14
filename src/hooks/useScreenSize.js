import { useEffect, useState } from 'react'

export const useMediaQuery = query => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaMatch = window.matchMedia(query)
    setMatches(mediaMatch.matches)

    const handler = e => setMatches(e.matches)
    mediaMatch.addListener(handler)

    return () => mediaMatch.removeListener(handler)
  }, [])

  return matches
}

export const useScreenSize = () => {
  const SIZES = {
    sm: 640,
    md: 1024,
    lg: 1024,
    xl: 1280,
  }
  // based on tailwindcss breakpoints
  // const isSM = useMediaQuery('(min-width: 640px)')
  const isMD = useMediaQuery('(min-width: 768px)')
  const isLG = useMediaQuery('(min-width: 1024px)')
  const isXL = useMediaQuery('(min-width: 1280px)')

  // default to mobile first
  const [screenSize, setScreenSize] = useState({
    name: 'sm',
    size: SIZES['sm'],
  })

  // listen for changes
  useEffect(() => {
    // we need to cascade from largest to smallest since we detect min-width
    isXL
      ? setScreenSize({ name: 'xl', size: SIZES['xl'] })
      : isLG
      ? setScreenSize({ name: 'lg', size: SIZES['lg'] })
      : isMD
      ? setScreenSize({ name: 'md', size: SIZES['md'] })
      : setScreenSize({ name: 'sm', size: SIZES['sm'] })
  }, [isXL, isLG, isMD])

  return screenSize
}
