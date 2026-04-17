import { useEffect, useState } from "react";
import { PortfolioContext } from "./PortfolioContextValue";

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(() => {
    const saved = localStorage.getItem("fintech_portfolio");
    if (!saved) {
      return { items: [] };
    }

    try {
      const parsed = JSON.parse(saved);
      return parsed?.items ? parsed : { items: Array.isArray(parsed) ? parsed : [] };
    } catch (error) {
      console.error("Failed to parse portfolio", error);
      return { items: [] };
    }
  });

  useEffect(() => {
    localStorage.setItem("fintech_portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  const addToPortfolio = (product, investedAmount) => {
    setPortfolio((prev) => {
      const exists = prev.items.find((item) => item.id === product.id);
      if (exists) {
        return prev;
      }

      const newItem = {
        ...product,
        amount: Number(investedAmount) || product.minInvestment,
      };

      return {
        items: [...prev.items, newItem],
      };
    });
  };

  const removeFromPortfolio = (productId) => {
    setPortfolio((prev) => ({
      items: prev.items.filter((item) => item.id !== productId),
    }));
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, addToPortfolio, removeFromPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}
