const Cart = require("../models/Cart");
const Product = require("../models/product");

// 📌 **إضافة منتج إلى السلة**
exports.addToCart = async (req, res) => {
  try {
    const { acheteurId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Produit non trouvé" });
    }

    let cart = await Cart.findOne({ acheteurId });
    if (!cart) {
      cart = new Cart({ acheteurId, products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        vendeurId: product.vendeurId,
        quantity,
      });
    }

    await cart.save();
    res.json({ success: true, message: "Produit ajouté au panier", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// 📌 **حذف منتج من السلة**
exports.removeFromCart = async (req, res) => {
  try {
    const { acheteurId, productId } = req.body;

    let cart = await Cart.findOne({ acheteurId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Panier introuvable" });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();

    res.json({ success: true, message: "Produit supprimé du panier", cart });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

// 📌 **تأكيد الطلب وإرساله للبائع**
exports.confirmOrder = async (req, res) => {
  try {
    const { acheteurId, paymentMethod } = req.body;

    const cart = await Cart.findOne({ acheteurId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Panier vide" });
    }

    // توزيع الطلبات على البائعين
    const vendeurOrders = {};
    cart.products.forEach(product => {
      if (!vendeurOrders[product.vendeurId]) {
        vendeurOrders[product.vendeurId] = [];
      }
      vendeurOrders[product.vendeurId].push(product);
    });

    // إرسال الطلب لكل بائع
    Object.keys(vendeurOrders).forEach(async vendeurId => {
      console.log(`Commande envoyée au vendeur ${vendeurId}:`, vendeurOrders[vendeurId]);
    });

    await Cart.findOneAndDelete({ acheteurId });

    res.json({ success: true, message: "Commande confirmée et envoyée aux vendeurs", paymentMethod });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
