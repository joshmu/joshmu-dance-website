import { createContext, useContext, useEffect, useState } from 'react'

const themeContext = createContext({
  theme: '',
  toggleTheme: () => {},
})

const TYPES = {
  dark: 'theme-dark',
  light: 'theme-light',
}

export function ThemeProvider(props) {
  // initial default is light theme
  const [theme, setTheme] = useState('light')

  // initial theme
  useEffect(() => {
    // get locally stored theme
    let savedTheme = window.localStorage.getItem('theme')

    // if we have a saved theme then set it
    // otherwise update localStorage with default initial theme
    savedTheme
      ? setTheme(savedTheme)
      : window.localStorage.setItem(LOCALSTORAGE_KEY, theme)
  }, [])

  // when theme changes then assign to body tag
  useEffect(() => {
    Object.entries(TYPES).forEach(([, className]) =>
      globalThis.document.body.classList.remove(className)
    )
    globalThis.document.body.classList.add(TYPES[theme])
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    window.localStorage.setItem('theme', newTheme)
  }

  const value = {
    theme,
    toggleTheme,
  }

  return <themeContext.Provider value={value} {...props} />
}

export function useThemeContext() {
  return useContext(themeContext)
}
