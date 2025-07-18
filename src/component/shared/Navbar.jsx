import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import logo from '../../assets/Logo/logoH.png'; // use only your logo image

const Navbar = () => {
  const { user, signOutUser } = useAuth();
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
        navigate('/');
      })
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/allDonations">All Donations</NavLink></li>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Start */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-40">
              {navLinks}
            </ul>
          </div>

          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* End */}
        <div className="navbar-end space-x-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium">{user.displayName}</p>
              </div>
              <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                <img
                  src={user.photoURL || 'https://i.ibb.co/2nF9mZh/default-avatar.png'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-primary"
                />
              </div>
              <button onClick={handleSignOut} className="btn btn-outline btn-sm">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
