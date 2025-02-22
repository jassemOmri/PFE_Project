import React, { useState, useEffect } from "react";
import axios from "axios";

const VendeurDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: null });
  const vendeurId = localStorage.getItem("vendeurId"); // ✅ Récupérer l'ID du vendeur connecté

  // 📌 **Récupérer uniquement les produits du vendeur connecté**
  useEffect(() => {
    if (vendeurId) {
      axios.get(`http://localhost:5000/api/products/vendeur/${vendeurId}`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [vendeurId]);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const addProduct = async (e) => {

    e.preventDefault();


     const vendeurId = localStorage.getItem("vendeurId"); // ✅ نجيبو `vendeurId` متاع `vendeur` المسجل
  console.log("vendeurId envoyé :", vendeurId); // ✅ نشوفو `vendeurId` في `console`

  if (!vendeurId) {
    alert("Erreur : vendeurId غير موجود !");
    return;
  }
    
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);
    formData.append("vendeurId", vendeurId); // ✅ Associer le produit au vendeur



    try {
      const response = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts([...products, response.data]); // ✅ Mettre à jour l'affichage
      setNewProduct({ name: "", price: "", image: null }); 
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };


const deleteProduct = async (productId) => {
  try {
    await axios.delete(`http://localhost:5000/api/products/${productId}`);
    
    // ✅ Mettre à jour l'affichage en supprimant le produit localement
    setProducts(products.filter((product) => product._id !== productId));
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
  }
};



  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard Vendeur</h2>

      {/* Ajouter un produit */}
      <form onSubmit={addProduct} className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Ajouter un produit</h3>
        <input type="text" name="name" placeholder="Nom du produit" value={newProduct.name} onChange={handleChange}
          className="border p-2 w-full mb-2 rounded-md" required />
        <input type="number" name="price" placeholder="Prix" value={newProduct.price} onChange={handleChange}
          className="border p-2 w-full mb-2 rounded-md" required />
        <input type="file" onChange={handleImageChange} className="border p-2 w-full mb-4 rounded-md" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Ajouter</button>
      </form>

      {/* Affichage des produits du vendeur */}
      <h3 className="text-xl font-semibold mb-4">Vos produits</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-lg">
            <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} 
              className="w-full h-32 object-cover rounded-md mb-2" />
            <h4 className="text-lg font-bold">{product.name}</h4>
            <p className="text-gray-700">${product.price}</p>
          </div>
        ))}
      </div>

        {products.map((product) => (
  <div key={product._id} className="border p-4 rounded-lg shadow-lg">
    <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} 
      className="w-full h-32 object-cover rounded-md mb-2" />
    <h4 className="text-lg font-bold">{product.name}</h4>
    <p className="text-gray-700">${product.price}</p>
    <button 
      onClick={() => deleteProduct(product._id)} 
      className="bg-red-500 text-white px-4 py-2 rounded-md mt-2">
      Supprimer
    </button>
  </div>
))}


    </div>
  );
};

export default VendeurDashboard;
