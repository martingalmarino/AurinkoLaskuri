'use client';

import React from 'react';
import { TrendingUp, Shield, Database, Target } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Tarkka ROI',
    description: 'Real-time FMI & Nord Pool data'
  },
  {
    icon: Shield,
    title: 'Paikallinen tuki',
    description: 'Huomioi kunnalliset tukiohjelmat'
  },
  {
    icon: Target,
    title: 'Fiksu sijoitus',
    description: 'Näe takaisinmaksuaika & pitkän aikavälin säästöt'
  },
  {
    icon: Database,
    title: 'Läpinäkyvä',
    description: 'Selkeät oletukset & metodologia'
  }
];

export default function FeatureStrip() {
  return (
    <section id="features" className="py-20 bg-bg-secondary">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Miksi valita AurinkoLaskuri?
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Suomen tarkin aurinkopaneelien ROI-laskuri, joka käyttää ajantasaisia tietoja ja huomioi kaikki tuet
          </p>
        </div>

        <div className="grid-features mb-16">
          {features.map((feature, index) => (
            <div key={index} className="feature-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <feature.icon className="w-8 h-8 text-primary-800" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
