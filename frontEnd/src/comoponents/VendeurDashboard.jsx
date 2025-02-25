import React, { useState, useEffect } from "react";
import axios from "axios";

const VendeurDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: null ,description:""});
  const vendeurId = localStorage.getItem("vendeurId");

  useEffect(() => {
    if (vendeurId) {
      axios.get(`http://localhost:5000/api/products/vendeur/${vendeurId}`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.error("Erreur lors de la récupération des produits:", error));

      axios.get(`http://localhost:5000/api/orders/vendeur/${vendeurId}`)
        .then((response) => setOrders(response.data))
        .catch((error) => console.error("Erreur lors de la récupération des commandes:", error));
    }
  }, [vendeurId]);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleDescChange = (e) => {
    setNewProduct({ ...newProduct, description: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!vendeurId) {
      alert("Erreur : vendeurId non trouvé !");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);
    formData.append("description", newProduct.description);
    formData.append("vendeurId", vendeurId);

    try {
      const response = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: "", price: "", image: null });
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };

  const handleOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status });
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        ) 
      );
      if (status === "confirmé") {
        // Rediriger la commande vers le dashboard du livreur
        await axios.post(`http://localhost:5000/api/livreur/orders`, { orderId });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la commande:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="text-2xl font-extrabold text-green-600 mb-6 text-center">Tableau de Bord Vendeur</h2>

      {/* Formulaire d'ajout de produit */}
      <form
        onSubmit={addProduct}
        className="bg-white shadow-lg border rounded-lg p-4 mb-10 max-w-md mx-auto"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Ajouter un produit</h3>
        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={newProduct.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={newProduct.price}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="border p-2 w-full mb-4 rounded focus:ring-2 focus:ring-green-400"
          required
        />
         <input
          type="text"
          name="description"
          onChange={handleDescChange}
          className="border p-2 w-full mb-4 rounded focus:ring-2 focus:ring-green-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-400"
        >
          Ajouter
        </button>
      </form>

      {/* Liste des produits */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Vos produits</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {products.map((product) => (
          <div key={product._id} className="bg-white border p-4 rounded shadow hover:shadow-md">
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.name}
              className="w-full h-32 object-cover rounded mb-3"
            />
            <h4 className="text-lg font-bold text-gray-700">{product.name}</h4>
            <p className="text-green-600 font-semibold">${product.price}</p>
            <button
              onClick={() => deleteProduct(product._id)}
              className="w-full bg-red-500 text-white py-1 mt-3 rounded hover:bg-red-400"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      {/* Tableau des commandes */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Commandes en attente</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Client</th>
              <th className="p-3 border">Produit</th>
              <th className="p-3 border">Quantité</th>
              <th className="p-3 border">Prix total</th>
              <th className="p-3 border">Statut</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-3 border">{order.clientName}</td>
                <td className="p-3 border">{order.productName}</td>
                <td className="p-3 border">{order.quantity}</td>
                <td className="p-3 border">${order.totalPrice}</td>
                <td className="p-3 border font-medium text-gray-700">{order.status}</td>
                <td className="p-3 border space-x-2">
                  <button
                    onClick={() => handleOrderStatus(order._id, "confirmé")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-400"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={() => handleOrderStatus(order._id, "refusé")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                  >
                    Refuser
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendeurDashboard;
