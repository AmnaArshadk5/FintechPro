export function getRecommendations(products, profile) {
  if (!profile || !profile.riskTolerance) {
    return products
      .filter(p => p.riskLevel?.toLowerCase() === "low")
      .sort((a, b) => (b.expectedReturn || 0) - (a.expectedReturn || 0))
      .slice(0, 3);
  }

  const riskMapping = {
    conservative: ['low'],
    moderate: ['low', 'medium'],
    aggressive: ['low', 'medium', 'high'],
    low: ['low'],
    medium: ['low', 'medium'],
    high: ['low', 'medium', 'high'],
  };

  const allowedRisks =
    riskMapping[profile.riskTolerance?.toLowerCase()] || ['low'];

  const horizonMapping = {
    short: ['short'],
    medium: ['short', 'medium'],
    long: ['short', 'medium', 'long'],
  };

  const allowedHorizons =
    horizonMapping[profile.investmentHorizon?.toLowerCase()] ||
    ['short', 'medium', 'long'];

  const liquidityMapping = {
    easy: ['easy'],
    moderate: ['easy', 'moderate'],
    locked: ['easy', 'moderate', 'locked'],
  };

  const allowedLiquidity =
    liquidityMapping[profile.liquidityPreference?.toLowerCase()] ||
    ['easy', 'moderate', 'locked'];

  const userBudget = Number(profile.monthlyCapacity) || 0;

  const filtered = products.filter(p => {
    const isRiskAllowed = allowedRisks.includes(
      p.riskLevel?.toLowerCase()
    );

    const isHorizonAllowed = allowedHorizons.includes(
      p.timeHorizon?.toLowerCase()
    );

    const isLiquidityAllowed = allowedLiquidity.includes(
      p.liquidity?.toLowerCase()
    );

    const isAffordable =
      userBudget === 0 || p.minInvestment <= userBudget;

    return (
      isRiskAllowed &&
      isHorizonAllowed &&
      isLiquidityAllowed &&
      isAffordable
    );
  });

  const scored = filtered.map(product => {
    let score = 0;

    score += (product.expectedReturn || 0) * 1.2;

    if (
      profile.investmentHorizon?.toLowerCase() === "long" ||
      profile.investmentGoal?.toLowerCase() === "retirement"
    ) {
      if (product.timeHorizon?.toLowerCase() === "long") {
        score += 10;
      }
    }

    if (
      profile.liquidityPreference?.toLowerCase() ===
      product.liquidity?.toLowerCase()
    ) {
      score += 8;
    }

    if (userBudget > 0) {
      const ratio = product.minInvestment / userBudget;
      const safeRatio = Math.min(ratio, 1);
      score += (1 - safeRatio) * 5;
    }

    if (profile.investmentGoal) {
      const goalMap = {
        wealth: ['investment', 'crypto'],
        retirement: ['savings', 'investment'],
        emergency: ['savings'],
        purchase: ['savings', 'investment'],
        income: ['savings', 'investment'],
      };

      if (
        goalMap[profile.investmentGoal?.toLowerCase()]?.includes(
          product.category?.toLowerCase()
        )
      ) {
        score += 6;
      }
    }

    return { product, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);
}