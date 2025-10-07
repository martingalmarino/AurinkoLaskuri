'use client';

import React from 'react';
import Link from 'next/link';
import { KuntaData } from '@/lib/types';
import { getInterlinkingSuggestions } from '@/lib/interlinkingLogic';

interface SmartContentLinksProps {
  currentKunta: KuntaData;
  className?: string;
}

export default function SmartContentLinks({ currentKunta, className = '' }: SmartContentLinksProps) {
  const suggestions = getInterlinkingSuggestions(currentKunta);
  
  if (suggestions.contentLinks.length === 0) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Vertaa muihin kunnille
      </h3>
      <div className="space-y-3">
        {/* Region municipalities */}
        {suggestions.contentLinks.filter(link => link.relationship === 'region').length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Muut {currentKunta.region} kunnat:
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.contentLinks
                .filter(link => link.relationship === 'region')
                .slice(0, 3)
                .map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded-lg transition-colors border border-blue-200"
                  >
                    {link.kunta.name}
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* Nearby municipalities */}
        {suggestions.contentLinks.filter(link => link.relationship === 'nearby').length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Lähialueen kunnat:
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.contentLinks
                .filter(link => link.relationship === 'nearby')
                .slice(0, 3)
                .map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-sm font-medium rounded-lg transition-colors border border-green-200"
                  >
                    {link.kunta.name}
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* Similar subsidy municipalities */}
        {suggestions.contentLinks.filter(link => link.relationship === 'similar_subsidy').length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Samankaltaiset tuet:
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.contentLinks
                .filter(link => link.relationship === 'similar_subsidy')
                .slice(0, 2)
                .map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-medium rounded-lg transition-colors border border-purple-200"
                  >
                    {link.kunta.name}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
