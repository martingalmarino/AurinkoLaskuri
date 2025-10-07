import { 
  SolarSystemInputs, 
  ROICalculationResult, 
  SolarRadiationData, 
  ElectricityPrice, 
  SubsidyData 
} from './types';

export class ROISolarCalculator {
  private readonly DEFAULT_PANEL_EFFICIENCY = 0.19; // 19% efficiency
  private readonly PANELS_PER_KW = 4; // 4 panels per kW (250W panels)
  private readonly PANEL_AREA_PER_KW = 6.5; // m² per kW
  private readonly MAINTENANCE_COST_PERCENT = 0.01; // 1% of installation cost per year
  private readonly DEGRADATION_RATE = 0.005; // 0.5% per year
  private readonly ANALYSIS_PERIOD = 20; // years

  /**
   * Calculate solar system ROI for Finland
   */
  calculateROI(
    inputs: SolarSystemInputs,
    radiationData: SolarRadiationData,
    electricityPrice: ElectricityPrice,
    subsidyData: SubsidyData
  ): ROICalculationResult {
    // Determine system size and panel area
    const { systemSizeKw, panelArea, panelEfficiency } = this.calculateSystemSpecs(inputs);
    
    // Calculate annual energy production
    const annualEnergyProduction = this.calculateAnnualProduction(
      panelArea,
      radiationData.annualRADGLO,
      panelEfficiency
    );

    // Calculate annual savings
    const annualSavings = this.calculateAnnualSavings(
      annualEnergyProduction,
      electricityPrice.price
    );

    // Calculate subsidies
    const totalSubsidy = this.calculateTotalSubsidy(
      inputs.installationCost,
      subsidyData
    );

    // Calculate net installation cost
    const netInstallationCost = inputs.installationCost - totalSubsidy;

    // Calculate ROI years
    const roiYears = this.calculateROIYears(
      netInstallationCost,
      annualSavings
    );

    // Calculate 20-year savings
    const totalSavings20Years = this.calculateTotalSavingsOverTime(
      netInstallationCost,
      annualSavings,
      this.ANALYSIS_PERIOD
    );

    // Calculate break-even year
    const breakEvenYear = this.calculateBreakEvenYear(
      netInstallationCost,
      annualSavings
    );

    return {
      annualEnergyProduction: Math.round(annualEnergyProduction),
      annualSavings: Math.round(annualSavings * 100) / 100,
      totalSubsidy: Math.round(totalSubsidy * 100) / 100,
      netInstallationCost: Math.round(netInstallationCost * 100) / 100,
      roiYears: Math.round(roiYears * 10) / 10,
      totalSavings20Years: Math.round(totalSavings20Years * 100) / 100,
      breakEvenYear: Math.round(breakEvenYear * 10) / 10,
    };
  }

  private calculateSystemSpecs(inputs: SolarSystemInputs): {
    systemSizeKw: number;
    panelArea: number;
    panelEfficiency: number;
  } {
    let systemSizeKw: number;
    let panelArea: number;

    if (inputs.systemSizeKw) {
      systemSizeKw = inputs.systemSizeKw;
      panelArea = systemSizeKw * this.PANEL_AREA_PER_KW;
    } else if (inputs.roofArea) {
      panelArea = inputs.roofArea;
      systemSizeKw = panelArea / this.PANEL_AREA_PER_KW;
    } else {
      throw new Error('Either systemSizeKw or roofArea must be provided');
    }

    const panelEfficiency = inputs.panelEfficiency || this.DEFAULT_PANEL_EFFICIENCY;

    return {
      systemSizeKw: Math.round(systemSizeKw * 10) / 10,
      panelArea: Math.round(panelArea * 10) / 10,
      panelEfficiency,
    };
  }

  private calculateAnnualProduction(
    panelArea: number,
    annualRADGLO: number,
    panelEfficiency: number
  ): number {
    // Annual production = Panel area (m²) × Annual RADGLO (kWh/m²) × Panel efficiency
    return panelArea * annualRADGLO * panelEfficiency;
  }

  private calculateAnnualSavings(
    annualEnergyProduction: number,
    electricityPrice: number
  ): number {
    // Annual savings = Annual production (kWh) × Electricity price (€/kWh)
    return annualEnergyProduction * electricityPrice;
  }

  private calculateTotalSubsidy(
    installationCost: number,
    subsidyData: SubsidyData
  ): number {
    // Total subsidy = National subsidy + Local subsidy
    const nationalSubsidy = installationCost * subsidyData.national.rate;
    const localSubsidy = installationCost * subsidyData.local.rate;
    
    // Cap total subsidy at 50% of installation cost
    const totalSubsidy = nationalSubsidy + localSubsidy;
    return Math.min(totalSubsidy, installationCost * 0.5);
  }

  private calculateROIYears(
    netInstallationCost: number,
    annualSavings: number
  ): number {
    if (annualSavings <= 0) return Infinity;
    return netInstallationCost / annualSavings;
  }

  private calculateTotalSavingsOverTime(
    netInstallationCost: number,
    annualSavings: number,
    years: number
  ): number {
    let totalSavings = 0;
    let cumulativeCost = netInstallationCost;

    for (let year = 1; year <= years; year++) {
      // Apply degradation to energy production
      const degradationFactor = Math.pow(1 - this.DEGRADATION_RATE, year - 1);
      const yearlySavings = annualSavings * degradationFactor;
      
      // Subtract maintenance costs
      const maintenanceCost = netInstallationCost * this.MAINTENANCE_COST_PERCENT;
      
      const netYearlySavings = yearlySavings - maintenanceCost;
      totalSavings += netYearlySavings;
    }

    return totalSavings - netInstallationCost;
  }

  private calculateBreakEvenYear(
    netInstallationCost: number,
    annualSavings: number
  ): number {
    if (annualSavings <= 0) return Infinity;

    let cumulativeSavings = 0;
    let year = 0;

    while (cumulativeSavings < netInstallationCost && year < 50) {
      year++;
      // Apply degradation
      const degradationFactor = Math.pow(1 - this.DEGRADATION_RATE, year - 1);
      const yearlySavings = annualSavings * degradationFactor;
      
      // Subtract maintenance costs
      const maintenanceCost = netInstallationCost * this.MAINTENANCE_COST_PERCENT;
      const netYearlySavings = yearlySavings - maintenanceCost;
      
      cumulativeSavings += netYearlySavings;
    }

    return year;
  }

  /**
   * Calculate system size from roof area
   */
  calculateSystemSizeFromRoof(roofArea: number, panelEfficiency: number = this.DEFAULT_PANEL_EFFICIENCY): {
    systemSizeKw: number;
    panelCount: number;
    estimatedCost: number;
  } {
    const systemSizeKw = roofArea / this.PANEL_AREA_PER_KW;
    const panelCount = Math.floor(systemSizeKw * this.PANELS_PER_KW);
    
    // Estimated cost: 1000-1500 €/kW depending on size
    const costPerKw = systemSizeKw < 5 ? 1500 : systemSizeKw < 10 ? 1300 : 1000;
    const estimatedCost = systemSizeKw * costPerKw;

    return {
      systemSizeKw: Math.round(systemSizeKw * 10) / 10,
      panelCount,
      estimatedCost: Math.round(estimatedCost),
    };
  }

  /**
   * Calculate roof area needed for system size
   */
  calculateRoofAreaFromSystem(systemSizeKw: number): {
    roofArea: number;
    panelCount: number;
  } {
    const roofArea = systemSizeKw * this.PANEL_AREA_PER_KW;
    const panelCount = Math.floor(systemSizeKw * this.PANELS_PER_KW);

    return {
      roofArea: Math.round(roofArea * 10) / 10,
      panelCount,
    };
  }

  /**
   * Get monthly production estimates
   */
  getMonthlyProduction(
    systemSizeKw: number,
    radiationData: SolarRadiationData,
    panelEfficiency: number = this.DEFAULT_PANEL_EFFICIENCY
  ): number[] {
    const panelArea = systemSizeKw * this.PANEL_AREA_PER_KW;
    
    return radiationData.monthlyRADGLO.map(monthlyRADGLO => 
      Math.round(panelArea * monthlyRADGLO * panelEfficiency)
    );
  }

  /**
   * Validate inputs
   */
  validateInputs(inputs: SolarSystemInputs): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!inputs.systemSizeKw && !inputs.roofArea) {
      errors.push('Either system size (kW) or roof area (m²) must be provided');
    }

    if (inputs.systemSizeKw && (inputs.systemSizeKw < 1 || inputs.systemSizeKw > 50)) {
      errors.push('System size must be between 1 and 50 kW');
    }

    if (inputs.roofArea && (inputs.roofArea < 5 || inputs.roofArea > 500)) {
      errors.push('Roof area must be between 5 and 500 m²');
    }

    if (inputs.panelEfficiency && (inputs.panelEfficiency < 0.1 || inputs.panelEfficiency > 0.25)) {
      errors.push('Panel efficiency must be between 10% and 25%');
    }

    if (inputs.installationCost && inputs.installationCost < 1000) {
      errors.push('Installation cost must be at least 1000 €');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

// Export singleton instance
export const roiSolarCalculator = new ROISolarCalculator();
