import { SolarRadiationData, ElectricityPrice } from './types';

// Mock data para desarrollo y fallbacks
export const mockSolarRadiationData: Record<string, SolarRadiationData> = {
  'Helsinki': {
    place: 'Helsinki',
    annualRADGLO: 950,
    monthlyRADGLO: [35, 65, 125, 185, 225, 245, 205, 145, 85, 45, 30, 20],
    lastUpdated: new Date().toISOString(),
  },
  'Helsinki-Vantaa': {
    place: 'Helsinki-Vantaa',
    annualRADGLO: 945,
    monthlyRADGLO: [34, 64, 124, 184, 224, 244, 204, 144, 84, 44, 29, 19],
    lastUpdated: new Date().toISOString(),
  },
  'Tampere-Pirkkala': {
    place: 'Tampere-Pirkkala',
    annualRADGLO: 920,
    monthlyRADGLO: [32, 62, 122, 182, 222, 242, 202, 142, 82, 42, 27, 17],
    lastUpdated: new Date().toISOString(),
  },
  'Turku': {
    place: 'Turku',
    annualRADGLO: 940,
    monthlyRADGLO: [33, 63, 123, 183, 223, 243, 203, 143, 83, 43, 28, 18],
    lastUpdated: new Date().toISOString(),
  },
  'Oulu': {
    place: 'Oulu',
    annualRADGLO: 880,
    monthlyRADGLO: [30, 60, 120, 180, 220, 240, 200, 140, 80, 40, 25, 15],
    lastUpdated: new Date().toISOString(),
  },
  'Jyväskylä': {
    place: 'Jyväskylä',
    annualRADGLO: 900,
    monthlyRADGLO: [31, 61, 121, 181, 221, 241, 201, 141, 81, 41, 26, 16],
    lastUpdated: new Date().toISOString(),
  },
  'Lahti': {
    place: 'Lahti',
    annualRADGLO: 930,
    monthlyRADGLO: [33, 63, 123, 183, 223, 243, 203, 143, 83, 43, 28, 18],
    lastUpdated: new Date().toISOString(),
  },
  'Kuopio': {
    place: 'Kuopio',
    annualRADGLO: 910,
    monthlyRADGLO: [32, 62, 122, 182, 222, 242, 202, 142, 82, 42, 27, 17],
    lastUpdated: new Date().toISOString(),
  },
  'Pori': {
    place: 'Pori',
    annualRADGLO: 935,
    monthlyRADGLO: [33, 63, 123, 183, 223, 243, 203, 143, 83, 43, 28, 18],
    lastUpdated: new Date().toISOString(),
  },
  'Varkaus': {
    place: 'Varkaus',
    annualRADGLO: 905,
    monthlyRADGLO: [31, 61, 121, 181, 221, 241, 201, 141, 81, 41, 26, 16],
    lastUpdated: new Date().toISOString(),
  },
  'Rovaniemi': {
    place: 'Rovaniemi',
    annualRADGLO: 850,
    monthlyRADGLO: [28, 58, 118, 178, 218, 238, 198, 138, 78, 38, 23, 13],
    lastUpdated: new Date().toISOString(),
  },
  'Vaasa': {
    place: 'Vaasa',
    annualRADGLO: 890,
    monthlyRADGLO: [30, 60, 120, 180, 220, 240, 200, 140, 80, 40, 25, 15],
    lastUpdated: new Date().toISOString(),
  },
  'Joensuu': {
    place: 'Joensuu',
    annualRADGLO: 895,
    monthlyRADGLO: [30, 60, 120, 180, 220, 240, 200, 140, 80, 40, 25, 15],
    lastUpdated: new Date().toISOString(),
  },
  'Seinäjoki': {
    place: 'Seinäjoki',
    annualRADGLO: 885,
    monthlyRADGLO: [30, 60, 120, 180, 220, 240, 200, 140, 80, 40, 25, 15],
    lastUpdated: new Date().toISOString(),
  },
  'Mikkeli': {
    place: 'Mikkeli',
    annualRADGLO: 915,
    monthlyRADGLO: [32, 62, 122, 182, 222, 242, 202, 142, 82, 42, 27, 17],
    lastUpdated: new Date().toISOString(),
  },
  'Kotka': {
    place: 'Kotka',
    annualRADGLO: 925,
    monthlyRADGLO: [32, 62, 122, 182, 222, 242, 202, 142, 82, 42, 27, 17],
    lastUpdated: new Date().toISOString(),
  },
};

export const mockElectricityPrice: ElectricityPrice = {
  price: 0.145, // €/kWh - precio promedio Finlandia
  lastUpdated: new Date().toISOString(),
  source: 'mock',
};

export function getMockSolarRadiation(place: string): SolarRadiationData {
  return mockSolarRadiationData[place] || {
    place,
    annualRADGLO: 900, // Promedio Finlandia
    monthlyRADGLO: [30, 60, 120, 180, 220, 240, 200, 140, 80, 40, 25, 15],
    lastUpdated: new Date().toISOString(),
  };
}

export function getMockElectricityPrice(): ElectricityPrice {
  return mockElectricityPrice;
}
