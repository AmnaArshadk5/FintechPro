import { Link } from "react-router-dom";
import { mapToFinancialProduct } from "../utils/financialMapper";
import { getRecommendations } from "../utils/recommendationEngine.js";
import rawProductsData from "../data/products.json";

export default function Recommendations() {
  const transformedProducts = rawProductsData.map(mapToFinancialProduct);
  const savedProfile = localStorage.getItem("userProfile");
  const userProfile = savedProfile ? JSON.parse(savedProfile) : null;
  const filtered = userProfile
    ? getRecommendations(transformedProducts, userProfile)
    : transformedProducts;

  return (
    <div style={{ padding: "100px 30px 30px", maxWidth: "1200px", margin: "auto" }}>
      <div style={{ marginBottom: "30px", borderBottom: "1px solid #e2e8f0", paddingBottom: "20px" }}>
        <h1 style={{ color: "#0f172a", fontSize: "2rem", fontWeight: "800" }}>Personalized Recommendations</h1>
        {userProfile ? (
          <p style={{ color: "#64748b", fontSize: "16px" }}>
            Tailored for a <strong style={{ color: "#0f172a" }}>{userProfile.riskTolerance}</strong> risk tolerance
            with a <strong style={{ color: "#0f172a" }}>{userProfile.investmentHorizon}</strong> horizon.
          </p>
        ) : (
          <div style={{ padding: "15px", background: "#fff7ed", border: "1px solid #ffedd5", borderRadius: "10px", color: "#9a3412" }}>
            Please <Link to="/profile" style={{ fontWeight: "bold", color: "#c2410c" }}>complete your profile</Link> to see assets matching your financial goals.
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "#f8fafc", borderRadius: "20px" }}>
          <h3 style={{ color: "#0f172a" }}>No perfect matches found.</h3>
          <p style={{ color: "#64748b" }}>Try adjusting your risk tolerance or monthly capacity in your profile.</p>
          <Link to="/profile">
            <button style={{ marginTop: "20px", padding: "10px 25px", background: "#0f172a", color: "white", borderRadius: "8px", border: "none", cursor: "pointer" }}>
              Edit Profile
            </button>
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "25px",
          }}
        >
          {filtered.map((product) => (
            <div
              key={product.id}
              className="card"
              style={{
                border: "1px solid #e2e8f0",
                padding: "25px",
                borderRadius: "16px",
                background: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    color: "#16a34a",
                    background: "#f0fdf4",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    border: "1px solid #bbf7d0",
                  }}
                >
                  {product.category}
                </span>
                <h3 style={{ margin: "15px 0", fontSize: "1.2rem", color: "#0f172a" }}>{product.title}</h3>

                <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0", padding: "15px", background: "#f8fafc", borderRadius: "12px" }}>
                  <div>
                    <small style={{ color: "#94a3b8", fontWeight: "600", display: "block" }}>Annual Yield</small>
                    <div style={{ fontSize: "20px", fontWeight: "bold", color: "#16a34a" }}>
                      {product.expectedReturn}%
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <small style={{ color: "#94a3b8", fontWeight: "600", display: "block" }}>Risk Level</small>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "800",
                        color: product.riskLevel === "low" ? "#16a34a" : product.riskLevel === "medium" ? "#d97706" : "#e11d48",
                      }}
                    >
                      {product.riskLevel.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "auto" }}>
                <p style={{ fontSize: "14px", color: "#475569", marginBottom: "15px" }}>
                  <strong>Min Investment:</strong> PKR {product.minInvestment.toLocaleString()}
                </p>
                <Link to={`/product/${product.id}`}>
                  <button
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "#0f172a",
                      color: "white",
                      borderRadius: "10px",
                      border: "none",
                      fontWeight: "700",
                      cursor: "pointer",
                    }}
                  >
                    View Analysis
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
