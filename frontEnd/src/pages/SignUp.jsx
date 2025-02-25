import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../comoponents/Navbar";
import Footer from "../comoponents/Footer";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.role) {
      setError("Veuillez sélectionner un rôle !");
      return;
    }

    try {
      await axios.post("http://localhost:5000/auth/signup", formData);
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setError("Erreur d'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-green-600 mb-6 text-center">Créer un compte</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Nom complet</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Entrez votre nom complet"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Adresse email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="exemple@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="password"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-gray-700 font-medium mb-1">Type de compte</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              >
                <option value="">Choisir un rôle</option>
                <option value="livreur">Livreur</option>
                <option value="acheteur">Acheteur</option>
                <option value="vendeur">Vendeur</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-400 transition"
            >
              S'inscrire
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="text-green-500 hover:text-green-400 font-medium underline">
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SignUp;
