'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
      <div className="container-premium py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-2xl font-bold">AurinkoCalc</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md leading-relaxed">
              Suomen tarkin aurinkopaneelien ROI-laskuri. Käytämme ajantasaisia FMI säteilytietoja 
              ja Nord Pool sähkön hintoja tarkkojen laskelmien tekemiseen.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Pikalinkit</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/fi/aurinkopaneelit-laskuri/helsinki" className="text-white/80 hover:text-white transition-colors flex items-center group">
                  <div className="w-1 h-1 bg-white/60 rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                  Laskuri
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-white/80 hover:text-white transition-colors flex items-center group">
                  <div className="w-1 h-1 bg-white/60 rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                  Tietoa palvelusta
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-white/80 hover:text-white transition-colors flex items-center group">
                  <div className="w-1 h-1 bg-white/60 rounded-full mr-3 group-hover:bg-white transition-colors"></div>
                  Usein kysytyt kysymykset
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © {currentYear} AurinkoLaskuri. Kaikki oikeudet pidätetään.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                Tietosuojakäytäntö
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                Käyttöehdot
              </Link>
              <Link href="/cookies" className="text-white/60 hover:text-white text-sm transition-colors">
                Evästekäytäntö
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
