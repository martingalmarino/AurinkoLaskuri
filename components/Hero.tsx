'use client';

import React from 'react';
import { TrendingUp, Shield, Database, MapPin } from 'lucide-react';
import { KuntaData } from '@/lib/types';

interface HeroProps {
  kunta: KuntaData;
  electricityPrice?: number;
  solarRadiation?: number;
}

export default function Hero({ kunta, electricityPrice, solarRadiation }: HeroProps) {
  const trustChips = [
    {
      icon: Database,
      label: 'FMI Data',
      value: 'Live säteilytiedot',
      color: 'trust-chip-primary'
    },
    {
      icon: TrendingUp,
      label: 'Nord Pool',
      value: electricityPrice ? `${electricityPrice.toFixed(3)} €/kWh` : 'Live hinnat',
      color: 'trust-chip-success'
    },
    {
      icon: Shield,
      label: 'Paikalliset tuet',
      value: `${((kunta.subsidy.national.rate + kunta.subsidy.local.rate) * 100).toFixed(0)}%`,
      color: 'trust-chip-success'
    }
  ];

  return (
    <section className="gradient-hero py-20 lg:py-28">
      <div className="container-hero">
        {/* Breadcrumbs */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-text-muted">
            <li>
              <a href="/" className="hover:text-primary-800 transition-colors">
                Koti
              </a>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <a href="/fi/aurinkopaneelit-laskuri" className="hover:text-primary-800 transition-colors">
                Aurinkopaneelit
              </a>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-text-primary font-medium">{kunta.name}</span>
            </li>
          </ol>
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

          {/* Trust Chips */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {trustChips.map((chip, index) => (
              <div key={index} className={`trust-chip ${chip.color} animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                <chip.icon className="w-4 h-4 mr-2" />
                <span className="font-semibold">{chip.label}:</span>
                <span className="ml-2">{chip.value}</span>
              </div>
            ))}
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="feature-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary-800" />
              </div>
              <h3 className="font-semibold mb-3">Tarkka ROI-laskenta</h3>
              <p className="text-sm">
                Käyttää paikallisia sähkön hintoja ja säteilytietoja
              </p>
            </div>
            <div className="feature-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-success-800" />
              </div>
              <h3 className="font-semibold mb-3">Tuettuja laskelmia</h3>
              <p className="text-sm">
                Huomioi valtion ja paikalliset tuet automaattisesti
              </p>
            </div>
            <div className="feature-card animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-primary-800" />
              </div>
              <h3 className="font-semibold mb-3">Päivitetty data</h3>
              <p className="text-sm">
                FMI säteilytiedot ja Nord Pool sähkön hinnat
              </p>
            </div>
          </div>
        </div>

        {/* Local Context Info */}
        <div className="card-premium p-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                  <MapPin className="w-4 h-4 text-primary-800" />
                </div>
                <h3 className="font-semibold">
                  {kunta.name} - Paikalliset tiedot
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Alue:</span>
                  <span className="font-medium">{kunta.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Asukasluku:</span>
                  <span className="font-medium">{kunta.population.toLocaleString('fi-FI')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">FMI-asema:</span>
                  <span className="font-medium">{kunta.fmiStation}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-4 h-4 text-success-800" />
                </div>
                <h3 className="font-semibold">
                  Saatavilla olevat tuet
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Valtion tuki:</span>
                  <span className="font-semibold text-primary-800">
                    {(kunta.subsidy.national.rate * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Paikallinen tuki:</span>
                  <span className="font-semibold text-success-800">
                    {(kunta.subsidy.local.rate * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-text-light/20">
                  <span className="font-semibold">Yhteensä:</span>
                  <span className="font-bold text-text-primary text-lg">
                    {((kunta.subsidy.national.rate + kunta.subsidy.local.rate) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
