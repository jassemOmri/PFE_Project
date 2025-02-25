import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Footer from "../comoponents/Footer";
import CompNavbar from "../comoponents/CompNavbar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(""); // ✅ تخزين `role` في `useState`

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));

    // 📌 **جلب `role` عند تحميل الصفحة**
    const userRole = localStorage.getItem("role");
    if (userRole) {
      setRole(userRole); // ✅ تحديث `role`
    }
  }, []);
 
  const addToCart = async (product) => {
    const acheteurId = localStorage.getItem("acheteurId");

    if (role !== "acheteur") {
      alert("Vous devez être un acheteur pour ajouter un produit au panier !");
      return;
    }

    if (!acheteurId) {
      alert("Veuillez vous connecter pour ajouter un produit au panier.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/cart/add", {
        acheteurId,
        productId: product._id,
        quantity: 1,
      });
      alert("Produit ajouté au panier !");
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
    }
  };

  return (
    <div>
        <CompNavbar/>
      <div className="min-h-screen flex flex-col justify-between">
        <div className="container mx-auto p-8 flex-1">
          <h2 className="text-2xl font-bold mb-6 text-center">Produits Disponibles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition duration-300">
                {/* 📌 **التنقل إلى صفحة تفاصيل المنتج عند الضغط على الصورة أو الاسم** */}
                <div 
                  onClick={() => navigate(`/product/${product._id}`)} 
                  className="cursor-pointer"
                >
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-3"
                  />
                  <h4 className="text-lg font-semibold mb-1">{product.name}</h4>
                  <p className="text-gray-600 mb-2">${product.price}</p>
                </div>

                {/* ✅ **إظهار زر `Ajoute` فقط إذا كان `Acheteur`** */}
                {role === "acheteur" && (
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500"
                  >
                    Ajoute
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
