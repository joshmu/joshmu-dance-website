import { createContext, useContext, useState, useEffect } from 'react'

const themeContext = createContext({
  theme: '',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null)

  // initial theme
  useEffect(() => {
    // get locally stored theme
    let savedTheme = window.localStorage.getItem('theme')
    // if nothing is stored lets initially default to 'light' and store for user
    if (!savedTheme) {
      savedTheme = 'light'
      window.localStorage.setItem('theme', savedTheme)
    }
    // set theme
    setTheme(savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    console.log(`${newTheme} theme`)
    setTheme(newTheme)
    window.localStorage.setItem('theme', newTheme)
  }

  return (
    <themeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </themeContext.Provider>
  )
}

export function useThemeContext() {
  return useContext(themeContext)
}
