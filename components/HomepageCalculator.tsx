'use client';

import React, { useState } from 'react';
import { Calculator, MapPin, Zap, TrendingUp } from 'lucide-react';
import { getAllKuntaSlugs } from '@/lib/kunnatFI';
import { dataService } from '@/lib/dataService';
import { roiSolarCalculator } from '@/lib/roiSolarFI';
import { SolarSystemInputs, ROICalculationResult } from '@/lib/types';

export default function HomepageCalculator() {
  const [selectedKunta, setSelectedKunta] = useState<string>('');
  const [inputs, setInputs] = useState<SolarSystemInputs>({
    systemSizeKw: undefined,
    roofArea: undefined,
    installationCost: 0,
    panelEfficiency: 0.19
  });
  const [result, setResult] = useState<ROICalculationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const kunnat = getAllKuntaSlugs();

  const handleCalculate = async () => {
    if (!selectedKunta || !inputs.systemSizeKw || !inputs.installationCost || inputs.installationCost <= 0) {
      alert('Täytä kaikki pakolliset kentät');
      return;
    }

    setLoading(true);
    try {
      // Get kunta data
      const kuntaData = kunnat.find(k => k === selectedKunta);
      if (!kuntaData) return;

      // Fetch data
      const solarRadiationData = await dataService.getSolarRadiation(kuntaData);
      const electricityPriceData = await dataService.getElectricityPrice();

      // Mock subsidy data for now
      const subsidy = {
        national: { rate: 0.30, description: 'Valtion tuki' },
        local: { rate: 0.15, description: 'Paikallinen tuki' }
      };

      const calculationResult = roiSolarCalculator.calculateROI(
        inputs,
        solarRadiationData,
        electricityPriceData,
        subsidy
      );

      setResult(calculationResult);
    } catch (error) {
      console.error('Calculation error:', error);
      alert('Laskenta epäonnistui. Yritä uudelleen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-8 h-8 text-primary-800" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Laske ROI nopeasti
        </h2>
        <p className="text-gray-600">
          Valitse kunta ja syötä järjestelmäsi tiedot
        </p>
      </div>

      <div className="space-y-6">
        {/* Kunta Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            Valitse kunta
          </label>
          <select
            value={selectedKunta}
            onChange={(e) => setSelectedKunta(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            <option value="">Valitse kunta...</option>
            {kunnat.map((kunta) => (
              <option key={kunta} value={kunta}>
                {kunta.charAt(0).toUpperCase() + kunta.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* System Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Zap className="w-4 h-4 inline mr-2" />
            Järjestelmän koko (kW)
          </label>
          <input
            type="number"
            value={inputs.systemSizeKw || ''}
            onChange={(e) => setInputs({...inputs, systemSizeKw: parseFloat(e.target.value) || undefined})}
            placeholder="Esim. 5"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>

        {/* Installation Cost */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Asennuskustannukset (€)
          </label>
          <input
            type="number"
            value={inputs.installationCost || ''}
            onChange={(e) => setInputs({...inputs, installationCost: parseFloat(e.target.value) || 0})}
            placeholder="Esim. 7500"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>

        {/* Panel Efficiency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paneelien hyötysuhde (%)
          </label>
          <input
            type="number"
            value={(inputs.panelEfficiency || 0) * 100 || ''}
            onChange={(e) => setInputs({...inputs, panelEfficiency: (parseFloat(e.target.value) || 0) / 100})}
            placeholder="Esim. 19"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={loading}
          className="w-full bg-primary-800 hover:bg-primary-900 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Lasketaan...
            </div>
          ) : (
            <>
              <TrendingUp className="w-5 h-5 inline mr-2" />
              Laske ROI
            </>
          )}
        </button>

        {/* Results */}
        {result && (
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
            <h3 className="text-lg font-semibold text-primary-900 mb-4 text-center">
              Laskentatulokset
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary-800">
                  {result.roiYears.toFixed(1)} v
                </div>
                <div className="text-sm text-primary-600">Takaisinmaksuaika</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-800">
                  {result.annualSavings.toFixed(0)} €
                </div>
                <div className="text-sm text-primary-600">Vuosittaiset säästöt</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
