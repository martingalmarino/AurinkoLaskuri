import { KuntaData, SubsidyData } from './types';

export const kunnatFI: KuntaData[] = [
  // Major cities with higher subsidies
  {
    name: 'Helsinki',
    slug: 'helsinki',
    fmiStation: 'Helsinki',
    latitude: 60.1699,
    longitude: 24.9384,
    population: 656920,
    region: 'Uusimaa',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.20,
        description: 'Helsingin kaupungin ympäristötuki 20%'
      }
    }
  },
  {
    name: 'Espoo',
    slug: 'espoo',
    fmiStation: 'Helsinki-Vantaa',
    latitude: 60.2055,
    longitude: 24.6559,
    population: 297132,
    region: 'Uusimaa',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.15,
        description: 'Espoon kaupungin energiatuki 15%'
      }
    }
  },
  {
    name: 'Tampere',
    slug: 'tampere',
    fmiStation: 'Tampere-Pirkkala',
    latitude: 61.4991,
    longitude: 23.7871,
    population: 244223,
    region: 'Pirkanmaa',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.15,
        description: 'Tampereen kaupungin kestävän kehityksen tuki 15%'
      }
    }
  },
  {
    name: 'Vantaa',
    slug: 'vantaa',
    fmiStation: 'Helsinki-Vantaa',
    latitude: 60.2934,
    longitude: 25.0378,
    population: 238457,
    region: 'Uusimaa',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.12,
        description: 'Vantaan kaupungin ympäristöohjelma 12%'
      }
    }
  },
  {
    name: 'Oulu',
    slug: 'oulu',
    fmiStation: 'Oulu',
    latitude: 65.0121,
    longitude: 25.4651,
    population: 208939,
    region: 'Pohjois-Pohjanmaa',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.18,
        description: 'Oulun kaupungin energiatuki 18%'
      }
    }
  },
  {
    name: 'Turku',
    slug: 'turku',
    fmiStation: 'Turku',
    latitude: 60.4518,
    longitude: 22.2666,
    population: 194244,
    region: 'Varsinais-Suomi',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.14,
        description: 'Turun kaupungin kestävän energian tuki 14%'
      }
    }
  },
  {
    name: 'Jyväskylä',
    slug: 'jyvaskyla',
    fmiStation: 'Jyväskylä',
    latitude: 62.2415,
    longitude: 25.7209,
    population: 144477,
    region: 'Keski-Suomi',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.16,
        description: 'Jyväskylän kaupungin energiatuki 16%'
      }
    }
  },
  {
    name: 'Lahti',
    slug: 'lahti',
    fmiStation: 'Lahti',
    latitude: 60.9827,
    longitude: 25.6612,
    population: 120112,
    region: 'Päijät-Häme',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.13,
        description: 'Lahden kaupungin ympäristötuki 13%'
      }
    }
  },
  {
    name: 'Kuopio',
    slug: 'kuopio',
    fmiStation: 'Kuopio',
    latitude: 62.8924,
    longitude: 27.6770,
    population: 119249,
    region: 'Pohjois-Savo',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.15,
        description: 'Kuopion kaupungin energiatuki 15%'
      }
    }
  },
  {
    name: 'Pori',
    slug: 'pori',
    fmiStation: 'Pori',
    latitude: 61.4851,
    longitude: 21.7974,
    population: 83601,
    region: 'Satakunta',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.12,
        description: 'Porin kaupungin energiatuki 12%'
      }
    }
  },
  // Smaller municipalities with standard subsidies
  {
    name: 'Varkaus',
    slug: 'varkaus',
    fmiStation: 'Varkaus',
    latitude: 62.3152,
    longitude: 27.8733,
    population: 20551,
    region: 'Pohjois-Savo',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.08,
        description: 'Varkauden kaupungin energiatuki 8%'
      }
    }
  },
  {
    name: 'Rovaniemi',
    slug: 'rovaniemi',
    fmiStation: 'Rovaniemi',
    latitude: 66.5039,
    longitude: 25.7294,
    population: 63367,
    region: 'Lappi',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.10,
        description: 'Rovaniemen kaupungin energiatuki 10%'
      }
    }
  },
  {
    name: 'Vaasa',
    slug: 'vaasa',
    fmiStation: 'Vaasa',
    latitude: 63.0960,
    longitude: 21.6158,
    population: 67847,
    region: 'Pohjanmaa',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.11,
        description: 'Vaasan kaupungin energiatuki 11%'
      }
    }
  },
  {
    name: 'Joensuu',
    slug: 'joensuu',
    fmiStation: 'Joensuu',
    latitude: 62.6012,
    longitude: 29.7636,
    population: 76232,
    region: 'Pohjois-Karjala',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.09,
        description: 'Joensuun kaupungin energiatuki 9%'
      }
    }
  },
  {
    name: 'Seinäjoki',
    slug: 'seinajoki',
    fmiStation: 'Seinäjoki',
    latitude: 62.7906,
    longitude: 22.8403,
    population: 64726,
    region: 'Etelä-Pohjanmaa',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.10,
        description: 'Seinäjoen kaupungin energiatuki 10%'
      }
    }
  },
  {
    name: 'Mikkeli',
    slug: 'mikkeli',
    fmiStation: 'Mikkeli',
    latitude: 61.6886,
    longitude: 27.2723,
    population: 52493,
    region: 'Etelä-Savo',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.08,
        description: 'Mikkelin kaupungin energiatuki 8%'
      }
    }
  },
  {
    name: 'Kotka',
    slug: 'kotka',
    fmiStation: 'Kotka',
    latitude: 60.4669,
    longitude: 26.9459,
    population: 52388,
    region: 'Kymenlaakso',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.12,
        description: 'Kotkan kaupungin energiatuki 12%'
      }
    }
  },
  {
    name: 'Hyvinkää',
    slug: 'hyvinkaa',
    fmiStation: 'Helsinki-Vantaa',
    latitude: 60.6304,
    longitude: 24.8598,
    population: 47083,
    region: 'Uusimaa',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.10,
        description: 'Hyvinkään kaupungin energiatuki 10%'
      }
    }
  },
  {
    name: 'Nurmijärvi',
    slug: 'nurmijarvi',
    fmiStation: 'Helsinki-Vantaa',
    latitude: 60.4641,
    longitude: 24.8073,
    population: 43603,
    region: 'Uusimaa',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.08,
        description: 'Nurmijärven kunnan energiatuki 8%'
      }
    }
  },
  {
    name: 'Järvenpää',
    slug: 'jarvenpaa',
    fmiStation: 'Helsinki-Vantaa',
    latitude: 60.4736,
    longitude: 25.0897,
    population: 43261,
    region: 'Uusimaa',
    subsidy: {
      national: {
        rate: 0.30,
        description: 'Valtion tuki aurinkopaneeleille 30%'
      },
      local: {
        rate: 0.09,
        description: 'Järvenpään kaupungin energiatuki 9%'
      }
    }
  }
];

/**
 * Get kunta data by slug
 */
export function getKuntaBySlug(slug: string): KuntaData | undefined {
  return kunnatFI.find(kunta => kunta.slug === slug);
}

/**
 * Get all kunta slugs for static generation
 */
export function getAllKuntaSlugs(): string[] {
  return kunnatFI.map(kunta => kunta.slug);
}

/**
 * Get kunta data by name (case insensitive)
 */
export function getKuntaByName(name: string): KuntaData | undefined {
  return kunnatFI.find(kunta => 
    kunta.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Search kunnat by name or region
 */
export function searchKunnat(query: string): KuntaData[] {
  const lowercaseQuery = query.toLowerCase();
  return kunnatFI.filter(kunta => 
    kunta.name.toLowerCase().includes(lowercaseQuery) ||
    kunta.region.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Get kunnat by region
 */
export function getKunnatByRegion(region: string): KuntaData[] {
  return kunnatFI.filter(kunta => kunta.region === region);
}

/**
 * Get all unique regions
 */
export function getAllRegions(): string[] {
  return [...new Set(kunnatFI.map(kunta => kunta.region))].sort();
}

/**
 * Get nearby kunnat (within radius)
 */
export function getNearbyKunnat(
  latitude: number, 
  longitude: number, 
  radiusKm: number = 50
): KuntaData[] {
  return kunnatFI.filter(kunta => {
    const distance = calculateDistance(latitude, longitude, kunta.latitude, kunta.longitude);
    return distance <= radiusKm;
  });
}

/**
 * Calculate distance between two coordinates in kilometers
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
 * Get default kunta (Helsinki)
 */
export function getDefaultKunta(): KuntaData {
  return kunnatFI[0]; // Helsinki
}
