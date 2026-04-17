import { useContext, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ProductComparison from "../components/ProductComparison";
import { PortfolioContext } from "../context/PortfolioContextValue";
import { UserProfileContext } from "../context/UserProfileContextValue";
import { mapToFinancialProduct } from "../utils/financialMapper";
import rawProductsData from "../data/products.json";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToPortfolio } = useContext(PortfolioContext);
  const { profile } = useContext(UserProfileContext);

  const allProducts = rawProductsData.map(mapToFinancialProduct);
  const product = allProducts.find((item) => item.id === Number.parseInt(id, 10)) || null;
  const [amount, setAmount] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  const effectiveAmount = amount || product.minInvestment;
  const yearlyProfit = (effectiveAmount * product.expectedReturn) / 100;

  const getDecisionInsight = (currentProduct) => {
    const insights = [];

    if (currentProduct.riskLevel === "high") {
      insights.push("Aggressive Growth: Best for investors comfortable with significant volatility.");
    } else if (currentProduct.riskLevel === "low") {
      insights.push("Capital Safety: Ideal for preserving initial investment with steady returns.");
    } else {
      insights.push("Balanced Strategy: Moderate exposure for steady growth with acceptable risk.");
    }

    if (currentProduct.liquidity === "locked") {
      insights.push("Capital lock-in: Funds are not easily withdrawable, and early exit may incur penalties.");
    }

    if (currentProduct.timeHorizon === "long") {
      insights.push("Long-term hold: Recommended for 5+ years to maximise compound growth.");
    }

    return insights.join(" | ");
  };

  const getProfileMatch = () => {
    if (!profile) return null;

    const riskMapping = {
      conservative: ["low"],
      moderate: ["low", "medium"],
      aggressive: ["low", "medium", "high"],
    };

    const horizonMapping = {
      short: ["short"],
      medium: ["short", "medium"],
      long: ["short", "medium", "long"],
    };

    const liquidityMapping = {
      easy: ["easy"],
      moderate: ["easy", "moderate"],
      locked: ["easy", "moderate", "locked"],
    };

    const allowedRisks = riskMapping[profile.riskTolerance] || ["low"];
    const allowedHorizons = horizonMapping[profile.investmentHorizon] || ["short", "medium", "long"];
    const allowedLiquidity = liquidityMapping[profile.liquidityPreference] || ["easy", "moderate", "locked"];
    const budget = Number(profile.monthlyCapacity) || 0;

    const riskMatch = allowedRisks.includes(product.riskLevel);
    const horizonMatch = allowedHorizons.includes(product.timeHorizon);
    const liquidityMatch = allowedLiquidity.includes(product.liquidity);
    const budgetMatch = budget === 0 || product.minInvestment <= budget;
    const matchCount = [riskMatch, horizonMatch, liquidityMatch, budgetMatch].filter(Boolean).length;
    const matchPercentage = (matchCount / 4) * 100;

    return { matchPercentage, riskMatch, horizonMatch, liquidityMatch, budgetMatch };
  };

  const profileMatch = getProfileMatch();

  const handleAdd = () => {
    if (effectiveAmount < product.minInvestment) {
      alert(`Minimum investment for this product is PKR ${product.minInvestment.toLocaleString()}`);
      return;
    }

    addToPortfolio(product, effectiveAmount);
    setIsAdded(true);
    setTimeout(() => navigate("/portfolio"), 1500);
  };

  return (
    <div style={{ padding: "120px 20px", maxWidth: "1000px", margin: "auto", fontFamily: "sans-serif" }}>
      <Link
        to="/products"
        style={{ color: "#64748b", textDecoration: "none", fontWeight: "600", display: "inline-flex", alignItems: "center", marginBottom: "24px" }}
      >
        Back to Marketplace
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginTop: "20px" }}>
        <div style={{ position: "relative" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", borderRadius: "16px", border: "1px solid #e2e8f0", background: "#f8fafc", minHeight: "300px", objectFit: "contain", padding: "20px" }}
          />
          <div
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: product.riskLevel === "high" ? "#fee2e2" : product.riskLevel === "medium" ? "#fef3c7" : "#f0fdf4",
              color: product.riskLevel === "high" ? "#991b1b" : product.riskLevel === "medium" ? "#92400e" : "#16a34a",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {product.riskLevel.toUpperCase()} RISK
          </div>
        </div>

        <div>
          <span style={{ background: "#0f172a", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "800", color: "#fff", textTransform: "uppercase" }}>
            {product.category}
          </span>

          <h1 style={{ margin: "16px 0", fontSize: "1.8rem", color: "#0f172a", fontWeight: "800" }}>{product.title}</h1>

          <h2 style={{ color: "#16a34a", margin: "12px 0 4px", fontSize: "1.5rem", fontWeight: "900" }}>
            {product.expectedReturn}%
            <small style={{ color: "#64748b", fontSize: "14px", fontWeight: "400", marginLeft: "8px" }}>Annual Return</small>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "20px 0", padding: "16px", background: "#f1f5f9", borderRadius: "12px", border: "1px solid #cbd5e1" }}>
            <div style={{ textAlign: "center" }}>
              <small style={{ color: "#64748b", display: "block", fontWeight: "600", marginBottom: "4px" }}>LIQUIDITY</small>
              <strong style={{ textTransform: "capitalize", color: "#0f172a" }}>{product.liquidity}</strong>
            </div>
            <div style={{ textAlign: "center" }}>
              <small style={{ color: "#64748b", display: "block", fontWeight: "600", marginBottom: "4px" }}>TIME HORIZON</small>
              <strong style={{ textTransform: "capitalize", color: "#0f172a" }}>{product.timeHorizon}</strong>
            </div>
            <div style={{ textAlign: "center", gridColumn: "1 / -1" }}>
              <small style={{ color: "#64748b", display: "block", fontWeight: "600", marginBottom: "4px" }}>MINIMUM INVESTMENT</small>
              <strong style={{ color: "#16a34a", fontSize: "16px" }}>PKR {product.minInvestment.toLocaleString()}</strong>
            </div>
          </div>

          <div style={{ margin: "20px 0", padding: "16px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h4 style={{ margin: "0 0 8px 0", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              Financial Insight
            </h4>
            <p style={{ margin: 0, fontSize: "13px", color: "#475569", lineHeight: "1.6" }}>{getDecisionInsight(product)}</p>
          </div>

          {profileMatch && (
            <div
              style={{
                margin: "16px 0",
                padding: "14px",
                background: profileMatch.matchPercentage >= 75 ? "#f0fdf4" : profileMatch.matchPercentage >= 50 ? "#fffbeb" : "#fee2e2",
                border: `1px solid ${profileMatch.matchPercentage >= 75 ? "#bbf7d0" : profileMatch.matchPercentage >= 50 ? "#fef3c7" : "#fecaca"}`,
                borderRadius: "10px",
              }}
            >
              <p style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: "600", color: profileMatch.matchPercentage >= 75 ? "#166534" : profileMatch.matchPercentage >= 50 ? "#92400e" : "#991b1b" }}>
                {profileMatch.matchPercentage >= 75 ? "Great Match" : profileMatch.matchPercentage >= 50 ? "Partial Match" : "Poor Match"} with Your Profile ({profileMatch.matchPercentage.toFixed(0)}%)
              </p>
              <div style={{ fontSize: "11px", color: "#64748b", lineHeight: "1.5" }}>
                Risk: {profileMatch.riskMatch ? "Yes" : "No"} | Horizon: {profileMatch.horizonMatch ? "Yes" : "No"} | Liquidity: {profileMatch.liquidityMatch ? "Yes" : "No"} | Budget: {profileMatch.budgetMatch ? "Yes" : "No"}
              </div>
            </div>
          )}

          <div style={{ marginBottom: "20px", marginTop: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "14px", color: "#0f172a" }}>
              Investment Amount (PKR)
            </label>
            <input
              type="number"
              value={effectiveAmount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={product.minInvestment}
              step="1000"
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "2px solid #cbd5e1", fontSize: "16px", fontWeight: "bold", color: "#0f172a", boxSizing: "border-box" }}
            />
            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
              Minimum: PKR {product.minInvestment.toLocaleString()}
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={isAdded || effectiveAmount < product.minInvestment}
            style={{
              width: "100%",
              padding: "16px",
              background: isAdded ? "#16a34a" : effectiveAmount < product.minInvestment ? "#cbd5e1" : "#0f172a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: isAdded || effectiveAmount < product.minInvestment ? "not-allowed" : "pointer",
              fontSize: "16px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => !isAdded && effectiveAmount >= product.minInvestment && (e.target.style.background = "#1e293b")}
            onMouseOut={(e) => !isAdded && effectiveAmount >= product.minInvestment && (e.target.style.background = "#0f172a")}
          >
            {isAdded ? "Added to Portfolio" : "Confirm Investment"}
          </button>

          <ProductComparison product={product} allProducts={allProducts} />
        </div>
      </div>

      {effectiveAmount >= product.minInvestment && (
        <div style={{ marginTop: "50px", padding: "30px", background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", borderRadius: "16px", border: "1px solid #bbf7d0", textAlign: "center" }}>
          <h3 style={{ margin: "0 0 12px 0", color: "#166534" }}>Potential Wealth Growth</h3>
          <p style={{ color: "#166534", margin: "0 0 20px 0", fontSize: "14px" }}>
            Based on PKR <strong>{effectiveAmount.toLocaleString()}</strong> investment with <strong>{product.expectedReturn}%</strong> annual return:
          </p>
          <div style={{ fontSize: "2.5rem", fontWeight: "900", color: "#15803d", marginBottom: "8px" }}>
            + PKR {yearlyProfit.toLocaleString()}
          </div>
          <small style={{ color: "#166534", fontWeight: "600", fontSize: "13px" }}>
            Total after 1 year: <strong>PKR {(effectiveAmount + yearlyProfit).toLocaleString()}</strong>
          </small>
          <div style={{ marginTop: "16px", fontSize: "12px", color: "#166534", lineHeight: "1.5" }}>
            <strong>Disclaimer:</strong> This is a projection based on current returns. Actual returns may vary. Past performance doesn't guarantee future results.
          </div>
        </div>
      )}
    </div>
  );
}
