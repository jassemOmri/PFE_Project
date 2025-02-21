const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  vendeurId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // 🔥 Associer le produit à un vendeur
});

module.exports = mongoose.model("Product", productSchema);
