import {
  createContext,
  useContext,
  useState,
  useEffect,
  createRef,
} from 'react'
import { useViewportScroll } from 'framer-motion'

const globalContext = createContext({
  scrollProgress: 0,
  currentView: '',
})

export function GlobalProvider({ children }) {
  const [currentView, setCurrentView] = useState('hero')
  const { scrollYProgress } = useViewportScroll()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [sectionRefs, setSectionRefs] = useState({})

  const SECTIONS = ['home', 'about', 'news', 'portfolio', 'critics', 'contact']

  // initial create ref list for sections
  useEffect(() => {
    const refsObj = SECTIONS.reduce((refsObj, name) => {
      refsObj[name] = createRef()
      return refsObj
    }, {})
    setSectionRefs(refsObj)
  }, [])

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

  const scrollToRef = name => {
    sectionRefs[name].current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <globalContext.Provider
      value={{
        SECTIONS,
        scrollYProgress,
        scrollProgress,
        currentView,
        setCurrentView,
        sectionRefs,
        scrollToRef,
      }}
    >
      {children}
    </globalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(globalContext)
}
