const defaultFilters = {
  risk: [],
  category: [],
  minReturn: 0,
  maxReturn: 100,
  budget: 200000,
  liquidity: "all",
  timeHorizon: "all",
};

export default function Filterpanel({ filters, setFilters }) {
  return (
    <div className="filters">
      <div className="filters-header">
        <h3>Filter Strategies</h3>
        <p>Refine products by risk, return, liquidity, and budget.</p>
      </div>

      <div className="filter-section">
        <h4>Risk Tolerance</h4>
        <div className="filter-options">
          {["low", "medium", "high"].map((risk) => (
            <label key={risk} className="filter-check">
              <input
                type="checkbox"
                checked={filters.risk.includes(risk)}
                onChange={(e) => {
                  const newRisk = e.target.checked
                    ? [...filters.risk, risk]
                    : filters.risk.filter((item) => item !== risk);
                  setFilters({ ...filters, risk: newRisk });
                }}
              />
              <span>{risk.charAt(0).toUpperCase() + risk.slice(1)} Risk</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Expected Return (%)</h4>
        <div className="filter-grid-two">
          <label className="filter-field">
            <span>Min</span>
            <input
              type="number"
              placeholder="0"
              value={filters.minReturn || ""}
              onChange={(e) => setFilters({ ...filters, minReturn: +e.target.value || 0 })}
            />
          </label>
          <label className="filter-field">
            <span>Max</span>
            <input
              type="number"
              placeholder="100"
              value={filters.maxReturn || ""}
              onChange={(e) => setFilters({ ...filters, maxReturn: +e.target.value || 100 })}
            />
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h4>Asset Category</h4>
        <div className="filter-options">
          {["savings", "investment", "insurance", "crypto"].map((category) => (
            <label key={category} className="filter-check">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={(e) => {
                  const newCategory = e.target.checked
                    ? [...filters.category, category]
                    : filters.category.filter((item) => item !== category);
                  setFilters({ ...filters, category: newCategory });
                }}
              />
              <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-field">
          <span>Liquidity (Fund Access)</span>
          <select
            value={filters.liquidity || "all"}
            onChange={(e) => setFilters({ ...filters, liquidity: e.target.value })}
          >
            <option value="all">All Liquidity Types</option>
            <option value="easy">Easy (Withdraw anytime)</option>
            <option value="moderate">Moderate (1-2 year lock)</option>
            <option value="locked">Locked (3+ year lock)</option>
          </select>
        </label>
      </div>

      <div className="filter-section">
        <label className="filter-field">
          <span>Investment Horizon</span>
          <select
            value={filters.timeHorizon || "all"}
            onChange={(e) => setFilters({ ...filters, timeHorizon: e.target.value })}
          >
            <option value="all">All Time Horizons</option>
            <option value="short">Short-term (1-2 years)</option>
            <option value="medium">Medium-term (3-5 years)</option>
            <option value="long">Long-term (5+ years)</option>
          </select>
        </label>
      </div>

      <div className="filter-section">
        <label className="filter-field">
          <span>Max Investment (PKR)</span>
          <input
            type="range"
            min="0"
            max="200000"
            step="5000"
            value={filters.budget || 200000}
            onChange={(e) => setFilters({ ...filters, budget: +e.target.value })}
            className="filter-range"
          />
        </label>
        <div className="filter-range-meta">
          <span>Up to</span>
          <strong>PKR {(filters.budget || 200000).toLocaleString()}</strong>
        </div>
      </div>

      <button onClick={() => setFilters(defaultFilters)} className="filters-reset">
        Clear All Filters
      </button>
    </div>
  );
}
