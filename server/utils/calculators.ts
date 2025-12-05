// Calculator utilities for sustainability metrics

/**
 * Calculate carbon footprint from emission data
 * This is a simplified calculator that would be more complex in a real app
 */
export function calculateCarbonFootprint(data: any) {
  let total = 0;
  let scope1Total = 0;
  let scope2Total = 0;
  let scope3Total = 0;
  
  // Calculate Scope 1 emissions (direct emissions)
  if (data.scope1) {
    if (typeof data.scope1 === 'number') {
      scope1Total = data.scope1;
    } else if (data.scope1.vehicles && data.scope1.facilities) {
      scope1Total = parseFloat(data.scope1.vehicles) + parseFloat(data.scope1.facilities);
    }
  }
  
  // Calculate Scope 2 emissions (indirect emissions from purchased electricity)
  if (data.scope2) {
    if (typeof data.scope2 === 'number') {
      scope2Total = data.scope2;
    } else if (data.scope2.electricity && data.scope2.heating) {
      scope2Total = parseFloat(data.scope2.electricity) + parseFloat(data.scope2.heating);
    }
  }
  
  // Calculate Scope 3 emissions (all other indirect emissions)
  if (data.scope3) {
    if (typeof data.scope3 === 'number') {
      scope3Total = data.scope3;
    } else if (data.scope3.purchasedGoods && data.scope3.businessTravel && data.scope3.employeeCommuting) {
      scope3Total = 
        parseFloat(data.scope3.purchasedGoods) + 
        parseFloat(data.scope3.businessTravel) + 
        parseFloat(data.scope3.employeeCommuting);
    }
  }
  
  // Calculate total footprint
  total = scope1Total + scope2Total + scope3Total;
  
  return {
    total,
    scope1: scope1Total,
    scope2: scope2Total,
    scope3: scope3Total,
    breakdown: {
      scope1Percentage: scope1Total / total * 100,
      scope2Percentage: scope2Total / total * 100,
      scope3Percentage: scope3Total / total * 100
    }
  };
}

/**
 * Calculate energy intensity (energy consumption per unit of output)
 */
export function calculateEnergyIntensity(energyConsumption: number, productionOutput: number) {
  if (productionOutput === 0) {
    throw new Error("Production output cannot be zero");
  }
  
  return energyConsumption / productionOutput;
}

/**
 * Calculate water intensity (water consumption per unit of output)
 */
export function calculateWaterIntensity(waterConsumption: number, productionOutput: number) {
  if (productionOutput === 0) {
    throw new Error("Production output cannot be zero");
  }
  
  return waterConsumption / productionOutput;
}

/**
 * Calculate waste intensity (waste generation per unit of output)
 */
export function calculateWasteIntensity(wasteGeneration: number, productionOutput: number) {
  if (productionOutput === 0) {
    throw new Error("Production output cannot be zero");
  }
  
  return wasteGeneration / productionOutput;
}

/**
 * Calculate year-over-year change percentage
 */
export function calculateYearOverYearChange(currentValue: number, previousValue: number) {
  if (previousValue === 0) {
    throw new Error("Previous value cannot be zero");
  }
  
  return ((currentValue - previousValue) / previousValue) * 100;
}
