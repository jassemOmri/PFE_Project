const Product = require("../models/product");

// 📌 **Obtenir tous les produits**
exports.getProducts = async (req, res) => {
  try {


    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// 📌 **Obtenir les produits d'un vendeur spécifique**
exports.getProductsByVendeur = async (req, res) => {
  try {
    const { vendeurId } = req.params;
    const products = await Product.find({ vendeurId });

    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// 📌 **Ajouter un produit**
exports.addProduct = async (req, res) => {
  try {
      console.log("Données reçues :", req.body);
    const { name, price, vendeurId } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!vendeurId) {
      return res.status(400).json({ success: false, message: "vendeurId est requis" }); // ✅ Vérification
    }

    if (!image) {
      return res.status(400).json({ success: false, message: "L'image est requise" });
    }

    const newProduct = new Product({ name, price, image, vendeurId });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// 📌 **Supprimer un produit**
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Produit non trouvé" });
    }

    res.json({ success: true, message: "Produit supprimé avec succès", productId });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
