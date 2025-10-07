import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DataModeToggle from '@/components/DataModeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AurinkoCalc - Aurinkopaneelien ROI Laskuri Suomi',
  description: 'Laske aurinkopaneelien takaisinmaksuaika ja säästöt Suomessa. Käyttää FMI säteilytietoja ja Nord Pool sähkön hintoja tarkkojen laskelmien tekemiseen.',
  keywords: 'aurinkopaneelit, ROI, takaisinmaksuaika, sähkö, säästöt, Suomi, FMI, Nord Pool',
  authors: [{ name: 'AurinkoCalc' }],
  creator: 'AurinkoCalc',
  publisher: 'AurinkoCalc',
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
    url: 'https://www.aurinkocalc.com',
    siteName: 'AurinkoCalc',
    title: 'AurinkoCalc - Aurinkopaneelien ROI Laskuri Suomi',
    description: 'Laske aurinkopaneelien takaisinmaksuaika ja säästöt Suomessa. Käyttää ajantasaisia tietoja.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AurinkoCalc - Aurinkopaneelien ROI Laskuri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AurinkoCalc - Aurinkopaneelien ROI Laskuri Suomi',
    description: 'Laske aurinkopaneelien takaisinmaksuaika ja säästöt Suomessa.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'Ncw_x4lCCTO9FEpPLJAJ-26kTd2c8pm2bfUgm1Zoc1Y',
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
        <link rel="canonical" href="https://www.aurinkocalc.com" />
        <link rel="alternate" hrefLang="fi" href="https://www.aurinkocalc.com" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.cookiehub.eu/c2/b09a7fff.js"></script>
        <script type="text/javascript">
          document.addEventListener("DOMContentLoaded", function(event) {
            var cpm = {};
            window.cookiehub.load(cpm);
          });
        </script>
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
