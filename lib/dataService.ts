import { fmiClient } from './fmiClient';
import { nordPoolClient } from './nordPoolClient';
import { getMockSolarRadiation, getMockElectricityPrice } from './mockData';
import { SolarRadiationData, ElectricityPrice } from './types';

export class DataService {
  private static instance: DataService;
  private useRealAPIs: boolean;

  private constructor() {
    // Enable real APIs in production, mock data in development
    this.useRealAPIs = process.env.NODE_ENV === 'production' || process.env.USE_REAL_APIS === 'true';
  }

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  async getSolarRadiation(fmiStation: string): Promise<SolarRadiationData> {
    if (this.useRealAPIs) {
      try {
        console.log(`Fetching real FMI data for ${fmiStation}`);
        const data = await fmiClient.getSolarRadiation(fmiStation);
        return data;
      } catch (error) {
        console.error(`FMI API failed for ${fmiStation}, using fallback:`, error);
        return getMockSolarRadiation(fmiStation);
      }
    } else {
      console.log(`Using mock FMI data for ${fmiStation}`);
      return getMockSolarRadiation(fmiStation);
    }
  }

  async getElectricityPrice(): Promise<ElectricityPrice> {
    if (this.useRealAPIs) {
      try {
        console.log('Fetching real Nord Pool electricity price data');
        const data = await nordPoolClient.getElectricityPrice();
        return data;
      } catch (error) {
        console.error('Nord Pool API failed, using fallback:', error);
        return getMockElectricityPrice();
      }
    } else {
      console.log('Using mock electricity price data');
      return getMockElectricityPrice();
    }
  }

  // Method to force enable/disable real APIs
  setUseRealAPIs(useRealAPIs: boolean): void {
    this.useRealAPIs = useRealAPIs;
  }

  // Get current API mode
  isUsingRealAPIs(): boolean {
    return this.useRealAPIs;
  }

  // Health check for APIs
  async healthCheck(): Promise<{
    fmiAPI: boolean;
    nordPoolAPI: boolean;
    mode: 'real' | 'mock';
  }> {
    const mode = this.useRealAPIs ? 'real' : 'mock';
    
    if (!this.useRealAPIs) {
      return {
        fmiAPI: false,
        nordPoolAPI: false,
        mode,
      };
    }

    let fmiAPI = false;
    let nordPoolAPI = false;

    try {
      // Test FMI API with Helsinki (should always work)
      await fmiClient.getSolarRadiation('Helsinki-Vantaa');
      fmiAPI = true;
    } catch (error) {
      console.error('FMI API health check failed:', error);
    }

    try {
      // Test Nord Pool API
      await nordPoolClient.getElectricityPrice();
      nordPoolAPI = true;
    } catch (error) {
      console.error('Nord Pool API health check failed:', error);
    }

    return {
      fmiAPI,
      nordPoolAPI,
      mode,
    };
  }
}

// Export singleton instance
export const dataService = DataService.getInstance();
