import { KuntaData } from './types';
import { kunnatFI } from './kunnatFI';

export interface RelatedMunicipality {
  kunta: KuntaData;
  relationship: 'region' | 'nearby' | 'similar_subsidy' | 'similar_population' | 'similar_radiation';
  distance?: number; // in km for nearby municipalities
  similarity?: number; // similarity score 0-1
}

/**
 * Calculate distance between two points using Haversine formula
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Get related municipalities based on intelligent criteria
 */
export function getRelatedMunicipalities(
  currentKunta: KuntaData, 
  limit: number = 6
): RelatedMunicipality[] {
  const related: RelatedMunicipality[] = [];
  
  // Get all other municipalities
  const otherMunicipalities = kunnatFI.filter(k => k.slug !== currentKunta.slug);
  
  // 1. Same region (highest priority)
  const sameRegion = otherMunicipalities
    .filter(k => k.region === currentKunta.region)
    .map(k => ({
      kunta: k,
      relationship: 'region' as const,
      similarity: 1.0
    }));
  
  // 2. Nearby municipalities (within 50km)
  const nearby = otherMunicipalities
    .map(k => {
      const distance = calculateDistance(
        currentKunta.latitude,
        currentKunta.longitude,
        k.latitude,
        k.longitude
      );
      return { kunta: k, distance };
    })
    .filter(item => item.distance <= 50)
    .sort((a, b) => a.distance - b.distance)
    .map(item => ({
      kunta: item.kunta,
      relationship: 'nearby' as const,
      distance: item.distance,
      similarity: Math.max(0.3, 1 - (item.distance / 50))
    }));
  
  // 3. Similar subsidy rates (within 5% difference)
  const totalSubsidy = currentKunta.subsidy.national.rate + currentKunta.subsidy.local.rate;
  const similarSubsidy = otherMunicipalities
    .map(k => {
      const kTotalSubsidy = k.subsidy.national.rate + k.subsidy.local.rate;
      const difference = Math.abs(totalSubsidy - kTotalSubsidy);
      return { kunta: k, difference };
    })
    .filter(item => item.difference <= 0.05)
    .sort((a, b) => a.difference - b.difference)
    .map(item => ({
      kunta: item.kunta,
      relationship: 'similar_subsidy' as const,
      similarity: 1 - (item.difference / 0.05)
    }));
  
  // 4. Similar population size (within 50% difference)
  const similarPopulation = otherMunicipalities
    .map(k => {
      const ratio = Math.min(k.population, currentKunta.population) / 
                   Math.max(k.population, currentKunta.population);
      const difference = 1 - ratio;
      return { kunta: k, difference, ratio };
    })
    .filter(item => item.difference <= 0.5)
    .sort((a, b) => a.difference - b.difference)
    .map(item => ({
      kunta: item.kunta,
      relationship: 'similar_population' as const,
      similarity: item.ratio
    }));
  
  // Combine and prioritize
  const allRelated = [
    ...sameRegion,
    ...nearby,
    ...similarSubsidy,
    ...similarPopulation
  ];
  
  // Remove duplicates and sort by priority
  const uniqueRelated = new Map<string, RelatedMunicipality>();
  
  // Priority order: region > nearby > similar_subsidy > similar_population
  const priorityOrder = ['region', 'nearby', 'similar_subsidy', 'similar_population'];
  
  for (const relationship of priorityOrder) {
    const items = allRelated.filter(item => item.relationship === relationship);
    for (const item of items) {
      if (!uniqueRelated.has(item.kunta.slug)) {
        uniqueRelated.set(item.kunta.slug, item);
      }
    }
  }
  
  return Array.from(uniqueRelated.values()).slice(0, limit);
}

/**
 * Get interlinking suggestions for SEO
 */
export function getInterlinkingSuggestions(currentKunta: KuntaData) {
  const related = getRelatedMunicipalities(currentKunta, 4);
  
  return {
    // For internal linking in content
    contentLinks: related.map(item => ({
      text: item.kunta.name,
      href: `/fi/aurinkopaneelit-laskuri/${item.kunta.slug}`,
      relationship: item.relationship,
      anchorText: getAnchorText(item)
    })),
    
    // For related municipalities section
    relatedMunicipalities: related,
    
    // For breadcrumb suggestions
    breadcrumbContext: getBreadcrumbContext(currentKunta, related),
    
    // For meta descriptions and titles
    seoContext: getSEOContext(currentKunta, related)
  };
}

/**
 * Generate appropriate anchor text based on relationship
 */
function getAnchorText(item: RelatedMunicipality): string {
  switch (item.relationship) {
    case 'region':
      return `${item.kunta.name} (${item.kunta.region})`;
    case 'nearby':
      return `${item.kunta.name} (${Math.round(item.distance || 0)} km)`;
    case 'similar_subsidy':
      const totalSubsidy = ((item.kunta.subsidy.national.rate + item.kunta.subsidy.local.rate) * 100).toFixed(0);
      return `${item.kunta.name} (${totalSubsidy}% tuki)`;
    case 'similar_population':
      return `${item.kunta.name} (${item.kunta.population.toLocaleString('fi-FI')} asukasta)`;
    default:
      return item.kunta.name;
  }
}

/**
 * Get breadcrumb context for better navigation
 */
function getBreadcrumbContext(currentKunta: KuntaData, related: RelatedMunicipality[]) {
  const regionMunicipalities = related.filter(item => item.relationship === 'region');
  
  return {
    regionLink: {
      text: `${currentKunta.region} - Aurinkopaneelit`,
      href: `/fi/aurinkopaneelit-laskuri?region=${currentKunta.region.toLowerCase()}`
    },
    nearbyMunicipalities: regionMunicipalities.slice(0, 3)
  };
}

/**
 * Get SEO context for meta descriptions and titles
 */
function getSEOContext(currentKunta: KuntaData, related: RelatedMunicipality[]) {
  const regionMunicipalities = related.filter(item => item.relationship === 'region');
  const nearbyMunicipalities = related.filter(item => item.relationship === 'nearby');
  
  const regionNames = regionMunicipalities.map(item => item.kunta.name).join(', ');
  const nearbyNames = nearbyMunicipalities.map(item => item.kunta.name).join(', ');
  
  return {
    regionContext: regionNames ? `Vertaa myös muihin ${currentKunta.region} kunnille: ${regionNames}` : '',
    nearbyContext: nearbyNames ? `Lähialueiden kuntia: ${nearbyNames}` : '',
    subsidyContext: `Tuet ${currentKunta.name}ssa: ${((currentKunta.subsidy.national.rate + currentKunta.subsidy.local.rate) * 100).toFixed(0)}%`
  };
}
