import {
  createContext,
  useContext,
  useState,
  useEffect,
  createRef,
} from 'react'
import { useViewportScroll } from 'framer-motion'

const globalContext = createContext({
  SECTIONS: [],
  scrollProgress: 0,
  currentView: '',
})

export function GlobalProvider({ children }) {
  const [currentView, setCurrentView] = useState('hero')
  const { scrollYProgress } = useViewportScroll()
  const [scrollProgress, setScrollProgress] = useState(0)

  const SECTIONS = ['home', 'about', 'news', 'portfolio', 'critics', 'contact']

  // initial scroll
  useEffect(() => {
    // handle motion
    function handleScroll() {
      setScrollProgress(scrollYProgress.get())
    }

    // subscribe
    const unsubscribeY = scrollYProgress.onChange(handleScroll)

    // destroy
    return () => {
      unsubscribeY()
    }
  }, [])

  return (
    <globalContext.Provider
      value={{
        SECTIONS,
        scrollYProgress,
        scrollProgress,
        currentView,
        setCurrentView,
      }}
    >
      {children}
    </globalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(globalContext)
}
