import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.post("http://localhost:5000/auth/signup", formData);
      alert("Inscription réussie !");
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setError("Erreur d'inscription. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Créer un compte</h2>

        {error && <p className="text-red-500 text-center">{error}</p>} 

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name">Nom complet</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Adresse email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div className="mb-6">
            <label htmlFor="role">Type de compte</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required>
              <option value="">Choisir un rôle</option>
              <option value="livreur">Livreur</option>
              <option value="acheteur">Acheteur</option>
              <option value="vendeur">Vendeur</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg">S'inscrire</button>
        </form>
        
        <p className="mt-4 text-center">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="underline">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
