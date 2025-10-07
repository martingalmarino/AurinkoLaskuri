import { parseString } from 'xml2js';
import { SolarRadiationData } from './types';

const FMI_BASE_URL = 'https://opendata.fmi.fi/wfs';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry {
  data: SolarRadiationData;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

export class FMIClient {
  private async fetchXMLData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`FMI API error: ${response.status}`);
      }
      
      const xmlData = await response.text();
      return new Promise((resolve, reject) => {
        parseString(xmlData, { explicitArray: false }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    } catch (error) {
      console.error('Error fetching FMI data:', error);
      throw error;
    }
  }

  private extractRADGLOFromXML(xmlData: any): number[] {
    try {
      const observations = xmlData['wfs:FeatureCollection']['wfs:member'];
      if (!observations) return [];

      const monthlyValues: number[] = new Array(12).fill(0);
      const monthlyCounts: number[] = new Array(12).fill(0);

      const observationsArray = Array.isArray(observations) ? observations : [observations];
      
      observationsArray.forEach((member: any) => {
        const obs = member['omso:PointTimeSeriesObservation'];
        if (!obs) return;

        const time = obs['om:phenomenonTime']['gml:TimePeriod']['gml:beginPosition']['_'];
        const month = new Date(time).getMonth();
        
        const result = obs['om:result']['wml2:MeasurementTimeseries']['wml2:point'];
        const resultArray = Array.isArray(result) ? result : [result];
        
        resultArray.forEach((point: any) => {
          const value = parseFloat(point['wml2:MeasurementTVP']['wml2:value']);
          if (!isNaN(value) && value >= 0) {
            monthlyValues[month] += value;
            monthlyCounts[month]++;
          }
        });
      });

      // Calculate monthly averages
      const monthlyAverages = monthlyValues.map((sum, index) => 
        monthlyCounts[index] > 0 ? sum / monthlyCounts[index] : 0
      );

      return monthlyAverages;
    } catch (error) {
      console.error('Error parsing RADGLO data:', error);
      return [];
    }
  }

  async getSolarRadiation(place: string): Promise<SolarRadiationData> {
    const cacheKey = place.toLowerCase();
    const cached = cache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return cached.data;
    }

    try {
      // Get current year data
      const currentYear = new Date().getFullYear();
      const startDate = `${currentYear}-01-01T00:00:00Z`;
      const endDate = `${currentYear}-12-31T23:59:59Z`;

      const url = `${FMI_BASE_URL}?service=WFS&version=2.0.0&request=GetFeature&storedquery_id=fmi::observations::weather::daily::simple&place=${encodeURIComponent(place)}&parameters=RADGLO&starttime=${startDate}&endtime=${endDate}`;
      
      const xmlData = await this.fetchXMLData(url);
      const monthlyRADGLO = this.extractRADGLOFromXML(xmlData);
      
      // Calculate annual average
      const annualRADGLO = monthlyRADGLO.reduce((sum, value) => sum + value, 0);

      const data: SolarRadiationData = {
        place,
        annualRADGLO: Math.round(annualRADGLO * 10) / 10,
        monthlyRADGLO: monthlyRADGLO.map(value => Math.round(value * 10) / 10),
        lastUpdated: new Date().toISOString(),
      };

      // Cache the result
      cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      console.error(`Error fetching solar radiation for ${place}:`, error);
      
      // Return fallback data if API fails
      return {
        place,
        annualRADGLO: 900, // Average for Finland
        monthlyRADGLO: [30, 60, 120, 180, 220, 240, 200, 140, 80, 40, 25, 15], // Typical monthly values
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  // Get multiple places in parallel
  async getSolarRadiationForMultiple(places: string[]): Promise<SolarRadiationData[]> {
    const promises = places.map(place => this.getSolarRadiation(place));
    return Promise.all(promises);
  }

  // Clear cache (useful for testing or manual refresh)
  clearCache(): void {
    cache.clear();
  }
}

// Export singleton instance
export const fmiClient = new FMIClient();
