import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import logo from '../../assets/Logo/logoH.png';
import {  MdLightMode, MdDarkMode } from 'react-icons/md';

const Navbar = () => {
  const { user, signOutUser, darkMode, setDarkMode } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        localStorage.removeItem('access-token');
        Swal.fire({
          icon: 'success',
          title: 'Logged out successfully!',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from);
      })
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold bg-primary/10 px-4 py-2 rounded-lg transition-all duration-200"
              : "px-4 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-200"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold bg-primary/10 px-4 py-2 rounded-lg transition-all duration-200"
              : "px-4 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-200"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            isActive
              ? "text-primary font-semibold bg-primary/10 px-4 py-2 rounded-lg transition-all duration-200"
              : "px-4 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-200"
          }
        >
          Contact Us
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/allDonations"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold bg-primary/10 px-4 py-2 rounded-lg transition-all duration-200"
                  : "px-4 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-200"
              }
            >
              All Donations
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold bg-primary/10 px-4 py-2 rounded-lg transition-all duration-200"
                  : "px-4 py-2 rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-200"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-white/95 backdrop-blur-md shadow-lg fixed top-0 left-0 w-full z-50 border-b border-gray-200/50">
      <div className="navbar max-w-7xl mx-auto px-6 py-3">
        {/* Start */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-primary/10 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-3 shadow-xl bg-white rounded-xl w-64 z-40 border border-gray-100">
              {navLinks}
              {user && (
                <li className="mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={handleSignOut}
                    className="text-error hover:bg-error/10 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-1 rounded-lg group-hover:bg-primary/5 transition-colors duration-200">
              <img
                src={logo}
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1 bg-gray-50/50 rounded-full p-2">
            {navLinks}
          </ul>
        </div>

        {/* End */}
        <div className="navbar-end space-x-3">
          {/* dark mode  */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <MdLightMode className="w-5 h-5 text-yellow-400" />
            ) : (
              <MdDarkMode className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-neutral-700">Welcome back,</p>
                <p className="text-xs text-neutral-500">{user.displayName}</p>
              </div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary/20 transition-all duration-200">
                  <div className="w-11 h-11 rounded-full border-2 border-primary/20 overflow-hidden">
                    <img
                      src={user.photoURL || 'https://i.ibb.co/2nF9mZh/default-avatar.png'}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow-xl menu menu-sm dropdown-content bg-white rounded-xl w-56 border border-gray-100">
                  <li className="mb-2">
                    <div className="text-center p-2 bg-primary/5 rounded-lg">
                      <p className="font-semibold text-sm text-neutral-700">{user.displayName}</p>
                      <p className="text-xs text-neutral-500">{user.email}</p>
                    </div>
                  </li>
                  <li>
                    <Link to="/dashboard" className="px-4 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile & Settings
                    </Link>
                  </li>
                  <li className="mt-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={handleSignOut}
                      className="text-error hover:bg-error/10 px-4 py-2 rounded-lg transition-all duration-200 w-full flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="btn btn-ghost btn-sm px-6 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-full"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn btn-primary btn-sm px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;