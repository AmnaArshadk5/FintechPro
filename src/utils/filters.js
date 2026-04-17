export function applyFilters(products, filters) {
  return products.filter(product => {
    const matchesRisk = filters.risk.length === 0 || filters.risk.includes(product.riskLevel);

    const matchesReturn = (product.expectedReturn >= (filters.minReturn || 0)) && 
                          (product.expectedReturn <= (filters.maxReturn || 100));

    const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category);

    const matchesLiquidity = !filters.liquidity || filters.liquidity === "all" || product.liquidity === filters.liquidity;
    const matchesHorizon = !filters.timeHorizon || filters.timeHorizon === "all" || product.timeHorizon === filters.timeHorizon;

    const matchesBudget = product.minInvestment <= (filters.budget || 200000);

    return matchesRisk && matchesReturn && matchesCategory && matchesLiquidity && matchesHorizon && matchesBudget;
  });
}


export function countMatchingProducts(products, filters) {
  return applyFilters(products, filters).length;
}


export function getFilterStats(products, filters) {
  const filtered = applyFilters(products, filters);
  const totalProducts = products.length;
  
  return {
    matchingCount: filtered.length,
    totalCount: totalProducts,
    matchPercentage: Math.round((filtered.length / totalProducts) * 100),
    avgReturn: filtered.length > 0 
      ? (filtered.reduce((sum, p) => sum + p.expectedReturn, 0) / filtered.length).toFixed(1)
      : 0,
    riskBreakdown: {
      low: filtered.filter(p => p.riskLevel === 'low').length,
      medium: filtered.filter(p => p.riskLevel === 'medium').length,
      high: filtered.filter(p => p.riskLevel === 'high').length
    }
  };
}