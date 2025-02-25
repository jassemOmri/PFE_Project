import React, { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const acheteurId = localStorage.getItem("acheteurId");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/cart/${acheteurId}`)
      .then(response => setCart(response.data.products))
      .catch(error => console.error("Erreur de récupération du panier:", error));
  }, []);

  const removeFromCart = async (productId) => {
    await axios.post("http://localhost:5000/api/cart/remove", { acheteurId, productId });
    setCart(cart.filter(product => product.productId !== productId));
  };

  const confirmOrder = async (paymentMethod) => {
    await axios.post("http://localhost:5000/api/cart/confirm", { acheteurId, paymentMethod });
    alert("Commande confirmée !");
    setCart([]);
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">Panier</h2>

      {cart.length === 0 ? <p>Votre panier est vide.</p> : (
        <div>
          {cart.map(product => (
            <div key={product.productId} className="border p-4 rounded-lg shadow-lg flex items-center">
              <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
              <div className="ml-4">
                <h4 className="text-lg font-bold">{product.name}</h4>
                <p className="text-gray-700">${product.price} x {product.quantity}</p>
              </div>
              <button 
                onClick={() => removeFromCart(product.productId)}
                className="bg-red-500 text-white px-4 py-2 rounded-md ml-auto"
              >
                Supprimer
              </button>
            </div>
          ))}
          <p className="text-xl font-bold mt-4">Total: ${cart.reduce((acc, product) => acc + product.price * product.quantity, 0)}</p>
          <button 
            onClick={() => confirmOrder("online")}
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
          >
            Payer en ligne
          </button>
          <button 
            onClick={() => confirmOrder("cash")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 ml-2"
          >
            Payer à la livraison
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
