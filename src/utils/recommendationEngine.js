const riskToleranceMap = {
  conservative: ["low"],
  moderate: ["low", "medium"],
  aggressive: ["low", "medium", "high"],
};

const horizonToleranceMap = {
  short: ["short"],
  medium: ["short", "medium"],
  long: ["short", "medium", "long"],
};

const liquidityToleranceMap = {
  easy: ["easy"],
  moderate: ["easy", "moderate"],
  locked: ["easy", "moderate", "locked"],
};

const goalMap = {
  wealth: ["investment", "crypto"],
  retirement: ["savings", "investment"],
  emergency: ["savings"],
  purchase: ["savings", "investment"],
  income: ["savings", "investment"],
};

export function getRecommendations(products = [], profile = null) {
  if (!Array.isArray(products)) {
    return [];
  }

  if (!profile) {
    return products;
  }

  const userBudget = Number(profile.monthlyCapacity) || 0;
  const allowedRisks = riskToleranceMap[profile.riskTolerance] || ["low", "medium", "high"];
  const allowedHorizons = horizonToleranceMap[profile.investmentHorizon] || ["short", "medium", "long"];
  const allowedLiquidity = liquidityToleranceMap[profile.liquidityPreference] || ["easy", "moderate", "locked"];

  const filtered = products.filter((product) => {
    const matchesRisk = allowedRisks.includes(product.riskLevel);
    const matchesHorizon = allowedHorizons.includes(product.timeHorizon);
    const matchesLiquidity = allowedLiquidity.includes(product.liquidity);
    const matchesBudget = userBudget === 0 || product.minInvestment <= userBudget;

    return matchesRisk && matchesHorizon && matchesLiquidity && matchesBudget;
  });

  return filtered
    .map((product) => {
      let score = product.expectedReturn * 2;

      if ((profile.investmentHorizon === "long" || profile.investmentGoal === "retirement") && product.timeHorizon === "long") {
        score += 10;
      }

      if (profile.liquidityPreference === product.liquidity) {
        score += 8;
      }

      if (userBudget > 0) {
        const affordabilityRatio = product.minInvestment / userBudget;
        score += (1 - Math.min(affordabilityRatio, 1)) * 5;
      }

      if (goalMap[profile.investmentGoal]?.includes(product.category)) {
        score += 6;
      }

      return { product, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product);
}
