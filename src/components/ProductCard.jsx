export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="card" style={{ 
      display: "flex", 
      flexDirection: "column", 
      height: "100%", 
      padding: "20px",
      textAlign: "left" 
    }}>
      <div style={{ 
        height: "120px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        borderRadius: "8px",
        marginBottom: "15px"
      }}>
        <img 
          src={product.image} 
          alt={product.title}
          style={{ maxWidth: "90px", maxHeight: "90px", objectFit: "contain" }} 
        />
      </div>

      <div style={{ marginBottom: "8px" }}>
        <span style={{
          fontSize: "11px",
          padding: "3px 10px",
          borderRadius: "20px",
          backgroundColor: "#e2e8f0",
          color: "#475569",
          fontWeight: "bold",
          textTransform: "uppercase"
        }}>
          {product.category}
        </span>
      </div>

      <h3 style={{ 
        fontSize: "1.1rem", 
        margin: "0 0 12px 0", 
        height: "2.8rem", 
        overflow: "hidden",
        lineHeight: "1.4",
        color: "#0f172a"
      }}>
        {product.title.substring(0, 45)}...
      </h3>

      <div style={{ 
        marginTop: "auto", 
        borderTop: "1px solid #f1f5f9", 
        paddingTop: "15px" 
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ margin: "0", fontSize: "12px", color: "#64748b" }}>Investment</p>
            <p style={{ 
              fontWeight: "800", 
              fontSize: "1.1rem", 
              color: "#16a34a", 
              margin: "2px 0" 
            }}>
              PKR {product.minInvestment?.toLocaleString()}
            </p>
          </div>
          
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: "0", fontSize: "12px", color: "#64748b" }}>Return</p>
            <p style={{ margin: "2px 0", fontWeight: "600", color: "#0f172a" }}>
              {product.expectedReturn}%
            </p>
          </div>
        </div>

        <p className={`risk ${product.riskLevel}`} style={{ 
          fontSize: "12px", 
          marginTop: "10px",
          fontWeight: "bold",
          letterSpacing: "0.5px"
        }}>
          ● {product.riskLevel?.toUpperCase()} RISK
        </p>
      </div>
    </div>
  );
}