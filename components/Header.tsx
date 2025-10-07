'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-md border-b border-text-light/20">
      <div className="container-premium">
        <div className="flex justify-between items-center h-16 px-4 sm:px-0">
          {/* Logo */}
          <Link href="/" className="group">
            <span className="text-xl font-bold text-text-primary group-hover:text-primary-800 transition-colors">
              AurinkoLaskuri
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className="btn-ghost"
            >
              Koti
            </Link>
            <Link 
              href="/" 
              className="btn-ghost"
            >
              Laskuri
            </Link>
            <Link 
              href="/#features" 
              className="btn-ghost"
            >
              Tietoa
            </Link>
            <Link 
              href="/#faq" 
              className="btn-ghost"
            >
              FAQ
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link 
              href="/fi/aurinkopaneelit-laskuri/helsinki"
              className="bg-primary-800 hover:bg-primary-900 text-white font-semibold py-2 px-4 rounded-pill transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-sm hover:shadow-md text-sm"
            >
              Laske ROI
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-text-primary hover:bg-bg-secondary transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-text-light/20 animate-slide-up">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="btn-ghost justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                Koti
              </Link>
              <Link 
                href="/" 
                className="btn-ghost justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                Laskuri
              </Link>
              <Link 
                href="/#features" 
                className="btn-ghost justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                Tietoa
              </Link>
              <Link 
                href="/#faq" 
                className="btn-ghost justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="pt-4 mt-4 border-t border-text-light/20">
                <Link 
                  href="/fi/aurinkopaneelit-laskuri/helsinki"
                  className="bg-primary-800 hover:bg-primary-900 text-white font-semibold py-2 px-4 rounded-pill transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-sm hover:shadow-md text-sm w-full justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Laske ROI
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
