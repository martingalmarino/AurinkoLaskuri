'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, TrendingUp, Users, Zap, ArrowRight } from 'lucide-react';
import { KuntaData } from '@/lib/types';
import { getRelatedMunicipalities, RelatedMunicipality } from '@/lib/interlinkingLogic';

interface RelatedMunicipalitiesProps {
  currentKunta: KuntaData;
}

export default function RelatedMunicipalities({ currentKunta }: RelatedMunicipalitiesProps) {
  const relatedMunicipalities = getRelatedMunicipalities(currentKunta, 6);

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship) {
      case 'region':
        return <MapPin className="w-4 h-4" />;
      case 'nearby':
        return <MapPin className="w-4 h-4" />;
      case 'similar_subsidy':
        return <TrendingUp className="w-4 h-4" />;
      case 'similar_population':
        return <Users className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getRelationshipLabel = (item: RelatedMunicipality) => {
    switch (item.relationship) {
      case 'region':
        return 'Sama alue';
      case 'nearby':
        return `${Math.round(item.distance || 0)} km päässä`;
      case 'similar_subsidy':
        const totalSubsidy = ((item.kunta.subsidy.national.rate + item.kunta.subsidy.local.rate) * 100).toFixed(0);
        return `${totalSubsidy}% tuki`;
      case 'similar_population':
        return `${item.kunta.population.toLocaleString('fi-FI')} asukasta`;
      default:
        return 'Samanlainen';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'region':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'nearby':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'similar_subsidy':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'similar_population':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (relatedMunicipalities.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Liittyvät kunnat
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tutustu aurinkopaneelien laskuriin muissa {currentKunta.region} kunnissa ja lähialueilla
          </p>
        </div>

        {/* Related Municipalities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {relatedMunicipalities.map((item) => (
            <Link
              key={item.kunta.slug}
              href={`/fi/aurinkopaneelit-laskuri/${item.kunta.slug}`}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md hover:border-primary-200 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors mb-1">
                    {item.kunta.name}
                  </h3>
                  <p className="text-sm text-gray-600">{item.kunta.region}</p>
                </div>
                <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRelationshipColor(item.relationship)}`}>
                  {getRelationshipIcon(item.relationship)}
                  <span className="ml-1 hidden sm:inline">
                    {getRelationshipLabel(item)}
                  </span>
                </div>
              </div>

              {/* Key Info */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Yhteensä tuet:</span>
                  <span className="font-semibold text-green-600">
                    {((item.kunta.subsidy.national.rate + item.kunta.subsidy.local.rate) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Asukasluku:</span>
                  <span className="font-semibold">
                    {item.kunta.population.toLocaleString('fi-FI')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">FMI-asema:</span>
                  <span className="font-semibold text-blue-600">
                    {item.kunta.fmiStation}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-primary-600 group-hover:text-primary-700 transition-colors">
                  <span className="text-sm font-medium">Laske ROI</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <Link 
            href="/#kunnat"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Selaa kaikkia kuntia
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
