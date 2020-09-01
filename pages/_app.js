import { GlobalProvider } from '../src/context/globalContext'
import { ThemeProvider } from '../src/context/themeContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </GlobalProvider>
  )
}

export default MyApp
