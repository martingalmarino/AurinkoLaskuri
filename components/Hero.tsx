'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Shield, Database, MapPin } from 'lucide-react';
import { KuntaData } from '@/lib/types';

interface HeroProps {
  kunta: KuntaData;
  electricityPrice?: number;
  solarRadiation?: number;
  children?: React.ReactNode;
}

export default function Hero({ kunta, electricityPrice, solarRadiation, children }: HeroProps) {
  const trustChips = [
    {
      label: 'FMI Data',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      label: 'Local Subsidies',
      color: 'bg-green-100 text-green-800'
    },
    {
      label: 'Updated Weekly',
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <section className="gradient-hero py-20 lg:py-28">
      <div className="container-hero">
        {/* Breadcrumbs */}
        <nav className="mb-12" aria-label="Breadcrumb">
          <div className="flex items-center justify-center">
            <ol className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-sm">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-primary-700 transition-colors font-medium">
                  Koti
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/#kunnat" className="text-sm text-gray-600 hover:text-primary-700 transition-colors font-medium">
                  Aurinkopaneelit
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm text-gray-900 font-semibold">{kunta.name}</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <h1 className="mb-6 animate-fade-in">
            Aurinkopaneelit Laskuri – {kunta.name}
          </h1>
          <p className="text-xl lg:text-2xl text-text-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            Laske aurinkopaneelien takaisinmaksuaika ja säästöt {kunta.name}ssa. 
            Käytämme ajantasaisia sähkön hintoja ja paikallisia säteilytietoja tarkkojen laskelmien tekemiseen.
          </p>

          {/* Simple Trust Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {trustChips.map((chip, index) => (
              <span key={index} className={`px-4 py-2 rounded-full text-sm font-medium ${chip.color} animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                {chip.label}
              </span>
            ))}
          </div>

          {/* Children content (Calculator) */}
          {children && (
            <div className="mt-12">
              {children}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
