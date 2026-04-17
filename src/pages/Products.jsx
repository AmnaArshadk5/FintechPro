import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Filterpanel from "../components/Filterpanel";
import { mapToFinancialProduct } from "../utils/financialMapper";
import { applyFilters, getFilterStats } from "../utils/filters";
import rawProductsData from "../data/products.json";

export default function Products() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get("category");

  const products = rawProductsData.map(mapToFinancialProduct);
  const [filters, setFilters] = useState({
    category: [],
    risk: [],
    minReturn: 0,
    maxReturn: 100,
    budget: 200000,
    liquidity: "all",
    timeHorizon: "all",
  });
  const [sortBy, setSortBy] = useState("relevance");

  const activeFilters = {
    ...filters,
    category: categoryFromURL ? [categoryFromURL] : filters.category,
  };

  const filtered = applyFilters(products, activeFilters);

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "return-high":
        return b.expectedReturn - a.expectedReturn;
      case "return-low":
        return a.expectedReturn - b.expectedReturn;
      case "risk-low": {
        const riskOrder = { low: 3, medium: 2, high: 1 };
        return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
      }
      case "investment-low":
        return a.minInvestment - b.minInvestment;
      case "investment-high":
        return b.minInvestment - a.minInvestment;
      default:
        return 0;
    }
  });

  const filterStats = getFilterStats(products, activeFilters);

  return (
    <div className="products-page" style={{ padding: "100px 30px 40px", maxWidth: "1400px", margin: "auto" }}>
      <header style={{ marginBottom: "30px" }}>
        <h1 style={{ color: "#0f172a", fontSize: "2rem", fontWeight: "800", marginBottom: "8px" }}>
          Financial Products Marketplace
        </h1>
        <p style={{ color: "#64748b", marginBottom: "6px" }}>
          Explore premium financial assets tailored to your risk profile and goals.
        </p>
        <div style={{ fontSize: "13px", color: "#16a34a", fontWeight: "600" }}>
          {filterStats.matchingCount} of {filterStats.totalCount} products match your filters ({filterStats.matchPercentage}%)
        </div>
      </header>

      <div className="products-layout" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "30px", alignItems: "start" }}>
        <div className="products-sidebar" style={{ position: "sticky", top: "100px" }}>
          <Filterpanel filters={activeFilters} setFilters={setFilters} />
        </div>

        <div className="products-results">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
              padding: "14px",
              background: "#f8fafc",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "600" }}>
              Showing {sorted.length} products
            </div>
            <div>
              <label style={{ fontSize: "13px", color: "#64748b", fontWeight: "600", marginRight: "8px" }}>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                <option value="relevance">Relevance</option>
                <option value="return-high">Highest Return</option>
                <option value="return-low">Lowest Return</option>
                <option value="risk-low">Lowest Risk</option>
                <option value="investment-low">Lowest Investment</option>
                <option value="investment-high">Highest Investment</option>
              </select>
            </div>
          </div>

          {sorted.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 40px",
                background: "#f8fafc",
                borderRadius: "16px",
                border: "2px dashed #e2e8f0",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "16px", color: "#64748b", fontWeight: "700" }}>No Matches</div>
              <h3 style={{ marginBottom: "10px", color: "#0f172a", fontWeight: "800" }}>No products found</h3>
              <p style={{ color: "#64748b", maxWidth: "400px", margin: "0 auto 24px" }}>
                Try adjusting your filters. Reduce your budget limit, broaden your risk tolerance, or select different categories.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    category: [],
                    risk: [],
                    minReturn: 0,
                    maxReturn: 100,
                    budget: 200000,
                    liquidity: "all",
                    timeHorizon: "all",
                  })
                }
                style={{
                  padding: "12px 28px",
                  background: "#0f172a",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.background = "#1e293b")}
                onMouseOut={(e) => (e.target.style.background = "#0f172a")}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {sorted.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} style={{ textDecoration: "none", color: "inherit" }}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}

          {sorted.length > 0 && (
            <div
              style={{
                marginTop: "40px",
                padding: "20px",
                background: "#f0fdf4",
                borderRadius: "12px",
                border: "1px solid #bbf7d0",
                textAlign: "center",
              }}
            >
              <p style={{ margin: "0", fontSize: "13px", color: "#166534" }}>
                <strong>Tip:</strong> Click on any product to see detailed analysis and projections. Add to portfolio to track your investments.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
