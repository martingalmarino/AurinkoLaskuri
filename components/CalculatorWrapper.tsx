'use client';

import { KuntaData, SolarSystemInputs, ROICalculationResult } from '@/lib/types'
import { roiSolarCalculator } from '@/lib/roiSolarFI'
import { dataService } from '@/lib/dataService'
import PremiumCalculator from './PremiumCalculator'

interface CalculatorWrapperProps {
  kunta: KuntaData
}

export default function CalculatorWrapper({ kunta }: CalculatorWrapperProps) {
  const handleCalculate = async (inputs: SolarSystemInputs): Promise<ROICalculationResult> => {
    // Fetch fresh data for calculations
    const solarRadiationData = await dataService.getSolarRadiation(kunta.fmiStation)
    const electricityPriceData = await dataService.getElectricityPrice()

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
