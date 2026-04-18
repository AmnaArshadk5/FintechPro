import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Recommendations from "./pages/Recommendations";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound.jsx";

import { UserProfileProvider } from "./context/UserProfileContext";
import { PortfolioProvider } from "./context/PortfolioContext";

function App() {
  return (
    <UserProfileProvider>
      <PortfolioProvider>
        <BrowserRouter 
          basename={import.meta.env.BASE_URL}
          future={{ 
            v7_startTransition: true, 
            v7_relativeSplatPath: true 
          }}
        >
          <Navbar />

          <main className="app-main" style={{ minHeight: "80vh", display: "flex", flexDirection: "column" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              
              <Route path="/products" element={<Products />} />
              
              <Route path="/product/:id" element={<ProductDetail />} />
              
              <Route path="/profile" element={<Profile />} />
              
              <Route path="/recommendations" element={<Recommendations />} />
              
              <Route path="/portfolio" element={<Portfolio />} />

              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
          
        </BrowserRouter>
      </PortfolioProvider>
    </UserProfileProvider>
  );
}

export default App;
