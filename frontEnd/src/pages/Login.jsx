import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../comoponents/Navbar";
import Footer from "../comoponents/Footer";

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
    const { success, token, role, userName, redirectUrl } = response.data;

    if (success) {
      localStorage.setItem("token", token); 
      localStorage.setItem("role", role);  // ✅ تحديث `role` مباشرة بعد تسجيل الدخول
            localStorage.setItem("userName", userName); // ✅ تخزين اسم المستخدم

      window.dispatchEvent(new Event("storage")); // ✅ إعلام `Home.jsx` بأن `role` قد تغير
      alert("Connexion réussie !");
      navigate(redirectUrl);
    }
  } catch (error) {
    setError("Email ou mot de passe incorrect !");
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-green-600 mb-6 text-center">Connexion</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-400 transition"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
