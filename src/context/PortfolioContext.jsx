import { createContext, useState, useEffect } from "react";

export const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  // Initialize with the items array directly to simplify mapping
  const [portfolio, setPortfolio] = useState({
    items: []
  });

  useEffect(() => {
    const saved = localStorage.getItem("fintech_portfolio");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPortfolio(parsed.items ? parsed : { items: parsed });
      } catch (e) {
        console.error("Failed to parse portfolio", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fintech_portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  const addToPortfolio = (product, investedAmount) => {
    setPortfolio(prev => {
      const exists = prev.items.find(item => item.id === product.id);
      if (exists) {
        return prev; 
      }

      const newItem = {
        ...product,
        amount: Number(investedAmount) || product.minInvestment
      };

      return {
        items: [...prev.items, newItem]
      };
    });
  };

  const removeFromPortfolio = (productId) => {
    setPortfolio(prev => ({
      items: prev.items.filter(item => item.id !== productId)
    }));
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, addToPortfolio, removeFromPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
}