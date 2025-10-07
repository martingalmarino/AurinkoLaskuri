import { ElectricityPrice } from './types';

const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours
const FALLBACK_PRICE = 0.15; // €/kWh fallback price for Finland

interface CacheEntry {
  data: ElectricityPrice;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

export class NordPoolClient {
  private async fetchNordPoolData(): Promise<number> {
    try {
      // Try multiple Nord Pool endpoints
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const endpoints = [
        `https://www.nordpoolgroup.com/api/marketdata/page/10?currency=,,EUR,EUR&endDate=${today}`,
        `https://www.nordpoolgroup.com/api/marketdata/page/10?currency=,,EUR,EUR&endDate=${yesterday}`,
        `https://www.nordpoolgroup.com/api/marketdata/page/10?currency=EUR&endDate=${today}`
      ];

      for (const url of endpoints) {
        try {
          const response = await fetch(url, {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 (compatible; SolarROICalculator/1.0)',
              'Accept-Language': 'en-US,en;q=0.9',
              'Cache-Control': 'no-cache',
            },
          });

          if (!response.ok) {
            continue;
          }

          const data = await response.json();
          
          // Extract Finland price from the response
          if (data.data && data.data.Rows && data.data.Rows.length > 0) {
            for (const row of data.data.Rows) {
              if (row.IsExtraRow === false && row.Columns && row.Columns.length > 0) {
                // Try different columns for Finland
                for (let i = 0; i < Math.min(3, row.Columns.length); i++) {
                  const priceStr = row.Columns[i].Value;
                  if (priceStr && priceStr !== '-' && priceStr !== 'N/A') {
                    const finlandPrice = parseFloat(priceStr.replace(',', '.').replace(' ', ''));
                    if (!isNaN(finlandPrice) && finlandPrice > 0 && finlandPrice < 1000) {
                      return finlandPrice / 1000; // Convert from €/MWh to €/kWh
                    }
                  }
                }
              }
            }
          }
        } catch (endpointError) {
          console.warn(`Nord Pool endpoint failed: ${url}`, endpointError);
          continue;
        }
      }

      throw new Error('All Nord Pool endpoints failed');
    } catch (error) {
      console.error('Error fetching Nord Pool data:', error);
      throw error;
    }
  }

  private async fetchENTSOEData(): Promise<number> {
    try {
      // Alternative: ENTSO-E transparency platform
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      // This is a simplified approach - in production you'd need proper ENTSO-E API key
      const url = `https://web-api.tp.entsoe.eu/api?securityToken=demo&documentType=A44&in_Domain=10YFI-1--------U&out_Domain=10YFI-1--------U&periodStart=${yesterday}0000&periodEnd=${today}0000&format=json`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`ENTSO-E API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Parse ENTSO-E response and calculate average price
      if (data.Publication_MarketDocument && data.Publication_MarketDocument.TimeSeries) {
        const timeSeries = Array.isArray(data.Publication_MarketDocument.TimeSeries) 
          ? data.Publication_MarketDocument.TimeSeries 
          : [data.Publication_MarketDocument.TimeSeries];
        
        let totalPrice = 0;
        let priceCount = 0;
        
        timeSeries.forEach((series: any) => {
          if (series.Period && series.Period.Point) {
            const points = Array.isArray(series.Period.Point) ? series.Period.Point : [series.Period.Point];
            points.forEach((point: any) => {
              const price = parseFloat(point['price.amount']);
              if (!isNaN(price) && price > 0) {
                totalPrice += price;
                priceCount++;
              }
            });
          }
        });
        
        if (priceCount > 0) {
          return totalPrice / priceCount / 1000; // Convert from €/MWh to €/kWh
        }
      }

      throw new Error('Could not extract price from ENTSO-E data');
    } catch (error) {
      console.error('Error fetching ENTSO-E data:', error);
      throw error;
    }
  }

  private async fetchElectricityPriceAlternative(): Promise<number> {
    try {
      // Alternative: Try to get electricity price from Finnish Energy Authority
      const today = new Date().toISOString().split('T')[0];
      const url = `https://api.energiavirasto.fi/v1/electricity/price?date=${today}&area=FI`;
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; SolarROICalculator/1.0)',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.price && data.price > 0) {
          return data.price / 1000; // Convert from €/MWh to €/kWh if needed
        }
      }

      throw new Error('Alternative electricity price API failed');
    } catch (error) {
      console.error('Error fetching alternative electricity price:', error);
      throw error;
    }
  }

  async getElectricityPrice(): Promise<ElectricityPrice> {
    const cacheKey = 'finland_electricity_price';
    const cached = cache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return cached.data;
    }

    let price = FALLBACK_PRICE;
    let source = 'fallback';

    try {
      // Try multiple sources in order of preference
      const sources = [
        { name: 'Nord Pool', fetchFn: () => this.fetchNordPoolData() },
        { name: 'ENTSO-E', fetchFn: () => this.fetchENTSOEData() },
        { name: 'Alternative API', fetchFn: () => this.fetchElectricityPriceAlternative() }
      ];

      for (const sourceInfo of sources) {
        try {
          price = await sourceInfo.fetchFn();
          source = sourceInfo.name;
          console.log(`Successfully fetched electricity price from ${source}: ${price} €/kWh`);
          break;
        } catch (sourceError) {
          console.warn(`${sourceInfo.name} failed:`, sourceError);
          continue;
        }
      }

      if (source === 'fallback') {
        console.warn('All electricity price sources failed, using fallback price');
      }

      const data: ElectricityPrice = {
        price: Math.round(price * 1000) / 1000, // Round to 3 decimal places
        lastUpdated: new Date().toISOString(),
        source,
      };

      // Cache the result
      cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      console.error('Error fetching electricity price:', error);
      
      // Return fallback data
      const fallbackData: ElectricityPrice = {
        price: FALLBACK_PRICE,
        lastUpdated: new Date().toISOString(),
        source: 'fallback',
      };

      cache.set(cacheKey, {
        data: fallbackData,
        timestamp: Date.now(),
      });

      return fallbackData;
    }
  }

  // Get historical average for better estimates
  async getAverageElectricityPrice(days: number = 30): Promise<number> {
    // In a real implementation, this would fetch historical data
    // For now, we'll return the current price with some variation
    const currentPrice = await this.getElectricityPrice();
    
    // Simulate some variation (±10%)
    const variation = (Math.random() - 0.5) * 0.2; // ±10%
    return Math.max(0.05, currentPrice.price * (1 + variation)); // Minimum 0.05 €/kWh
  }

  // Clear cache
  clearCache(): void {
    cache.clear();
  }
}

// Export singleton instance
export const nordPoolClient = new NordPoolClient();
