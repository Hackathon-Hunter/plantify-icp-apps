// utils/calculateReturn.ts
export function calculateProjectedIncome({
    investment,
    period,
    yieldType,
    autoReinvest,
  }: {
    investment: number;
    period: number;
    yieldType: 'last' | 'average';
    autoReinvest: boolean;
  }) {
    const annualYield = yieldType === 'last' ? 0.12 : 0.08;
    let totalReturn = 0;
  
    if (autoReinvest) {
      let currentAmount = investment;
      for (let i = 0; i < period; i++) {
        const earned = currentAmount * annualYield;
        currentAmount += earned;
      }
      totalReturn = currentAmount - investment;
    } else {
      totalReturn = investment * annualYield * period;
    }
  
    const totalAsset = investment + totalReturn;
  
    return {
      totalReturn: totalReturn.toFixed(0),
      totalAsset: totalAsset.toFixed(0),
    };
  }
  