import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={footerWrapper}>
      <div style={footerContainer}>
        
        <div style={columnStyle}>
          <h2 style={{ color: "#22c55e", margin: "0 0 15px 0", fontWeight: "900", letterSpacing: "-1px" }}>
            FinTech<span style={{ color: "#fff" }}>Pro</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6", maxWidth: "250px" }}>
            The next generation of wealth management. Secure, smart, and tailored to your risk profile.
          </p>
        </div>

        <div style={columnStyle}>
          <h4 style={headingStyle}>Platform</h4>
          <Link to="/products" style={linkStyle}>Marketplace</Link>
          <Link to="/recommendations" style={linkStyle}>Smart Matches</Link>
          <Link to="/portfolio" style={linkStyle}>Executive Summary</Link>
        </div>


      </div>

      <div style={bottomBar}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <span>© 2026 FinTechPro Digital Investments. All rights reserved.</span>
          <div style={{ display: "flex", gap: "20px" }}>
            <span style={{ cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ cursor: "pointer" }}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


const footerWrapper = {
  background: "#0f172a", 
  color: "#fff",
  marginTop: "80px",
  borderTop: "1px solid #1e293b",
};

const footerContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "60px 20px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "40px",
};

const columnStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const headingStyle = {
  fontSize: "16px",
  fontWeight: "700",
  marginBottom: "10px",
  color: "#f8fafc",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const linkStyle = {
  color: "#94a3b8",
  textDecoration: "none",
  fontSize: "14px",
  transition: "color 0.2s ease",
};


const bottomBar = {
  background: "#020617",
  padding: "20px",
  fontSize: "12px",
  color: "#64748b",
  borderTop: "1px solid #1e293b",
};