'use client';

import React, { useState } from 'react';
import { Calculator, Home, Zap, TrendingUp, Info, ArrowRight } from 'lucide-react';
import { SolarSystemInputs, ROICalculationResult, KuntaData } from '@/lib/types';

interface PremiumCalculatorProps {
  kunta: KuntaData;
  onCalculate: (inputs: SolarSystemInputs) => Promise<ROICalculationResult>;
  isLoading?: boolean;
}

export default function PremiumCalculator({ kunta, onCalculate, isLoading = false }: PremiumCalculatorProps) {
  const [inputs, setInputs] = useState<SolarSystemInputs>({
    systemSizeKw: 5,
    installationCost: 7500,
    panelEfficiency: 0.19,
  });

  const [result, setResult] = useState<ROICalculationResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [inputMode, setInputMode] = useState<'system' | 'roof'>('system');

  const handleInputChange = (field: keyof SolarSystemInputs, value: number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value,
    }));
    setShowResult(false);
  };

  const handleCalculate = async () => {
    try {
      const calculationResult = await onCalculate(inputs);
      setResult(calculationResult);
      setShowResult(true);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  const getEstimatedCost = (size: number) => {
    if (size < 5) return size * 1500;
    if (size < 10) return size * 1300;
    return size * 1000;
  };

  const getSystemSizeFromRoof = (area: number) => {
    return Math.round((area / 6.5) * 10) / 10;
  };

  return (
    <div className="card-premium p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-800 to-primary-900 rounded-xl flex items-center justify-center shadow-lg">
            <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
            ROI Laskuri – {kunta.name}
          </h2>
        </div>
        <p className="text-text-muted">
          Laske aurinkopaneelien takaisinmaksuaika ja säästöt {kunta.name}ssa
        </p>
      </div>

      {/* Input Mode Toggle */}
      <div className="flex flex-col sm:flex-row bg-bg-secondary rounded-xl p-1 mb-6 sm:mb-8 gap-1">
        <button
          onClick={() => setInputMode('system')}
          className={`flex-1 py-3 px-3 sm:px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center text-sm sm:text-base ${
            inputMode === 'system'
              ? 'bg-bg-primary text-primary-800 shadow-sm'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <Zap className="w-4 h-4 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="truncate">Järjestelmän koko (kW)</span>
        </button>
        <button
          onClick={() => setInputMode('roof')}
          className={`flex-1 py-3 px-3 sm:px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center text-sm sm:text-base ${
            inputMode === 'roof'
              ? 'bg-bg-primary text-primary-800 shadow-sm'
              : 'text-text-muted hover:text-text-primary'
          }`}
        >
          <Home className="w-4 h-4 mr-1 sm:mr-2 flex-shrink-0" />
          <span className="truncate">Katon pinta-ala (m²)</span>
        </button>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* System Size or Roof Area */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-3">
            {inputMode === 'system' ? 'Järjestelmän koko (kW)' : 'Katon pinta-ala (m²)'}
          </label>
          <div className="relative">
            <input
              type="number"
              className="input-field pr-16"
              value={inputMode === 'system' ? inputs.systemSizeKw || '' : inputs.roofArea || ''}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (inputMode === 'system') {
                  handleInputChange('systemSizeKw', value);
                  // Clear roof area when system size is set
                } else {
                  handleInputChange('roofArea', value);
                  // Clear system size when roof area is set
                }
              }}
              placeholder={inputMode === 'system' ? '5' : '32.5'}
              min="1"
              max={inputMode === 'system' ? '50' : '500'}
              step="0.1"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-text-light text-sm font-medium">
                {inputMode === 'system' ? 'kW' : 'm²'}
              </span>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-2">
            {inputMode === 'system' 
              ? `Vastaava katon pinta-ala: ${inputs.systemSizeKw ? (inputs.systemSizeKw * 6.5).toFixed(1) : '0'} m²`
              : `Vastaava järjestelmän koko: ${inputs.roofArea ? getSystemSizeFromRoof(inputs.roofArea) : '0'} kW`
            }
          </p>
        </div>

        {/* Installation Cost */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-3">
            Asennuskustannukset (€)
          </label>
          <div className="relative">
            <input
              type="number"
              className="input-field pr-8"
              value={inputs.installationCost || ''}
              onChange={(e) => handleInputChange('installationCost', parseFloat(e.target.value))}
              placeholder="7500"
              min="1000"
              step="100"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-text-light text-sm font-medium">€</span>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-2">
            Arvioitu: {inputs.systemSizeKw ? getEstimatedCost(inputs.systemSizeKw).toLocaleString('fi-FI') : '0'} €
          </p>
        </div>

        {/* Panel Efficiency */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-3">
            Paneelien hyötysuhde
          </label>
          <div className="relative">
            <input
              type="number"
              className="input-field pr-12"
              value={inputs.panelEfficiency ? (inputs.panelEfficiency * 100) : ''}
              onChange={(e) => handleInputChange('panelEfficiency', parseFloat(e.target.value) / 100)}
              placeholder="19"
              min="10"
              max="25"
              step="0.1"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-text-light text-sm font-medium">%</span>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-2">
            Modernit paneelit: 18-22%
          </p>
        </div>

        {/* Subsidy Info */}
        <div className="bg-gradient-to-br from-success-50 to-success-100 border border-success-200 rounded-xl p-6">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-success-200 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <Info className="w-5 h-5 text-success-800" />
            </div>
            <div>
              <h4 className="font-semibold text-success-900 mb-2">Tuet {kunta.name}ssa</h4>
              <div className="space-y-1 text-sm text-success-800">
                <div className="flex justify-between">
                  <span>Valtion tuki:</span>
                  <span className="font-semibold">{(kunta.subsidy.national.rate * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Paikallinen tuki:</span>
                  <span className="font-semibold">{(kunta.subsidy.local.rate * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-success-300">
                  <span className="font-semibold">Yhteensä:</span>
                  <span className="font-bold">
                    {((kunta.subsidy.national.rate + kunta.subsidy.local.rate) * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="text-center mb-6 sm:mb-8">
        <button
          onClick={handleCalculate}
          disabled={isLoading || !inputs.installationCost}
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm sm:text-base px-6 sm:px-8 lg:px-12 py-3 sm:py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
              <span className="text-xs sm:text-base">Lasketaan...</span>
            </>
          ) : (
            <>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              <span className="hidden sm:inline">Laske ROI ja Säästöt</span>
              <span className="sm:hidden">Laske ROI</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {showResult && result && (
        <div className="animate-fade-in bg-gradient-to-br from-primary-50/50 to-success-50/50 border border-primary-200/50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-center mb-8">
            Laskennan Tulokset – {kunta.name}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Energy Production */}
            <div className="result-card">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="font-semibold mb-2">Vuotuinen energiantuotanto</h4>
              <p className="result-value text-yellow-600">
                {result.annualEnergyProduction.toLocaleString('fi-FI')} kWh
              </p>
              <p className="result-label">
                Vastaava {Math.round(result.annualEnergyProduction / 4000)} kotitalouden sähkönkulutusta
              </p>
            </div>

            {/* Annual Savings */}
            <div className="result-card">
              <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-success-600" />
              </div>
              <h4 className="font-semibold mb-2">Vuosittaiset säästöt</h4>
              <p className="result-value text-success-600">
                {result.annualSavings.toLocaleString('fi-FI')} €
              </p>
              <p className="result-label">
                Ensimmäinen vuosi
              </p>
            </div>

            {/* ROI Years */}
            <div className="result-card">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold mb-2">Takaisinmaksuaika</h4>
              <p className="result-value text-primary-600">
                {result.roiYears.toFixed(1)} vuotta
              </p>
              <p className="result-label">
                Tuet huomioitu
              </p>
            </div>

            {/* Total Savings */}
            <div className="result-card">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">20v säästöt</h4>
              <p className="result-value text-purple-600">
                {result.totalSavings20Years.toLocaleString('fi-FI')} €
              </p>
              <p className="result-label">
                Asennuskustannukset vähennetty
              </p>
            </div>
          </div>

          {/* Subsidy Breakdown */}
          <div className="mt-8 bg-bg-primary rounded-xl p-6 border border-text-light/10">
            <h4 className="font-semibold mb-4 text-center">Tukien vaikutus laskelmaan</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <p className="text-text-muted mb-1">Asennuskustannukset</p>
                <p className="font-bold text-lg">{inputs.installationCost?.toLocaleString('fi-FI')} €</p>
              </div>
              <div className="text-center">
                <p className="text-text-muted mb-1">Yhteensä tuet</p>
                <p className="font-bold text-lg text-success-600">-{result.totalSubsidy.toLocaleString('fi-FI')} €</p>
              </div>
              <div className="text-center">
                <p className="text-text-muted mb-1">Nettokustannukset</p>
                <p className="font-bold text-lg">{result.netInstallationCost.toLocaleString('fi-FI')} €</p>
              </div>
            </div>
          </div>

          {/* Data Source Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-text-muted">
              <Info className="w-3 h-3 inline mr-1" />
              Arviot perustuvat FMI:n säteilytietoihin ja Nord Pool sähkön hintoihin.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
