const express = require("express");
const { addToCart, removeFromCart, confirmOrder } = require("../controllers/cartController");

const router = express.Router();

router.post("/cart/add", addToCart);
router.post("/cart/remove", removeFromCart);
router.post("/cart/confirm", confirmOrder);

module.exports = router;
