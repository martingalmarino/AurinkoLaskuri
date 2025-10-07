import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DataModeToggle from '@/components/DataModeToggle'
import CookiehubDebug from '@/components/CookiehubDebug'

// Declare Cookiehub types
declare global {
  interface Window {
    cookiehub?: {
      load: (config: any) => void;
    };
  }
}

// Force new deployment

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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'development' && <DataModeToggle />}
        <CookiehubDebug />
        
        {/* Google AdSense */}
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6771833588582297"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* Cookiehub - Direct Implementation */}
        <script 
          src="https://cdn.cookiehub.eu/c2/b09a7fff.js" 
          async
        />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Enhanced Cookiehub initialization
            (function() {
              console.log('🍪 Cookiehub initialization script starting...');
              
              function loadCookiehub() {
                console.log('🍪 Loading Cookiehub...');
                console.log('🍪 Domain:', window.location.hostname);
                console.log('🍪 Script ID: c2/b09a7fff');
                
                if (typeof window.cookiehub !== 'undefined') {
                  console.log('🍪 Cookiehub object found, initializing...');
                  try {
                    var cpm = {};
                    window.cookiehub.load(cpm);
                    console.log('🍪 Cookiehub loaded successfully');
                    
                    // Check for banner after loading
                    setTimeout(function() {
                      var selectors = [
                        '[data-cookiehub]',
                        '.cookiehub-banner',
                        '.cookiehub-widget',
                        '#cookiehub-banner',
                        '.cookie-consent-banner'
                      ];
                      
                      var banner = null;
                      for (var i = 0; i < selectors.length; i++) {
                        banner = document.querySelector(selectors[i]);
                        if (banner) break;
                      }
                      
                      console.log('🍪 Banner found:', !!banner);
                      if (banner) {
                        console.log('🍪 Banner element:', banner);
                        console.log('🍪 Banner display:', window.getComputedStyle(banner).display);
                        console.log('🍪 Banner visibility:', window.getComputedStyle(banner).visibility);
                        console.log('🍪 Banner opacity:', window.getComputedStyle(banner).opacity);
                      } else {
                        console.log('🍪 No banner found, checking DOM for any cookiehub elements...');
                        var allElements = document.querySelectorAll('*');
                        var cookiehubElements = [];
                        for (var j = 0; j < allElements.length; j++) {
                          if (allElements[j].className.includes('cookiehub') || 
                              allElements[j].id.includes('cookiehub') ||
                              allElements[j].getAttribute('data-cookiehub')) {
                            cookiehubElements.push(allElements[j]);
                          }
                        }
                        console.log('🍪 Found cookiehub-related elements:', cookiehubElements.length);
                      }
                    }, 3000);
                    
                  } catch (error) {
                    console.error('🍪 Error loading Cookiehub:', error);
                  }
                } else {
                  console.log('🍪 Cookiehub object not found yet');
                  return false;
                }
                return true;
              }
              
              // Try loading immediately
              if (document.readyState === 'complete') {
                loadCookiehub();
              } else {
                window.addEventListener('load', function() {
                  setTimeout(loadCookiehub, 100);
                });
              }
              
              // Fallback attempts
              setTimeout(loadCookiehub, 1000);
              setTimeout(loadCookiehub, 3000);
              setTimeout(loadCookiehub, 5000);
            })();
          `
        }} />
      </body>
    </html>
  )
}
