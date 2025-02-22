import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await axios.post("http://localhost:5000/auth/login", formData);
    const { success, token, redirectUrl, vendeurId } = response.data; // ✅ إضافة `vendeurId`

    if (success) {
      localStorage.setItem("token", token); 
      localStorage.setItem("vendeurId", vendeurId); // ✅ حفظ `vendeurId`
      alert("Connexion réussie !");
      navigate(redirectUrl); 
    }
  } catch (error) {
    setError("Email ou mot de passe incorrect !");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Login</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>} 
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <button type="submit" className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
