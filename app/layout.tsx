import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DataModeToggle from '@/components/DataModeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AurinkoLaskuri - Aurinkopaneelien ROI Laskuri Suomi',
  description: 'Laske aurinkopaneelien takaisinmaksuaika ja säästöt Suomessa. Käyttää FMI säteilytietoja ja Nord Pool sähkön hintoja tarkkojen laskelmien tekemiseen.',
  keywords: 'aurinkopaneelit, ROI, takaisinmaksuaika, sähkö, säästöt, Suomi, FMI, Nord Pool',
  authors: [{ name: 'AurinkoLaskuri' }],
  creator: 'AurinkoLaskuri',
  publisher: 'AurinkoLaskuri',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fi_FI',
    url: 'https://aurinkolaskuri.fi',
    siteName: 'AurinkoLaskuri',
    title: 'AurinkoLaskuri - Aurinkopaneelien ROI Laskuri Suomi',
    description: 'Laske aurinkopaneelien takaisinmaksuaika ja säästöt Suomessa. Käyttää ajantasaisia tietoja.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AurinkoLaskuri - Aurinkopaneelien ROI Laskuri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AurinkoLaskuri - Aurinkopaneelien ROI Laskuri Suomi',
    description: 'Laske aurinkopaneelien takaisinmaksuaika ja säästöt Suomessa.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fi">
      <head>
        <link rel="canonical" href="https://aurinkolaskuri.fi" />
        <link rel="alternate" hrefLang="fi" href="https://aurinkolaskuri.fi" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'development' && <DataModeToggle />}
      </body>
    </html>
  )
}
