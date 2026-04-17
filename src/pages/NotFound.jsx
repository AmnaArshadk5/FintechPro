console.log("NotFound loaded");
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh",
      padding: "40px 20px"
    }}>
      <div style={{
        textAlign: "center",
        maxWidth: "500px"
      }}>
        <div style={{
          fontSize: "80px",
          fontWeight: "900",
          background: "linear-gradient(135deg, #16a34a, #22c55e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "20px"
        }}>
          404
        </div>
        
        <h1 style={{
          fontSize: "32px",
          fontWeight: "900",
          color: "#0f172a",
          margin: "0 0 12px 0"
        }}>
          Page Not Found
        </h1>

        <p style={{
          fontSize: "16px",
          color: "#64748b",
          margin: "0 0 20px 0",
          lineHeight: "1.6"
        }}>
          We couldn't find the page you're looking for. It might not exist or has been moved.
        </p>

        <div style={{
          background: "#f8fafc",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "24px",
          border: "1px solid #e2e8f0"
        }}>
          <p style={{
            fontSize: "14px",
            color: "#475569",
            margin: "0",
            fontFamily: "monospace"
          }}>
            URL: <strong>{window.location.pathname}</strong>
          </p>
        </div>

        <div style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <Link to="/">
            <button style={{
              padding: "12px 28px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "15px",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => e.target.style.background = "#15803d"}
            onMouseOut={(e) => e.target.style.background = "#16a34a"}
            >
              🏠 Go to Home
            </button>
          </Link>
          <Link to="/products">
            <button style={{
              padding: "12px 28px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "15px",
              transition: "all 0.3s"
            }}
            onMouseOver={(e) => e.target.style.background = "#2563eb"}
            onMouseOut={(e) => e.target.style.background = "#3b82f6"}
            >
              📈 Browse Products
            </button>
          </Link>
        </div>

        <div style={{
          marginTop: "40px",
          padding: "20px",
          background: "#fff7ed",
          borderRadius: "12px",
          border: "1px solid #fed7aa"
        }}>
          <p style={{
            fontSize: "13px",
            color: "#92400e",
            margin: "0"
          }}>
            💡 <strong>Tip:</strong> Try exploring from the navigation menu above to find what you're looking for.
          </p>
        </div>
      </div>
    </div>
  );
  
}