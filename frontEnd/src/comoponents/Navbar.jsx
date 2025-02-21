import React from 'react';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SearchIcon from '@mui/icons-material/Search';
const Navbar = () => {
  return (
    <div className='pt-10'>
 <nav className="fixed top-0 left-0 w-full bg-white z-50 h-auto ">
    
      <div className="container mx-auto flex  items-center ">

        <a href="/" className="text-xl font-bold text-black">
          Home
        </a>

        <div className="flex-auto mx-4"> 
          <input
            type="text"
            placeholder="cherche..."
            className=" px-4 py-2 rounded-lg bg-gray-200 text-black "
          />
         <button><SearchIcon className='flex'/></button>
        </div>

        <div className="relative">
          <a href="/cart" className="text-xl">
            <ShoppingCartCheckoutIcon/>
          </a>
        </div>

        <div className="space-x-4">
          <a href='/signUp'>
          <button  className="bg-gray-500 text-white px-4 py-2 rounded-lg border-s">
            Sign Up
          </button>
          </a>
          <a href='/login'>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg border-s">
            Login
          </button>
          </a>
        </div>
      </div>  
      
    </nav>
    </div>
  );
};

export default Navbar;