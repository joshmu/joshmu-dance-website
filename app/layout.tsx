import type { Metadata, Viewport } from 'next'
import './globals.scss'
import { Providers } from './providers'

const metaData = {
  title: 'Josh Mu - Official Dance Website',
  description: 'The official website for professional dance artist Josh Mu.',
  keywords: 'josh mu, dance, yoga, web dev, art, official',
  origin: 'https://joshmu.com',
  imgUrl: 'https://joshmu.com/assets/avatar.jpg',
}

export const metadata: Metadata = {
  title: metaData.title,
  description: metaData.description,
  keywords: metaData.keywords,
  metadataBase: new URL(metaData.origin),
  openGraph: {
    title: metaData.title,
    description: metaData.description,
    url: metaData.origin,
    siteName: metaData.title,
    images: [
      {
        url: metaData.imgUrl,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: metaData.title,
    description: metaData.description,
    images: [metaData.imgUrl],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' itemScope itemType='http://schema.org/WebPage'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}