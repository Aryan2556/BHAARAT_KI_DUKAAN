import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, UserPlus, LogIn, Lock, LogOut, MenuIcon, X } from 'lucide-react';

import { useUserStore } from '../stores/useUserStore';
import { useCartStore } from '../stores/useCartStore';

const categories = [
  { href: "/Clothes", name: "Clothes", imageUrl: "/Assests/Bags.jpg" },
  { href: "/Footwears", name: "Footwears", imageUrl: "/Assests/Footwears.jpg" },
  { href: "/Household", name: "Household Appliances", imageUrl: "/Assests/Household.jpg" },
  { href: "/Kitchen", name: "Kitchen Appliances", imageUrl: "/Assests/Kitchen.jpg" },
  { href: "/Medicines", name: "Medicines", imageUrl: "/Assests/Medicines.jpg" },
  { href: "/Spectacles", name: "Spectacles", imageUrl: "/Assests/Spectacles.jpg" },
  { href: "/Bags", name: "Bags", imageUrl: "/Assests/Bags.jpg" },
];

const Navbar = () => {
  const { user, logout } = useUserStore();
  const Admin = user?.role === "admin";
  const { cart } = useCartStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };


  return (
    <header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>

      <div className='container mx-auto px-4 py-3'>
        <div className='flex flex-wrap justify-between items-center'>
          <Link to='/' className='text-2xl font-bold text-emerald-400 items-center space-x-2 flex'>
            BHARAAT KI DUKAAN &nbsp;
            <img src="/indian.gif" alt="flag" className='h-10 w-[80px]' />
          </Link>

          <div className="block md:hidden">
            <button onClick={toggleMenu} className='ml-12 text-gray-300 hover:text-emerald-400'>
              {isMenuOpen ? <X size={35} /> : <MenuIcon size={35} />}

            </button>
          </div>

          <nav className='hidden md:flex flex-wrap items-center gap-4'>
            <Link to={"/"} className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'>Home</Link>
            <Link to={"/Categories"} className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'>Categories</Link>
            <Link to={"/special"} className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'>Special Items </Link>
            <Link to={"/contact"} className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'>Contact</Link>
          </nav>
          <nav className='flex flex-wrap items-center gap-4'>
            {user && (
              <Link to={"/cart"} className='relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'>
                <ShoppingCart className='inline-block mr-1 group-hover:text-emerald-400' size={20} />
                <span className='hidden sm:inline'>Cart</span>
                {cart.length > 0 && (
                  <span className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'>
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {Admin && (
              <Link className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center' to={"/secret-dashboard"}>
                <Lock className='inline-block mr-1' size={18} />
                <span className='hidden sm:inline'>Dashboard</span>
              </Link>
            )}

            {user ? (
              <button className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out' onClick={logout}>
                <LogOut size={18} />
                <span className='hidden sm:inline ml-2'>Log Out</span>
              </button>

            ) : (
              <div className='hidden md:flex flex-wrap items-center gap-4'>
                <Link to={"/signup"} className='bg-emerald-600  hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'>
                  <UserPlus className='mr-2' size={18} />
                  Sign up
                </Link>
                <Link to={"/login"} className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'>

                  <LogIn className='mr-2' size={18} />
                  Login
                </Link>
              </div>
            )}

          </nav>

          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-gray-800 p-4 md:hidden">
              <div className="flex flex-col gap-y-2">
                <Link to="/" onClick={()=>toggleMenu()} className='text-gray-300 hover:text-emerald-400 transition duration=300 ease-in-out'>Home</Link>
                <Link to="/Categories" onClick={()=>toggleMenu()} className='text-gray-300 hover:text-emerald-400 transition duration=300 ease-in-out'>Categories</Link>
                <Link to="/special" onClick={()=>toggleMenu()} className='text-gray-300 hover:text-emerald-400 transition duration=300 ease-in-out'>Special Items</Link>
                <Link to="/contact" onClick={()=>toggleMenu()} className='text-gray-300 hover:text-emerald-400 transition duration=300 ease-in-out'>Contact</Link>

                {user && (
                  <Link to="/cart" className='relative group text-gray=300 hover:text-green transition duration=300 ease-in-out' onClick={()=>toggleMenu()}>
                    <ShoppingCart className='inline-block mr=1 group-hover:text-green' size={20} />
                    Cart
                    {cart.length > 0 && (
                      <span className='absolute -top=2 -left=-2 bg-green text-white rounded-full px=2 py=.5 text-xs group-hover:bg-green transition duration=.3 ease-in-out'>
                        {cart.length}
                      </span>
                    )}
                  </Link>
                )}

                {Admin && (
                  <Link to="/secret-dashboard" className='bg-green hover:bg-dark-green text-white px=.3 py=.1 rounded-md font-medium transition duration=.3 ease-in-out flex items-center' onClick={()=>toggleMenu()}>
                    Dashboard
                  </Link>
                )}

                {user ? (
                  <button onClick={logout} className='bg-dark-gray hover:bg-darker-gray text-white py=.2 px=.4 rounded-md flex items-center transition duration=.3 ease-in-out'>
                    Log Out
                  </button>
                ) : (
                  <>
                    <Link to="/signup" onClick={()=>toggleMenu()} className='bg-emerald-600 w-fit hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out'>
                      <UserPlus className='mr-2' size={15} />
                      Sign Up
                    </Link>
                    <Link to="/login" onClick={()=>toggleMenu()} className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 w-fit ease-in-out'>
                      <LogIn className='mr-2' size={15} />
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

    </header>
  );
};

export default Navbar;