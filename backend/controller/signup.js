const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY ="mysecretkey";

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({ success: true, message: "Utilisateur enregistré avec succès !", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

