import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContextValue";
import { calculatePortfolioStats } from "../utils/portfolioutils";
import { Link } from "react-router-dom"; // Essential import to prevent the crash

export default function Portfolio() {
  const { portfolio, removeFromPortfolio } = useContext(PortfolioContext);
  
  // Cleanly access the items array from our context structure
  const items = portfolio?.items || [];
  const stats = calculatePortfolioStats(items);

  if (items.length === 0) {
    return (
      <div style={{ padding: "150px 20px", textAlign: "center" }}>
        <div style={{ fontSize: "50px", marginBottom: "20px" }}>📉</div>
        <h2 style={{ fontWeight: "800" }}>Portfolio Empty</h2>
        <p style={{ color: "#64748b" }}>You haven't added any financial assets yet.</p>
        <Link to="/products" style={{ color: "#16a34a", fontWeight: "bold", textDecoration: "none" }}>
          Go to Market →
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "100px 20px", maxWidth: "1100px", margin: "auto" }}>
      <h1 style={{ fontWeight: "900", marginBottom: "30px" }}>Executive Portfolio Summary</h1>

      {/* DASHBOARD STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        <div style={statBoxStyle}>
          <small style={{ color: "#64748b", fontWeight: "bold" }}>TOTAL CAPITAL</small>
          <h2 style={{ margin: "5px 0", fontSize: "28px" }}>PKR {stats.total.toLocaleString()}</h2>
        </div>

        <div style={{ ...statBoxStyle, background: "#f0fdf4", borderColor: "#bbf7d0" }}>
          <small style={{ color: "#166534", fontWeight: "bold" }}>WEIGHTED YIELD</small>
          <h2 style={{ margin: "5px 0", color: "#15803d", fontSize: "28px" }}>
            {stats.weightedReturn.toFixed(2)}%
          </h2>
        </div>

        <div style={{ ...statBoxStyle, background: "#fff7ed", borderColor: "#ffedd5" }}>
          <small style={{ color: "#9a3412", fontWeight: "bold" }}>ASSET COUNT</small>
          <h2 style={{ margin: "5px 0", color: "#c2410c", fontSize: "28px" }}>{items.length}</h2>
        </div>
      </div>

      <h3 style={{ fontWeight: "800", marginBottom: "20px" }}>Your Holdings</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {items.map((item) => (
          <div key={item.id} style={assetRowStyle}>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <div style={{ background: "#f1f5f9", padding: "10px", borderRadius: "10px" }}>
                <img src={item.image} alt="" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
              </div>
              <div>
                <div style={{ fontWeight: "800", color: "#0f172a" }}>{item.title}</div>
                <small style={{ color: "#64748b", fontWeight: "bold" }}>
                  {item.category.toUpperCase()} • {item.riskLevel.toUpperCase()} RISK
                </small>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "900" }}>PKR {item.amount.toLocaleString()}</div>
                <div style={{ color: "#16a34a", fontSize: "13px", fontWeight: "bold" }}>{item.expectedReturn}% Yield</div>
              </div>
              <button 
                onClick={() => removeFromPortfolio(item.id)}
                style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontWeight: "bold" }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const statBoxStyle = {
  padding: "25px", 
  background: "#f8fafc", 
  borderRadius: "16px", 
  border: "1px solid #e2e8f0"
};

const assetRowStyle = {
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
  padding: "20px", 
  background: "white", 
  borderRadius: "14px", 
  border: "1px solid #e2e8f0",
  boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
};
