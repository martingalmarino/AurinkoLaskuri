'use client';

import React from 'react';
import { MapPin, Calculator, TrendingUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: MapPin,
    title: 'Valitse kunta',
    description: 'Valitse kotikuntasi tai lähikuntasi saadaksesi paikalliset säteilytiedot ja tuet',
    color: 'from-primary-100 to-primary-200',
    iconColor: 'text-primary-800'
  },
  {
    number: 2,
    icon: Calculator,
    title: 'Syötä tiedot',
    description: 'Anna järjestelmän koko, asennuskustannukset ja paneelien hyötysuhde',
    color: 'from-success-100 to-success-200',
    iconColor: 'text-success-800'
  },
  {
    number: 3,
    icon: TrendingUp,
    title: 'Näe tulokset',
    description: 'Saat takaisinmaksuaika, vuosittaiset säästöt ja 20 vuoden säästöt',
    color: 'from-purple-100 to-purple-200',
    iconColor: 'text-purple-800'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-br from-bg-secondary to-bg-tertiary">
      <div className="container-premium">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            Miten laskuri toimii?
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Kolme yksinkertaista vaihetta tarkkojen laskelmien tekemiseen
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
            <div className="flex justify-between items-center h-0.5">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary-200 to-primary-300"></div>
              <div className="w-3 h-3 bg-primary-300 rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-primary-300 via-success-200 to-success-300"></div>
              <div className="w-3 h-3 bg-success-300 rounded-full"></div>
              <div className="flex-1 h-px bg-gradient-to-r from-success-300 via-purple-200 to-transparent"></div>
            </div>
          </div>

          {steps.map((step, index) => (
            <div key={step.number} className="step-card group animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              {/* Step Number */}
              <div className={`step-number bg-gradient-to-br ${step.color} shadow-lg`}>
                {step.number}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <step.icon className={`w-8 h-8 ${step.iconColor}`} />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow for mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center mt-6">
                  <ArrowRight className="w-5 h-5 text-text-light" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card-premium p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">
              Valmis aloittamaan?
            </h3>
            <p className="text-text-muted mb-6">
              Aloita laskenta valitsemalla kotikuntasi ja syöttämällä järjestelmäsi tiedot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/fi/aurinkopaneelit-laskuri/helsinki"
                className="btn-primary"
              >
                Aloita laskenta
              </a>
              <a
                href="#features"
                className="btn-outline"
              >
                Lue lisää
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
