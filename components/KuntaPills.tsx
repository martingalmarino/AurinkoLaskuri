'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { getAllKuntaSlugs } from '@/lib/kunnatFI';

interface KuntaPillsProps {
  currentKunta?: string;
}

export default function KuntaPills({ currentKunta }: KuntaPillsProps) {
  const kunnatSlugs = getAllKuntaSlugs();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const getKuntaName = (slug: string) => {
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');
  };

  return (
    <section className="py-16 bg-bg-primary">
      <div className="container-premium">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center mr-3">
              <MapPin className="w-5 h-5 text-primary-800" />
            </div>
            <h2 className="text-2xl font-bold">
              Valitse kunta
            </h2>
          </div>
          <p className="text-text-muted max-w-2xl mx-auto">
            Löydä aurinkopaneelien laskuri kotikuntasi tai lähikuntasi sivulta
          </p>
        </div>

        {/* Scrollable Pills Container */}
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-bg-primary border border-text-light/20 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-bg-secondary"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-text-primary" />
          </button>

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-bg-primary border border-text-light/20 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-bg-secondary"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-text-primary" />
          </button>

          {/* Scrollable Pills */}
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide py-4 px-12"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {kunnatSlugs.map((slug, index) => {
              const isActive = currentKunta === slug;
              const kuntaName = getKuntaName(slug);
              
              return (
                <Link
                  key={slug}
                  href={`/fi/aurinkopaneelit-laskuri/${slug}`}
                  className={`kunta-pill flex-shrink-0 transition-all duration-300 animate-fade-in ${
                    isActive ? 'active' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="font-semibold">{kuntaName}</span>
                  {isActive && (
                    <div className="ml-2 w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Popular Cities Highlight */}
        <div className="mt-12">
          <h3 className="text-center text-sm font-semibold text-text-muted mb-6">
            Suosituimmat kaupungit
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['helsinki', 'tampere', 'oulu', 'turku'].map((slug) => {
              const isActive = currentKunta === slug;
              const kuntaName = getKuntaName(slug);
              
              return (
                <Link
                  key={slug}
                  href={`/fi/aurinkopaneelit-laskuri/${slug}`}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                    isActive
                      ? 'border-primary-800 bg-primary-50 text-primary-800'
                      : 'border-text-light/20 bg-bg-primary hover:border-primary-200 hover:bg-primary-50/50'
                  }`}
                >
                  <div className="font-semibold text-sm">{kuntaName}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
