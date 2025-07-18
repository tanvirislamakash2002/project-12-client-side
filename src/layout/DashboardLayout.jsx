import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import {
  FaHome, FaPlusCircle, FaHandsHelping, FaSignOutAlt, FaUserCheck, FaUsersCog,
  FaUserTag, FaMoneyCheckAlt, FaHandHoldingUsd, FaStarHalfAlt, FaHeart,
  FaClipboardList, FaTasks, FaUserShield, FaUser, FaStar, FaBoxOpen
} from 'react-icons/fa';
import { IoIosStats } from 'react-icons/io';
import { FaBoxesPacking } from 'react-icons/fa6';
import Logo from '../component/shared/Logo';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { ToastContainer } from 'react-toastify';
import logo from '../assets/Logo/logoH.png'

const SidebarLink = ({ to, icon: Icon, label }) => (
  <li>
    <NavLink to={to} className={({ isActive }) => isActive ? 'active-link' : ''}>
      <Icon className="inline-block mr-2" /> {label}
    </NavLink>
  </li>
);

const DashboardLayout = () => {
  const { signOutUser } = useAuth();
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => navigate('/login'))
      .catch(error => console.error('Logout error:', error));
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-200 lg:hidden px-4">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>

          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>

        <main className="p-4">
          <Outlet />
        </main>
        <ToastContainer />
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="menu bg-base-100 text-base-content w-80 p-4 min-h-full border-r border-base-300 flex flex-col">
          <Logo />

          <SidebarLink to="/" icon={FaHome} label="Home" />

          {!roleLoading && role === 'user' && (
            <>
              <div className="mt-4 mb-1 text-sm text-gray-500 uppercase">User</div>
              <SidebarLink to="/dashboard" icon={FaUser} label="My Profile" />
              <SidebarLink to="/dashboard/requestCharityRole" icon={FaUserCheck} label="Request Charity Role" />
            </>
          )}

          {!roleLoading && role === 'charity' && (
            <>
              <div className="mt-4 mb-1 text-sm text-gray-500 uppercase">Charity</div>
              <SidebarLink to="/dashboard" icon={FaUser} label="Charity Profile" />
              <SidebarLink to="/dashboard/myRequests" icon={FaClipboardList} label="My Requests" />
              <SidebarLink to="/dashboard/myPickups" icon={FaBoxesPacking} label="My Pickups" />
              <SidebarLink to="/dashboard/receivedDonations" icon={FaBoxOpen} label="Received Donations" />
            </>
          )}

          {!roleLoading && (role === 'charity' || role === 'user') && (
            <>
              {/* <div className="mt-4 mb-1 text-sm text-gray-500 uppercase">Common</div> */}
              <SidebarLink to="/dashboard/transactionHistory" icon={FaMoneyCheckAlt} label="Transaction History" />
              <SidebarLink to="/dashboard/myReviews" icon={FaStarHalfAlt} label="My Reviews" />
              <SidebarLink to="/dashboard/favorites" icon={FaHeart} label="Favorites" />
            </>
          )}

          {!roleLoading && role === 'restaurant' && (
            <>
              <div className="mt-4 mb-1 text-sm text-gray-500 uppercase">Restaurant</div>
              <SidebarLink to="/dashboard" icon={FaUser} label="Restaurant Profile" />
              <SidebarLink to="/dashboard/donationStats" icon={IoIosStats} label="Donation Stats" />
              <SidebarLink to="/dashboard/myDonations" icon={FaHandsHelping} label="My Donations" />
              <SidebarLink to="/dashboard/addDonation" icon={FaPlusCircle} label="Add Donation" />
              <SidebarLink to="/dashboard/requestedDonations" icon={FaTasks} label="Requested Donations" />
            </>
          )}

          {!roleLoading && role === 'admin' && (
            <>
              <div className="mt-4 mb-1 text-sm text-gray-500 uppercase">Admin</div>
              <SidebarLink to="/dashboard" icon={FaUser} label="Admin Profile" />
              <SidebarLink to="/dashboard/manageDonations" icon={FaHandHoldingUsd} label="Manage Donations" />
              <SidebarLink to="/dashboard/manageUsers" icon={FaUsersCog} label="Manage Users" />
              <SidebarLink to="/dashboard/manageRoleRequests" icon={FaUserTag} label="Manage Role Requests" />
              <SidebarLink to="/dashboard/manageRequests" icon={FaClipboardList} label="Manage Requests" />
              <SidebarLink to="/dashboard/featureDonations" icon={FaStar} label="Feature Donations" />
            </>
          )}

          <div className="mt-auto pt-4 border-t">
            <button onClick={handleSignOut} className="btn w-full btn-ghost text-red-600">
              <FaSignOutAlt className="inline-block mr-2" /> Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
