import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";

export default function Navbar() {
  const location = useLocation();
  const { portfolio } = useContext(PortfolioContext);
  const portfolioCount = portfolio?.items?.length || 0;

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    color: isActive(path) ? "#22c55e" : "#64748b",
    textDecoration: "none",
    fontWeight: isActive(path) ? "700" : "500",
    fontSize: "15px",
    transition: "0.3s ease",
  });

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0",
        position: "fixed",
        top: 0,
        width: "100%",
        boxSizing: "border-box",
        zIndex: 1000,
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 style={{ margin: 0, color: "#16a34a", letterSpacing: "-1px", fontWeight: "900", fontSize: "20px" }}>
          FinTech<span style={{ color: "#0f172a" }}>Pro</span>
        </h2>
      </Link>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
      >
        <Link to="/" style={linkStyle("/")}>
          Home
        </Link>
        <Link to="/products" style={linkStyle("/products")}>
          Explore
        </Link>
        <Link to="/recommendations" style={linkStyle("/recommendations")}>
          Matches
        </Link>

        <Link to="/portfolio" style={{ textDecoration: "none", position: "relative" }}>
          <span style={linkStyle("/portfolio")}>
            My Portfolio
            {portfolioCount > 0 && (
              <span
                style={{
                  display: "inline-block",
                  marginLeft: "6px",
                  background: "#22c55e",
                  color: "white",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  textAlign: "center",
                  lineHeight: "22px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  minWidth: "22px",
                }}
              >
                {portfolioCount}
              </span>
            )}
          </span>
        </Link>

        <Link to="/profile">
          <button
            style={{
              padding: "8px 22px",
              background: isActive("/profile") ? "#0f172a" : "transparent",
              color: isActive("/profile") ? "white" : "#0f172a",
              border: "2px solid #0f172a",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
              fontSize: "14px",
            }}
          >
            👤 Profile
          </button>
        </Link>
      </div>
    </nav>
  );
}

