export function calculatePortfolioStats(items) {
  // Defensive Check: If portfolio is empty, return zeros to avoid division by zero errors
  if (!items || items.length === 0) {
    return { 
      total: 0, 
      weightedReturn: 0, 
      riskDistribution: { low: 0, medium: 0, high: 0 },
      itemCount: 0
    };
  }

  // 1. Calculate Total Principal Invested
  const total = items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);

  // 2. Calculate Weighted Average Return (The "Portfolio Yield")
  // Formula: Sum of (Asset Amount / Total Portfolio) * Asset Return
  const weightedReturn = items.reduce((acc, item) => {
    const contribution = (Number(item.amount) / total) * (item.expectedReturn || 0);
    return acc + contribution;
  }, 0);

  // 3. Risk Exposure Analysis (Percentage of Portfolio in Low/Med/High)
  const riskDistribution = { low: 0, medium: 0, high: 0 };

  items.forEach((item) => {
    // Accumulate the PKR amount for each risk category
    if (Object.prototype.hasOwnProperty.call(riskDistribution, item.riskLevel)) {
      riskDistribution[item.riskLevel] += (Number(item.amount) || 0);
    }
  });

  // Convert the PKR amounts into percentages (0-100%)
  Object.keys(riskDistribution).forEach((k) => {
    riskDistribution[k] = total > 0 ? (riskDistribution[k] / total) * 100 : 0;
  });

  return { 
    total, 
    weightedReturn: Number(weightedReturn.toFixed(2)),
    riskDistribution,
    itemCount: items.length
  };
}
