export function getRecommendations(products, profile) {
  if (!profile || !profile.riskTolerance) {
    return products
      .filter(p => p.riskLevel === "low")
      .sort((a, b) => b.expectedReturn - a.expectedReturn)
      .slice(0, 3);
  }

  const riskMapping = {
    'conservative': ['low'],
    'moderate': ['low', 'medium'],
    'aggressive': ['low', 'medium', 'high'],
    'low': ['low'],
    'medium': ['low', 'medium'],
    'high': ['low', 'medium', 'high'],
  };

  const allowedRisks = riskMapping[profile.riskTolerance.toLowerCase()] || ['low'];

  const horizonMapping = {
    'short': ['short'],
    'medium': ['short', 'medium'],
    'long': ['short', 'medium', 'long'],
  };

  const allowedHorizons = horizonMapping[profile.investmentHorizon?.toLowerCase()] || ['short', 'medium', 'long'];

  const liquidityMapping = {
    'easy': ['easy'],
    'moderate': ['easy', 'moderate'],
    'locked': ['easy', 'moderate', 'locked'],
  };

  const allowedLiquidity = liquidityMapping[profile.liquidityPreference?.toLowerCase()] || ['easy', 'moderate', 'locked'];

  const userBudget = Number(profile.monthlyCapacity) || 0;

  const filtered = products.filter(p => {
    const isRiskAllowed = allowedRisks.includes(p.riskLevel);
    const isHorizonAllowed = allowedHorizons.includes(p.timeHorizon);
    const isLiquidityAllowed = allowedLiquidity.includes(p.liquidity);
    const isAffordable = userBudget === 0 || p.minInvestment <= userBudget;

    return isRiskAllowed && isHorizonAllowed && isLiquidityAllowed && isAffordable;
  });

  const scored = filtered.map(product => {
    let score = 0;
    score += product.expectedReturn * 2;
a
    if (profile.investmentHorizon === "long" || profile.investmentGoal === "retirement") {
      if (product.timeHorizon === "long") {
        score += 10; 
      }
    }
    
    if (profile.liquidityPreference === product.liquidity) {
      score += 8;
    }


    if (userBudget > 0) {
      const efficiencyRatio = product.minInvestment / userBudget;
      score += efficiencyRatio * 5; 
    }

    if (profile.investmentGoal) {
      const goalMap = {
        'wealth': ['investment', 'crypto'], 
        'retirement': ['savings', 'investment'], 
        'emergency': ['savings'], 
        'purchase': ['savings', 'investment'], 
        'income': ['savings', 'investment'], 
      };
      
      if (goalMap[profile.investmentGoal]?.includes(product.category)) {
        score += 6;
      }
    }

    return { product, score };
  });

  return scored
    .sort((a, b) => b.score - a.score) 
    .map(item => item.product);
}

export function getRecommendationInsight(profile) {
  if (!profile || !profile.riskTolerance) {
    return "Complete your profile to receive personalized recommendations.";
  }

  const insights = [];
  
  if (profile.riskTolerance === 'conservative') {
    insights.push("We're prioritizing low-risk, stable products to protect your capital.");
  } else if (profile.riskTolerance === 'moderate') {
    insights.push("We're recommending a mix of low and medium-risk products for balanced growth.");
  } else if (profile.riskTolerance === 'aggressive') {
    insights.push("We're showing all risk levels, with emphasis on high-return opportunities.");
  }

  if (profile.monthlyCapacity) {
    insights.push(`Products must be affordable within your PKR ${profile.monthlyCapacity.toLocaleString()} monthly budget.`);
  }

  if (profile.investmentHorizon === 'long') {
    insights.push("Long-term products are prioritized for compound growth potential.");
  } else if (profile.investmentHorizon === 'short') {
    insights.push("We're focusing on short-term, liquid products for quick returns.");
  }

  if (profile.liquidityPreference === 'easy') {
    insights.push("Products offering quick access are prioritized.");
  } else if (profile.liquidityPreference === 'locked') {
    insights.push("We're showing locked products which offer higher returns for your commitment.");
  }

  return insights.join(" ");
}


export function doesProductMatchProfile(product, profile) {
  if (!profile) return false;

  const riskMapping = {
    'conservative': ['low'],
    'moderate': ['low', 'medium'],
    'aggressive': ['low', 'medium', 'high'],
  };
  
  const horizonMapping = {
    'short': ['short'],
    'medium': ['short', 'medium'],
    'long': ['short', 'medium', 'long'],
  };

  const liquidityMapping = {
    'easy': ['easy'],
    'moderate': ['easy', 'moderate'],
    'locked': ['easy', 'moderate', 'locked'],
  };

  const allowedRisks = riskMapping[profile.riskTolerance] || ['low'];
  const allowedHorizons = horizonMapping[profile.investmentHorizon] || ['short', 'medium', 'long'];
  const allowedLiquidity = liquidityMapping[profile.liquidityPreference] || ['easy', 'moderate', 'locked'];
  const budget = Number(profile.monthlyCapacity) || 0;

  return (
    allowedRisks.includes(product.riskLevel) &&
    allowedHorizons.includes(product.timeHorizon) &&
    allowedLiquidity.includes(product.liquidity) &&
    (budget === 0 || product.minInvestment <= budget)
  );
}