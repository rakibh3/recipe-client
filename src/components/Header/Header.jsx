import { useState } from 'react';
import logo from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

import { BsCoin } from 'react-icons/bs';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut, googleSignIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        toast.success(`Login Successful ${result.user.displayName}`, {
          duration: 8000,
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          duration: 8000,
        });
      });
  };

  const handleGoogleLogout = () => {
    logOut()
      .then(() => {
        toast.success('Logout Successful!', {
          duration: 5000,
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          duration: 5000,
        });
      });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white sticky top-0 shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 ">
          <div className="flex-shrink-0 ">
            <NavLink to="/" className="text-2xl font-bold text-rose-600">
              <img src={logo} alt="logo" width={40} height={40} />
            </NavLink>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'text-rose-600 '
                  : 'text-gray-800 hover:text-rose-600 '
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'text-rose-600 '
                  : 'text-gray-800 hover:text-rose-600 '
              }
              to="/recipes"
            >
              Recipes
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'text-rose-600 '
                  : 'text-gray-800 hover:text-rose-600 '
              }
              to="/add-recipe"
            >
              Add-recipes
            </NavLink>
            <div className="flex gap-2 rounded-2xl p-[6px] border-2 border-rose-500 ">
              <BsCoin className="w-6 h-6 text-yellow-500" />
              <span className="text-gray-800 font-bold">100</span>
            </div>
            {user ? (
              <>
                {user?.photoURL && (
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <button
                  className="bg-rose-600 text-white font-bold py-1 px-4 rounded hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-opacity-50"
                  onClick={handleGoogleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="flex py-1 bg-rose-600 text-white font-bold  px-4 rounded hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-opacity-50"
                  onClick={handleGoogleSignIn}
                >
                  <FaGoogle className="mt-[3px] mr-1 text-gray-300" />
                  <p>Login</p>
                </button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-rose-600"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden grid items-end">
            <div className=" pt-2 pb-3 space-y-2 grid">
              <NavLink to="/">Home</NavLink>

              <NavLink to="/recipes">Recipes</NavLink>
              <NavLink to="/add-recipe">Add-recipes</NavLink>
              {/* Mobile Coin */}
              <div className="w-[90px] px-2 flex gap-2 rounded-2xl p-[6px] border-2 border-rose-500 ">
                <BsCoin className="w-6 h-6 text-yellow-500" />
                <span className="text-gray-800 font-bold">100</span>
              </div>
              {user ? (
                <div className="space-y-2">
                  {user?.photoURL && (
                    <img
                      src={user?.photoURL}
                      alt={user?.displayName}
                      className="w-20 h-20 rounded-full"
                    />
                  )}
                  <button
                    className="bg-rose-600 text-white font-bold py-2 px-4 rounded hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-opacity-50"
                    onClick={handleGoogleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="mt-[4px] bg-rose-600 text-white font-bold py-2 px-4 rounded hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-opacity-50"
                    onClick={handleGoogleSignIn}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
