'use client';

import React from 'react';
import { CheckCircle, Globe, TrendingUp, Shield, Database, Clock, Users, Target } from 'lucide-react';

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
              <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <feature.icon className="w-7 h-7 text-primary-800" />
              </div>
              <h3 className="font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="card-premium p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary-800" />
              </div>
              <div className="text-3xl font-bold text-primary-800 mb-2">20+</div>
              <p className="text-sm text-text-muted">Kuntaa</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-success-800" />
              </div>
              <div className="text-3xl font-bold text-success-800 mb-2">1000+</div>
              <p className="text-sm text-text-muted">Laskelmaa</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary-800" />
              </div>
              <div className="text-3xl font-bold text-primary-800 mb-2">24/7</div>
              <p className="text-sm text-text-muted">Päivitetyt tiedot</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-success-800" />
              </div>
              <div className="text-3xl font-bold text-success-800 mb-2">100%</div>
              <p className="text-sm text-text-muted">Ilmainen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
