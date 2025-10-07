'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Home, Zap, TrendingUp, Info } from 'lucide-react';
import { SolarSystemInputs, ROICalculationResult, KuntaData } from '@/lib/types';

interface CalculatorCardProps {
  kunta: KuntaData;
  onCalculate: (inputs: SolarSystemInputs) => Promise<ROICalculationResult>;
  isLoading?: boolean;
}

export default function CalculatorCard({ kunta, onCalculate, isLoading = false }: CalculatorCardProps) {
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

  const handleSystemSizeChange = (value: number) => {
    setInputs(prev => ({
      ...prev,
      systemSizeKw: value,
      roofArea: undefined,
    }));
    setShowResult(false);
  };

  const handleRoofAreaChange = (value: number) => {
    setInputs(prev => ({
      ...prev,
      roofArea: value,
      systemSizeKw: undefined,
    }));
    setShowResult(false);
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
    <div className="card max-w-4xl mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Calculator className="w-8 h-8 text-primary-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">
            Aurinkopaneelit Laskuri – {kunta.name}
          </h2>
        </div>
        <p className="text-gray-600">
          Laske aurinkopaneelien takaisinmaksuaika ja säästöt {kunta.name}ssa
        </p>
      </div>

      {/* Input Mode Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setInputMode('system')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            inputMode === 'system'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Zap className="w-4 h-4 inline mr-2" />
          Järjestelmän koko (kW)
        </button>
        <button
          onClick={() => setInputMode('roof')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            inputMode === 'roof'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Home className="w-4 h-4 inline mr-2" />
          Katon pinta-ala (m²)
        </button>
      </div>

      {/* Input Fields */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* System Size or Roof Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  handleSystemSizeChange(value);
                } else {
                  handleRoofAreaChange(value);
                }
              }}
              placeholder={inputMode === 'system' ? '5' : '32.5'}
              min="1"
              max={inputMode === 'system' ? '50' : '500'}
              step="0.1"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-gray-500 text-sm">
                {inputMode === 'system' ? 'kW' : 'm²'}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {inputMode === 'system' 
              ? `Vastaava katon pinta-ala: ${inputs.systemSizeKw ? (inputs.systemSizeKw * 6.5).toFixed(1) : '0'} m²`
              : `Vastaava järjestelmän koko: ${inputs.roofArea ? getSystemSizeFromRoof(inputs.roofArea) : '0'} kW`
            }
          </p>
        </div>

        {/* Installation Cost */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <span className="text-gray-500 text-sm">€</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Arvioitu: {inputs.systemSizeKw ? getEstimatedCost(inputs.systemSizeKw).toLocaleString('fi-FI') : '0'} €
          </p>
        </div>

        {/* Panel Efficiency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <span className="text-gray-500 text-sm">%</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Modernit paneelit: 18-22%
          </p>
        </div>

        {/* Subsidy Info */}
        <div className="bg-success-50 border border-success-200 rounded-lg p-4">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-success-600 mr-3 mt-0.5" />
            <div>
              <h4 className="font-medium text-success-900 mb-1">Tuet {kunta.name}ssa</h4>
              <p className="text-sm text-success-700">
                Valtion tuki: {(kunta.subsidy.national.rate * 100).toFixed(0)}%
              </p>
              <p className="text-sm text-success-700">
                Paikallinen tuki: {(kunta.subsidy.local.rate * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-success-600 mt-1">
                Yhteensä jopa {((kunta.subsidy.national.rate + kunta.subsidy.local.rate) * 100).toFixed(0)}% asennuskustannuksista
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleCalculate}
          disabled={isLoading || !inputs.installationCost}
          className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Lasketaan...
            </div>
          ) : (
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Laske ROI ja Säästöt
            </div>
          )}
        </button>
      </div>

      {/* Results */}
      {showResult && result && (
        <div className="animate-fade-in bg-gradient-to-r from-success-50 to-primary-50 border border-success-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Laskennan Tulokset – {kunta.name}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Energy Production */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                <h4 className="font-semibold text-gray-900">Vuotuinen energiantuotanto</h4>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {result.annualEnergyProduction.toLocaleString('fi-FI')} kWh
              </p>
              <p className="text-sm text-gray-600">
                Vastaava {Math.round(result.annualEnergyProduction / 4000)} kotitalouden sähkönkulutusta
              </p>
            </div>

            {/* Annual Savings */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                <h4 className="font-semibold text-gray-900">Vuosittaiset säästöt</h4>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {result.annualSavings.toLocaleString('fi-FI')} €
              </p>
              <p className="text-sm text-gray-600">
                Ensimmäinen vuosi
              </p>
            </div>

            {/* ROI Years */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <Calculator className="w-5 h-5 text-blue-500 mr-2" />
                <h4 className="font-semibold text-gray-900">Takaisinmaksuaika</h4>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {result.roiYears.toFixed(1)} vuotta
              </p>
              <p className="text-sm text-gray-600">
                Tuet huomioitu
              </p>
            </div>

            {/* Total Savings */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-purple-500 mr-2" />
                <h4 className="font-semibold text-gray-900">20v säästöt</h4>
              </div>
              <p className="text-2xl font-bold text-purple-600">
                {result.totalSavings20Years.toLocaleString('fi-FI')} €
              </p>
              <p className="text-sm text-gray-600">
                Asennuskustannukset vähennetty
              </p>
            </div>
          </div>

          {/* Subsidy Breakdown */}
          <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Tukien vaikutus</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Asennuskustannukset:</p>
                <p className="font-semibold">{inputs.installationCost?.toLocaleString('fi-FI')} €</p>
              </div>
              <div>
                <p className="text-gray-600">Yhteensä tuet:</p>
                <p className="font-semibold text-green-600">-{result.totalSubsidy.toLocaleString('fi-FI')} €</p>
              </div>
              <div>
                <p className="text-gray-600">Nettokustannukset:</p>
                <p className="font-semibold">{result.netInstallationCost.toLocaleString('fi-FI')} €</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
