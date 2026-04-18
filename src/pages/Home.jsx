import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mapToFinancialProduct } from "../utils/financialMapper";
import rawProductsData from "../data/products.json";

const quickLinks = [
  {
    name: "Savings",
    value: "savings",
    tag: "Low Risk",
    className: "home-quick-card-low",
    description: "Park cash with stable, predictable yield.",
  },
  {
    name: "Investment",
    value: "investment",
    tag: "Growth",
    className: "home-quick-card-medium",
    description: "Diversify into funds, equities, and income assets.",
  },
  {
    name: "Insurance",
    value: "insurance",
    tag: "Protection",
    className: "home-quick-card-low",
    description: "Secure coverage for life, health, and property.",
  },
  {
    name: "Crypto",
    value: "crypto",
    tag: "High Vol",
    className: "home-quick-card-high",
    description: "Explore high-upside assets with higher volatility.",
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const featured = rawProductsData.slice(0, 4).map(mapToFinancialProduct);
    setFeaturedProducts(featured);
  }, []);

  return (
    <div className="home-page">
      <div className="home-container">
        <section className="home-hero">
          <div className="home-hero-copy">
            <span className="home-eyebrow">FinTechPro • Smart Discovery</span>
            <h1 className="home-title">
              Invest with clarity,
              <br />
              grow with confidence.
            </h1>
            <p className="home-subtitle">
              Build an investor profile, compare opportunities, and assemble a portfolio that matches your risk, liquidity needs, and
              goals.
            </p>

            <div className="home-hero-actions">
              <Link to="/profile" className="home-cta-link">
                <button className="btn-primary home-cta-button">Build Your Investor Profile</button>
              </Link>
              <Link to="/products" className="home-secondary-link">
                Explore the marketplace →
              </Link>
            </div>
          </div>

          <div className="home-hero-panel">
            <div className="home-hero-panel-card">
              <span className="home-panel-label">Today’s Focus</span>
              <h3>Personalised decisions, not generic picks.</h3>
              <ul className="home-panel-list">
                <li>Risk + return balanced to your tolerance</li>
                <li>Liquidity and horizon aware recommendations</li>
                <li>Portfolio summary with weighted yield</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="home-quick-links" aria-label="Quick navigation">
          {quickLinks.map((item) => (
            <Link
              key={item.value}
              to={`/products?category=${item.value}`}
              className={`home-quick-card ${item.className}`}
            >
              <div className="home-quick-card-top">
                <div className="home-quick-title">{item.name}</div>
                <div className="home-quick-tag">{item.tag}</div>
              </div>
              <p className="home-quick-link-text">{item.description}</p>
            </Link>
          ))}
        </section>

        <section>
          <div className="home-section-heading">
            <div>
              <h2>Featured Opportunities</h2>
              <p>Handpicked products to start building a strong portfolio.</p>
            </div>
            <Link to="/products" className="home-section-link">
              View Marketplace →
            </Link>
          </div>

          <div className="product-grid home-featured-grid">
            {featuredProducts.map((p) => (
              <Link to={`/product/${p.id}`} key={p.id} className="card home-product-card">
                <div className={`risk-badge ${p.riskLevel}`}>{p.riskLevel} risk</div>

                <div className="home-product-image-wrap">
                  <img className="home-product-image" src={p.image} alt={p.title} />
                </div>

                <div className="home-product-content">
                  <h4 className="home-product-title">{p.title}</h4>
                  <p className="home-product-meta">
                    Expected yield: <strong>{Number(p.expectedReturn || 0).toFixed(2)}%</strong> • Liquidity:{" "}
                    <strong>{p.liquidity}</strong>
                  </p>
                </div>

                <div className="home-product-footer">
                  <p className="home-product-price">PKR {Number(p.minInvestment || 0).toLocaleString()}</p>
                  <small className="home-product-caption">Minimum capital</small>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-stats-band" aria-label="Platform highlights">
          <div className="home-stat-card">
            <h3 className="home-stat-value">20+</h3>
            <p className="home-stat-label">Verified products</p>
            <p className="home-stat-note">Curated across risk and liquidity profiles.</p>
          </div>
          <div className="home-stat-card">
            <h3 className="home-stat-value">Live</h3>
            <p className="home-stat-label">Market signals</p>
            <p className="home-stat-note">Built for iterative product discovery.</p>
          </div>
          <div className="home-stat-card">
            <h3 className="home-stat-value">Bank-level</h3>
            <p className="home-stat-label">Data handling</p>
            <p className="home-stat-note">Local profile storage and clear consent prompts.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

