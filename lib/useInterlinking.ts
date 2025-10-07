'use client';

import { useMemo } from 'react';
import { KuntaData } from './types';
import { getInterlinkingSuggestions } from './interlinkingLogic';

export interface InterlinkingData {
  contentLinks: Array<{
    text: string;
    href: string;
    relationship: string;
    anchorText: string;
    kunta: KuntaData;
  }>;
  relatedMunicipalities: Array<{
    kunta: KuntaData;
    relationship: string;
    distance?: number;
    similarity?: number;
  }>;
  breadcrumbContext: {
    regionLink: {
      text: string;
      href: string;
    };
    nearbyMunicipalities: Array<{
      kunta: KuntaData;
      relationship: string;
      distance?: number;
      similarity?: number;
    }>;
  };
  seoContext: {
    regionContext: string;
    nearbyContext: string;
    subsidyContext: string;
  };
}

/**
 * Custom hook for interlinking functionality
 */
export function useInterlinking(currentKunta: KuntaData): InterlinkingData {
  return useMemo(() => {
    const suggestions = getInterlinkingSuggestions(currentKunta);
    
    return {
      contentLinks: suggestions.contentLinks.map(link => ({
        ...link,
        kunta: suggestions.relatedMunicipalities.find(rm => rm.kunta.slug === link.href.split('/').pop())?.kunta || currentKunta
      })),
      relatedMunicipalities: suggestions.relatedMunicipalities,
      breadcrumbContext: suggestions.breadcrumbContext,
      seoContext: suggestions.seoContext
    };
  }, [currentKunta]);
}

/**
 * Generate SEO-optimized content with interlinks
 */
export function generateSEOContent(
  currentKunta: KuntaData,
  baseContent: string
): string {
  const interlinkingData = useInterlinking(currentKunta);
  
  let enhancedContent = baseContent;
  
  // Add region context
  if (interlinkingData.seoContext.regionContext) {
    enhancedContent += ` ${interlinkingData.seoContext.regionContext}`;
  }
  
  // Add nearby context
  if (interlinkingData.seoContext.nearbyContext) {
    enhancedContent += ` ${interlinkingData.seoContext.nearbyContext}`;
  }
  
  return enhancedContent;
}

/**
 * Get related municipality slugs for sitemap generation
 */
export function getRelatedMunicipalitySlugs(currentKunta: KuntaData): string[] {
  const suggestions = getInterlinkingSuggestions(currentKunta);
  return suggestions.relatedMunicipalities.map(rm => rm.kunta.slug);
}
