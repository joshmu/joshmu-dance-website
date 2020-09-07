import { GlobalProvider } from '../src/context/globalContext'
import { ThemeProvider } from '../src/context/themeContext'
import { ParallaxProvider } from 'react-scroll-parallax'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <ParallaxProvider>
          <Component {...pageProps} />
        </ParallaxProvider>
      </ThemeProvider>
    </GlobalProvider>
  )
}

export default MyApp
