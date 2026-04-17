import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductComparison({ product, allProducts }) {
  const [showComparison, setShowComparison] = useState(false);
  const [compareWith, setCompareWith] = useState("");

  if (!showComparison) {
    return (
      <button
        onClick={() => setShowComparison(true)}
        style={{
          width: "100%",
          padding: "12px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          cursor: "pointer",
          marginTop: "10px",
          transition: "all 0.2s",
        }}
        onMouseOver={(e) => (e.target.style.background = "#2563eb")}
        onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
      >
        Compare with Another Product
      </button>
    );
  }

  const selectedProduct = allProducts.find((item) => item.id === Number.parseInt(compareWith, 10));

  if (!selectedProduct) {
    return (
      <div style={{ padding: "16px", background: "#eff6ff", borderRadius: "8px", marginTop: "10px", border: "1px solid #bfdbfe" }}>
        <h4 style={{ margin: "0 0 12px 0", color: "#1e40af" }}>Compare Products</h4>
        <select
          value={compareWith}
          onChange={(e) => setCompareWith(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #93c5fd",
            marginBottom: "10px",
            fontSize: "14px",
          }}
        >
          <option value="">Select a product to compare</option>
          {allProducts
            .filter((item) => item.id !== product.id)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} ({item.category})
              </option>
            ))}
        </select>
        <button
          onClick={() => {
            setShowComparison(false);
            setCompareWith("");
          }}
          style={{
            padding: "8px 14px",
            background: "#e0e7ff",
            color: "#1e40af",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Close
        </button>
      </div>
    );
  }

  const metrics = [
    { label: "Category", key: "category" },
    { label: "Expected Return", key: "expectedReturn", format: (value) => `${value}%` },
    { label: "Risk Level", key: "riskLevel" },
    { label: "Liquidity", key: "liquidity" },
    { label: "Time Horizon", key: "timeHorizon" },
    { label: "Minimum Investment", key: "minInvestment", format: (value) => `PKR ${value.toLocaleString()}` },
  ];

  const getBetter = (first, second, metric) => {
    const key = metric.key;

    if (key === "expectedReturn") {
      return first[key] > second[key] ? 1 : second[key] > first[key] ? 2 : 0;
    }

    if (key === "riskLevel") {
      const riskScore = { low: 3, medium: 2, high: 1 };
      return riskScore[first[key]] > riskScore[second[key]] ? 1 : riskScore[second[key]] > riskScore[first[key]] ? 2 : 0;
    }

    if (key === "minInvestment") {
      return first[key] < second[key] ? 1 : second[key] < first[key] ? 2 : 0;
    }

    return 0;
  };

  return (
    <div style={{ padding: "16px", background: "#eff6ff", borderRadius: "8px", marginTop: "10px", border: "1px solid #bfdbfe" }}>
      <h4 style={{ margin: "0 0 16px 0", color: "#1e40af" }}>Product Comparison</h4>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #93c5fd" }}>
              <th style={{ padding: "8px", fontWeight: "600", color: "#1e40af" }}>Metric</th>
              <th style={{ padding: "8px", fontWeight: "600", color: "#1e40af", background: "#dbeafe" }}>
                {product.title.substring(0, 30)}
              </th>
              <th style={{ padding: "8px", fontWeight: "600", color: "#1e40af", background: "#e0e7ff" }}>
                {selectedProduct.title.substring(0, 30)}
              </th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => {
              const better = getBetter(product, selectedProduct, metric);
              const firstValue = metric.format ? metric.format(product[metric.key]) : product[metric.key];
              const secondValue = metric.format ? metric.format(selectedProduct[metric.key]) : selectedProduct[metric.key];

              return (
                <tr key={metric.key} style={{ borderBottom: "1px solid #e0e7ff" }}>
                  <td style={{ padding: "10px", fontWeight: "600", color: "#1e40af" }}>{metric.label}</td>
                  <td
                    style={{
                      padding: "10px",
                      background: better === 1 ? "#dbeafe" : "#f0f9ff",
                      fontWeight: better === 1 ? "700" : "400",
                    }}
                  >
                    {firstValue} {better === 1 ? "Winner" : ""}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      background: better === 2 ? "#e0e7ff" : "#f0f9ff",
                      fontWeight: better === 2 ? "700" : "400",
                    }}
                  >
                    {secondValue} {better === 2 ? "Winner" : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Link to={`/product/${selectedProduct.id}`}>
          <button
            style={{
              padding: "8px 14px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            View {selectedProduct.title.substring(0, 20)}
          </button>
        </Link>
        <button
          onClick={() => {
            setShowComparison(false);
            setCompareWith("");
          }}
          style={{
            padding: "8px 14px",
            background: "#e0e7ff",
            color: "#1e40af",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Close Comparison
        </button>
      </div>
    </div>
  );
}
