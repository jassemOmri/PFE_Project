import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from "./pages/Home";
import Cart from "./pages/Cart";
 import Product from "./pages/Product";
import Contact from "./pages/Contact";
import SignUp from './pages/SignUp';
import Login from "./pages/Login";
import LivreurDashboard from "./comoponents/LivreurDashboard";
import AcheteurDashboard from "./comoponents/AcheteurDashboard";
import VendeurDashboard from "./comoponents/VendeurDashboard";
import ProductDetails from "./comoponents/ProductDetails";

const App = () => {
  return (
    <div className=''> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/signup' element={<SignUp/>}/>  



                <Route path="/login" element={<Login />} />
        <Route path="/livreur-dashboard" element={<LivreurDashboard />} />
        <Route path="/acheteur-dashboard" element={<AcheteurDashboard />} />
        <Route path="/vendeur-dashboard" element={<VendeurDashboard />} />

         <Route path="/product/:id" element={<ProductDetails />} /> {/* ✅ صفحة تفاصيل المنتج */}
      </Routes>
    </div>
  )
}

export default App