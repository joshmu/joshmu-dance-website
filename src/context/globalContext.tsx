import { createContext, useContext, useState, useEffect } from 'react'
import { useScroll } from 'framer-motion'

interface IGlobalContext {
  SECTIONS: string[]
  scrollProgress: number
  currentView: string
}

const globalContext = createContext<IGlobalContext>({
  SECTIONS: [],
  scrollProgress: 0,
  currentView: '',
})

export function GlobalProvider({ children }) {
  const [currentView, setCurrentView] = useState('hero')
  const { scrollYProgress } = useScroll()
  const [scrollProgress, setScrollProgress] = useState(0)

  // const SECTIONS = ['home', 'about', 'news', 'portfolio', 'critics', 'contact']
  const SECTIONS = ['home', 'about', 'news', 'critics', 'contact']

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

  const value = {
    SECTIONS,
    scrollYProgress,
    scrollProgress,
    currentView,
    setCurrentView,
  }

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(globalContext)
}
