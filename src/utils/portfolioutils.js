export function calculatePortfolioStats(items) {
  if (!items || items.length === 0) {
    return { 
      total: 0, 
      weightedReturn: 0, 
      riskDistribution: { low: 0, medium: 0, high: 0 },
      itemCount: 0
    };
  }

  const total = items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);

  const weightedReturn = items.reduce((acc, item) => {
    const contribution = (Number(item.amount) / total) * (item.expectedReturn || 0);
    return acc + contribution;
  }, 0);

  const riskDistribution = { low: 0, medium: 0, high: 0 };

  items.forEach(item => {
    if (riskDistribution.hasOwnProperty(item.riskLevel)) {
      riskDistribution[item.riskLevel] += (Number(item.amount) || 0);
    }
  });

  Object.keys(riskDistribution).forEach(k => {
    riskDistribution[k] = total > 0 ? (riskDistribution[k] / total) * 100 : 0;
  });

return { 
  total, 
  weightedReturn: Number(weightedReturn.toFixed(2)), 
  riskDistribution,
  itemCount: items.length
};
}