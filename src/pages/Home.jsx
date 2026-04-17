import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mapToFinancialProduct } from "../utils/financialMapper";
import rawProductsData from "../data/products.json";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const featured = rawProductsData.slice(0, 4).map(mapToFinancialProduct);
    setFeaturedProducts(featured);
  }, []);

  return (
    <div className="container">
      <div style={heroSectionStyle}>
        <h1 style={{ fontSize: "3rem", marginBottom: "15px", fontWeight: "900" }}>
          The Future of <span style={{ color: "#4ade80" }}>Investing</span>
        </h1>
        <p style={{ fontSize: "1.25rem", opacity: 0.9, maxWidth: "700px", margin: "0 auto" }}>
          Tailored financial opportunities. Data-driven insights. Built for your growth.
        </p>

        <Link to="/profile">
          <button className="btn-primary" style={{ marginTop: "30px", padding: "18px 40px" }}>
            Build Your Investor Profile
          </button>
        </Link>
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "60px", flexWrap: "wrap" }}>
        {[
          { name: "Savings", value: "savings", icon: "🏦" },
          { name: "Investment", value: "investment", icon: "📈" },
          { name: "Insurance", value: "insurance", icon: "🛡️" },
          { name: "Crypto", value: "crypto", icon: "₿" }
        ].map(cat => (
          <Link
            key={cat.name}
            to={`/products?category=${cat.value}`}
            className="card"
            style={{ flex: 1, textAlign: "center", minWidth: "150px", padding: "30px 20px" }}
          >
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>{cat.icon}</div>
            <div style={{ fontWeight: "800", color: "#0f172a" }}>{cat.name}</div>
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "30px" }}>
        <div>
          <h2 style={{ margin: 0, fontWeight: "900", color: "#0f172a" }}>Featured Opportunities</h2>
          <p style={{ color: "#64748b", margin: "5px 0 0" }}>Handpicked assets for your portfolio</p>
        </div>
        <Link to="/products" style={{ color: "#16a34a", fontWeight: "800", textDecoration: "none" }}>
          View Marketplace →
        </Link>
      </div>

      <div className="product-grid">
        {featuredProducts.map(p => (
          <Link to={`/product/${p.id}`} key={p.id} className="card">
            <div className={`risk-badge ${p.riskLevel}`}>{p.riskLevel} Risk</div>
            
            <div style={{ height: "140px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
               <img src={p.image} style={{ maxWidth: "80%", maxHeight: "100%", objectFit: "contain" }} alt={p.title} />
            </div>
            
            <h4 style={{ margin: "0 0 10px 0", fontSize: "16px", color: "#0f172a", fontWeight: "800" }}>
              {p.title}
            </h4>
            
            <div style={{ marginTop: "auto" }}>
              <p style={{ color: "#16a34a", fontWeight: "900", fontSize: "1.2rem", margin: "10px 0" }}>
                PKR {p.minInvestment.toLocaleString()}
              </p>
              <small style={{ color: "#94a3b8", fontWeight: "700" }}>MINIMUM CAPITAL</small>
            </div>
          </Link>
        ))}
      </div>

      <div className="stats-grid" style={{ marginTop: "80px" }}>
        <div className="stat-item" style={{ textAlign: "center" }}>
          <h3 className="stat-value" style={{ margin: 0 }}>20+</h3>
          <p style={{ margin: "5px 0 0", color: "#64748b", fontWeight: "600" }}>Verified Products</p>
        </div>
        <div className="stat-item" style={{ textAlign: "center" }}>
          <h3 className="stat-value" style={{ margin: 0 }}>Live</h3>
          <p style={{ margin: "5px 0 0", color: "#64748b", fontWeight: "600" }}>Market Integration</p>
        </div>
        <div className="stat-item" style={{ textAlign: "center" }}>
          <h3 className="stat-value" style={{ margin: 0 }}>Bank-Level</h3>
          <p style={{ margin: "5px 0 0", color: "#64748b", fontWeight: "600" }}>Encryption</p>
        </div>
      </div>
    </div>
  );
}


const heroSectionStyle = {
  background: "#0f172a", 
  color: "white",
  padding: "80px 40px",
  borderRadius: "32px",
  textAlign: "center",
  marginBottom: "60px",
  marginTop: "&0px",
  backgroundImage: "radial-gradient(circle at top right, #16a34a33, transparent), radial-gradient(circle at bottom left, #16a34a22, transparent)",
  boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.3)"
};