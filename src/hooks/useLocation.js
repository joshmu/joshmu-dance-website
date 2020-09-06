import { useEffect } from 'react'
import { useGlobalContext } from '../context/globalContext'
import { useInView } from 'react-intersection-observer'

export default function useLocation(location) {
  const { currentView, setCurrentView } = useGlobalContext()

  const [ref, inView] = useInView({
    // threshold: 0.7,
    rootMargin: '-50%', // reduce the area to to as minimal as possible so we don't get any cross over
  })

  useEffect(() => {
    if (inView && currentView !== location) {
      console.log({ inView, location })
      setCurrentView(location)
    }
  }, [inView, currentView])

  return { ref }
}
