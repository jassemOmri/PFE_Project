import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"// ✅ تأكد من المسار الصحيح للمكون
import Footer from "./Footer"; // ✅ إضافة الفوتر

const CompNavbar = () => {
  const [products, setProducts] = useState([]); // ✅ تخزين جميع المنتجات
  const [filteredProducts, setFilteredProducts] = useState([]); // ✅ المنتجات المصفاة
  const navigate = useNavigate();

  // 📌 **جلب جميع المنتجات عند تحميل الصفحة**
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); // ✅ عند البداية، عرض جميع المنتجات
      })
      .catch((error) => console.error("Erreur lors du chargement des produits:", error));
  }, []);

  // 📌 **تصفية المنتجات عند الضغط على زر البحث**
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProducts(products); // ✅ إذا لم يُدخل المستخدم أي نص، يتم عرض جميع المنتجات
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) // ✅ البحث عن المنتج
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      {/* ✅ تمرير `handleSearch` إلى `Navbar` */}
      <Navbar onSearch={handleSearch} />

      <div className="min-h-screen flex flex-col justify-between">
        <div className="container mx-auto p-8 flex-1">
          <h2 className="text-2xl font-bold mb-6 text-center">Produits Disponibles</h2>

          {/* ✅ إذا لم يتم العثور على نتائج */}
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">Aucun produit trouvé</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition duration-300">
                  {/* ✅ التنقل إلى صفحة تفاصيل المنتج عند النقر عليه */}
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default CompNavbar;
