import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../comoponents/Navbar";
import Footer from "./Footer";

const ProductDetails = () => {
  const { id } = useParams(); // ✅ جلب معرف المنتج من الـ URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Erreur de chargement du produit:", error));
  }, [id]);

  if (!product) return <p>Chargement...</p>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} className="w-full h-64 object-cover rounded-md mb-4" />
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
