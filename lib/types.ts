export interface SolarRadiationData {
  place: string;
  annualRADGLO: number; // kWh/m²/year
  monthlyRADGLO: number[]; // kWh/m²/month
  lastUpdated: string;
}

export interface ElectricityPrice {
  price: number; // €/kWh
  lastUpdated: string;
  source: string;
}

export interface SubsidyData {
  national: {
    rate: number; // 0.30 = 30%
    description: string;
  };
  local: {
    rate: number; // 0.20 = 20%
    description: string;
  };
}

export interface KuntaData {
  name: string;
  slug: string;
  fmiStation: string;
  latitude: number;
  longitude: number;
  subsidy: SubsidyData;
  population: number;
  region: string;
}

export interface SolarSystemInputs {
  systemSizeKw?: number; // kWp
  roofArea?: number; // m²
  panelEfficiency?: number; // 0.18-0.20 (18%-20%)
  installationCost: number; // €
}

export interface ROICalculationResult {
  annualEnergyProduction: number; // kWh/year
  annualSavings: number; // €/year
  totalSubsidy: number; // €
  netInstallationCost: number; // €
  roiYears: number; // years
  totalSavings20Years: number; // €
  breakEvenYear: number; // year
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQData {
  "@context": string;
  "@type": string;
  mainEntity: {
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }[];
}
