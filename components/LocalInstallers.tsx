'use client';

import React from 'react';
import { MapPin, Phone, Mail, Star, ExternalLink } from 'lucide-react';
import { KuntaData } from '@/lib/types';

interface Installer {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  phone: string;
  email: string;
  website: string;
  services: string[];
  description: string;
  distance: number; // km from kunta center
}

interface LocalInstallersProps {
  kunta: KuntaData;
}

// Mock data - in production this would come from an API
const getMockInstallers = (kunta: KuntaData): Installer[] => [
  {
    id: '1',
    name: 'AurinkoEnergia Oy',
    rating: 4.8,
    reviewCount: 127,
    phone: '+358 40 123 4567',
    email: 'info@aurinkoenergia.fi',
    website: 'https://aurinkoenergia.fi',
    services: ['Asennus', 'Huolto', 'Takaisinmaksulaskenta', 'Sähköliittymä'],
    description: 'Kokemusta aurinkopaneelien asentamisesta yli 15 vuotta. Sertifioitu asennusyritys.',
    distance: 12.5
  },
  {
    id: '2',
    name: 'Vihreä Energia Asennus',
    rating: 4.6,
    reviewCount: 89,
    phone: '+358 40 987 6543',
    email: 'myynti@vihreaenergia.fi',
    website: 'https://vihreaenergia.fi',
    services: ['Asennus', 'Suunnittelu', 'Tukihakemukset', 'Takuu'],
    description: 'Erikoistunut pientaloihin ja omakotitaloihin. Paikallinen asiantuntemus.',
    distance: 8.2
  },
  {
    id: '3',
    name: 'SolarTech Finland',
    rating: 4.9,
    reviewCount: 203,
    phone: '+358 40 555 0123',
    email: 'asiakaspalvelu@solartech.fi',
    website: 'https://solartech.fi',
    services: ['Asennus', 'Huolto', 'Seuranta', 'Korjaukset'],
    description: 'Teknologiajohtaja aurinkoenergian alalla. Premium-palvelut ja laadukkaat tuotteet.',
    distance: 25.7
  }
];

export default function LocalInstallers({ kunta }: LocalInstallersProps) {
  const installers = getMockInstallers(kunta);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Paikalliset Asennusyritykset – {kunta.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Löydä luotettavat asennusyritykset läheltäsi. Kaikki yritykset ovat sertifioituja ja tarjoavat takuun.
          </p>
        </div>

        {/* Installers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {installers.map((installer) => (
            <div key={installer.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {installer.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{installer.distance} km {kunta.name}sta</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">{installer.rating}</span>
                  </div>
                  <p className="text-xs text-gray-600">{installer.reviewCount} arvostelua</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                {installer.description}
              </p>

              {/* Services */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Palvelut:</h4>
                <div className="flex flex-wrap gap-1">
                  {installer.services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <a href={`tel:${installer.phone}`} className="hover:text-primary-600">
                    {installer.phone}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href={`mailto:${installer.email}`} className="hover:text-primary-600">
                    {installer.email}
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <button className="flex-1 btn-primary text-sm py-2">
                    Pyydä tarjous
                  </button>
                  <a
                    href={installer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Vieraile ${installer.name} verkkosivustolla`}
                    className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 max-w-3xl mx-auto">
            Yllä olevat yritykset ovat esimerkkejä. Suosittelemme aina vertailemaan useita tarjouksia 
            ja varmistamaan yrityksen sertifioinnit ja takuut ennen sopimuksen tekemistä.
          </p>
        </div>
      </div>
    </section>
  );
}
