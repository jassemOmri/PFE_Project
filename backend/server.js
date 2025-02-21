
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");


const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Permet d'afficher les images

mongoose.connect("mongodb://127.0.0.1:27017/employee", {
}).then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

app.use("/auth", authRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 


app.use("/api", productRoutes);

app.listen(5000, () => console.log(' Server running '));
