'use client';

import { KuntaData, SolarSystemInputs, ROICalculationResult } from '@/lib/types'
import { roiSolarCalculator } from '@/lib/roiSolarFI'
import { getMockSolarRadiation, getMockElectricityPrice } from '@/lib/mockData'
import PremiumCalculator from './PremiumCalculator'

interface CalculatorWrapperProps {
  kunta: KuntaData
}

export default function CalculatorWrapper({ kunta }: CalculatorWrapperProps) {
  const handleCalculate = async (inputs: SolarSystemInputs): Promise<ROICalculationResult> => {
    // Use mock data for calculations
    const solarRadiationData = getMockSolarRadiation(kunta.fmiStation)
    const electricityPriceData = getMockElectricityPrice()
    
    return roiSolarCalculator.calculateROI(
      inputs,
      solarRadiationData,
      electricityPriceData,
      kunta.subsidy
    )
  }

  return (
    <PremiumCalculator
      kunta={kunta}
      onCalculate={handleCalculate}
    />
  )
}
