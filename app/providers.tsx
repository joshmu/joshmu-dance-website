'use client'

import { AnimatePresence } from 'framer-motion'
import { GlobalProvider } from '@/context/globalContext'
import { ThemeProvider } from '@/context/themeContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <AnimatePresence exitBeforeEnter>
          {children}
        </AnimatePresence>
      </ThemeProvider>
    </GlobalProvider>
  )
}