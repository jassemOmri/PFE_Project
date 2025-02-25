import React, { useState } from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom"; 

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); // ✅ تخزين نص البحث

  return (
    <div className="pt-20">
      <nav className="fixed top-0 left-0 w-full bg-white text-gray-800 shadow-md z-50 h-auto">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

          <Link to="/" className="text-2xl font-extrabold text-green-600 hover:text-green-500 transition">
            MarketPlace
          </Link>

          {/* ✅ Barre de recherche avec un bouton */}
          <div className="flex items-center flex-1 mx-6 relative">
            <input
              type="text"
              placeholder="Cherchez vos produits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // ✅ تحديث البحث
              className="w-full px-4 py-2 rounded-l-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button 
              className="bg-green-500 px-3 py-2 rounded-r-lg hover:bg-green-400 text-white"
              onClick={() => onSearch(searchTerm)} // ✅ البحث عند الضغط
            >
              <SearchIcon />
            </button>
          </div>

          {/* ✅ Liens d'authentification */}
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative text-gray-700 hover:text-green-500">
              <ShoppingCartCheckoutIcon fontSize="large" />
            </Link>

            <Link to="/signUp">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition">
                S'inscrire
              </button>
            </Link>

            <Link to="/login">
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                Se connecter
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
