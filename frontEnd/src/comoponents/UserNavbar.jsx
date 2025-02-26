import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

const UserNavbar = () => {
  const [user, setUser] = useState({ name: "", role: "" }); // ✅ تخزين معلومات المستخدم
  const navigate = useNavigate();

  useEffect(() => {
    // 📌 **جلب بيانات المستخدم من `localStorage` عند تحميل الصفحة**
    const storedName = localStorage.getItem("userName");
    const storedRole = localStorage.getItem("role");
    
    if (storedName && storedRole) {
      setUser({ name: storedName, role: storedRole });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // ✅ مسح جميع بيانات المستخدم
    navigate("/login"); // ✅ إعادة التوجيه إلى صفحة تسجيل الدخول
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50 h-auto">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* ✅ **Logo** */}
        <Link to="/" className="text-2xl font-extrabold text-green-500 hover:text-green-400 transition">
          MarketPlace
        </Link>

        {/* ✅ **معلومات المستخدم** */}
        <div className="flex items-center space-x-4">
          <PersonIcon fontSize="large" />
          <div>
            <p className="text-sm text-gray-300">{user.name}</p>
            <p className="text-xs text-green-400">{user.role}</p>
          </div>
        </div>

        {/* ✅ **زر تسجيل الخروج** */}
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <LogoutIcon />
          <span>Déconnecter</span>
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
