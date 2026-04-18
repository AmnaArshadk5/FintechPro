import { useState, useContext } from "react";
import { UserProfileContext } from "../context/UserProfileContext";
import { useNavigate } from "react-router-dom";

const riskOptions = [
  {
    value: "conservative",
    label: "Conservative",
    desc: "Prioritize capital preservation and avoid sharp volatility.",
  },
  {
    value: "moderate",
    label: "Moderate",
    desc: "Balance growth potential with a steady risk profile.",
  },
  {
    value: "aggressive",
    label: "Aggressive",
    desc: "Aim for higher returns and accept stronger market swings.",
  },
];

const liquidityOptions = [
  {
    value: "easy",
    label: "Need Quick Access",
    desc: "Withdraw anytime without meaningful lock-in.",
  },
  {
    value: "moderate",
    label: "Some Flexibility",
    desc: "Comfortable locking funds for around 1 to 2 years.",
  },
  {
    value: "locked",
    label: "Can Lock Funds",
    desc: "Willing to lock capital longer for stronger return potential.",
  },
];

export default function Profile() {
  const { profile, updateProfile } = useContext(UserProfileContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    profile || {
      name: "",
      riskTolerance: "moderate",
      investmentHorizon: "medium",
      monthlyCapacity: 50000,
      liquidityPreference: "moderate",
      investmentGoal: "",
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.riskTolerance) newErrors.riskTolerance = "Risk tolerance is required";
    if (!formData.investmentHorizon) newErrors.investmentHorizon = "Investment horizon is required";
    if (!formData.monthlyCapacity || formData.monthlyCapacity < 1000) {
      newErrors.monthlyCapacity = "Monthly capacity must be at least PKR 1,000";
    }
    if (!formData.liquidityPreference) newErrors.liquidityPreference = "Liquidity preference is required";
    if (!formData.investmentGoal) newErrors.investmentGoal = "Investment goal is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    updateProfile(formData);
    alert("Investment profile updated successfully.");
    navigate("/recommendations");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <section className="profile-page">
      <div className="profile-shell">
        <aside className="profile-intro-card">
          <span className="profile-eyebrow">Investor Setup</span>
          <h1 className="profile-title">Build a profile that matches your financial style.</h1>
          <p className="profile-subtitle">
            Tell us how you think about risk, liquidity, and long-term goals so recommendations feel more personal and practical.
          </p>

          <div className="profile-highlights">
            <div className="profile-highlight">
              <strong>Risk-aligned</strong>
              <span>Products are ranked around your comfort level.</span>
            </div>
            <div className="profile-highlight">
              <strong>Budget-aware</strong>
              <span>Monthly capacity helps narrow realistic options.</span>
            </div>
            <div className="profile-highlight">
              <strong>Goal-focused</strong>
              <span>Recommendations reflect what you are investing for.</span>
            </div>
          </div>
        </aside>

        <div className="profile-form-card">
          <div className="profile-form-header">
            <h2>Your Investor Profile</h2>
            <p>Complete the sections below to unlock tailored recommendations.</p>
          </div>

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-field">
              <label className="profile-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`profile-input ${errors.name ? "profile-input-error" : ""}`}
              />
              {errors.name && <span className="profile-error">{errors.name}</span>}
            </div>

            <div className="profile-field">
              <label className="profile-label">Risk Tolerance</label>
              <p className="profile-help">How comfortable are you with investment volatility?</p>
              <div className="profile-option-grid">
                {riskOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`profile-option-card ${formData.riskTolerance === option.value ? "profile-option-card-active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="riskTolerance"
                      value={option.value}
                      checked={formData.riskTolerance === option.value}
                      onChange={handleChange}
                    />
                    <div>
                      <div className="profile-option-title">{option.label}</div>
                      <div className="profile-option-desc">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.riskTolerance && <span className="profile-error">{errors.riskTolerance}</span>}
            </div>

            <div className="profile-grid-two">
              <div className="profile-field">
                <label className="profile-label" htmlFor="investmentHorizon">Investment Horizon</label>
                <p className="profile-help">How long do you plan to keep your money invested?</p>
                <select
                  id="investmentHorizon"
                  name="investmentHorizon"
                  value={formData.investmentHorizon}
                  onChange={handleChange}
                  className={`profile-input ${errors.investmentHorizon ? "profile-input-error" : ""}`}
                >
                  <option value="">Select investment horizon</option>
                  <option value="short">Short-term (1-2 years)</option>
                  <option value="medium">Medium-term (3-5 years)</option>
                  <option value="long">Long-term (5+ years)</option>
                </select>
                {errors.investmentHorizon && <span className="profile-error">{errors.investmentHorizon}</span>}
              </div>

              <div className="profile-field">
                <label className="profile-label" htmlFor="monthlyCapacity">Monthly Investment Capacity</label>
                <p className="profile-help">How much can you invest per month? Minimum PKR 1,000.</p>
                <input
                  id="monthlyCapacity"
                  type="number"
                  name="monthlyCapacity"
                  value={formData.monthlyCapacity}
                  onChange={handleChange}
                  min="1000"
                  step="1000"
                  className={`profile-input ${errors.monthlyCapacity ? "profile-input-error" : ""}`}
                />
                {formData.monthlyCapacity ? (
                  <div className="profile-inline-note">
                    You can afford products from PKR {Number(formData.monthlyCapacity).toLocaleString()} and up.
                  </div>
                ) : null}
                {errors.monthlyCapacity && <span className="profile-error">{errors.monthlyCapacity}</span>}
              </div>
            </div>

            <div className="profile-field">
              <label className="profile-label">Liquidity Preference</label>
              <p className="profile-help">How easily do you need to access your funds?</p>
              <div className="profile-option-grid">
                {liquidityOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`profile-option-card ${formData.liquidityPreference === option.value ? "profile-option-card-active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="liquidityPreference"
                      value={option.value}
                      checked={formData.liquidityPreference === option.value}
                      onChange={handleChange}
                    />
                    <div>
                      <div className="profile-option-title">{option.label}</div>
                      <div className="profile-option-desc">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.liquidityPreference && <span className="profile-error">{errors.liquidityPreference}</span>}
            </div>

            <div className="profile-field">
              <label className="profile-label" htmlFor="investmentGoal">Primary Investment Goal</label>
              <p className="profile-help">What is your main reason for investing?</p>
              <select
                id="investmentGoal"
                name="investmentGoal"
                value={formData.investmentGoal}
                onChange={handleChange}
                className={`profile-input ${errors.investmentGoal ? "profile-input-error" : ""}`}
              >
                <option value="">Select your primary goal</option>
                <option value="wealth">Wealth Building</option>
                <option value="retirement">Retirement Planning</option>
                <option value="emergency">Emergency Fund</option>
                <option value="purchase">Specific Purchase</option>
                <option value="income">Passive Income</option>
              </select>
              {errors.investmentGoal && <span className="profile-error">{errors.investmentGoal}</span>}
            </div>

            {formData.name && (
              <div className="profile-preview">
                <strong>Profile Preview</strong>
                <p>
                  {formData.name} is a {formData.riskTolerance} investor with PKR {Number(formData.monthlyCapacity || 0).toLocaleString()} monthly capacity.
                </p>
              </div>
            )}

            <button type="submit" className="profile-submit">
              Save Profile and Get Recommendations
            </button>

            <p className="profile-footer-note">
              Your profile helps us recommend products suited to your financial goals.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
