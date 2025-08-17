import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import {
  FaHome, FaPlusCircle, FaHandsHelping, FaSignOutAlt, FaUserCheck, FaUsersCog,
  FaUserTag, FaMoneyCheckAlt, FaHandHoldingUsd, FaStarHalfAlt, FaHeart,
  FaClipboardList, FaTasks, FaUserShield, FaUser, FaStar, FaBoxOpen, FaChevronLeft, FaChevronRight,
  FaTachometerAlt
} from 'react-icons/fa';
import { IoIosStats } from 'react-icons/io';
import { FaBoxesPacking } from 'react-icons/fa6';
import Logo from '../component/shared/Logo';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { ToastContainer } from 'react-toastify';
import logo from '../assets/Logo/logoH.png'

const SidebarLink = ({ to, icon: Icon, label, badge = null, sidebarCollapsed }) => (
  <li className="mb-1">
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive
          ? 'bg-primary text-white shadow-lg shadow-primary/20'
          : 'hover:bg-primary/10 hover:text-primary text-neutral-600'
        }`
      }
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!sidebarCollapsed && (
        <span className="ml-3 font-medium transition-all duration-200">
          {label}
        </span>
      )}

      {!sidebarCollapsed && badge && (
        <span className="ml-auto bg-secondary text-white text-xs px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  </li>
);



const SectionHeader = ({ title, sidebarCollapsed }) => (
  !sidebarCollapsed && (
    <div className="px-4 py-3 mb-2">
      <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  )
);

const DashboardLayout = () => {
  const { signOutUser, user } = useAuth();
  const { role, roleLoading } = useUserRole();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => navigate('/login'))
      .catch(error => console.error('Logout error:', error));
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'user': return 'Donor';
      case 'charity': return 'Charity Organization';
      case 'restaurant': return 'Restaurant Partner';
      case 'admin': return 'Administrator';
      default: return 'User';
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'user': return 'badge-info';
      case 'charity': return 'badge-success';
      case 'restaurant': return 'badge-warning';
      case 'admin': return 'badge-error';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200/30">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Header */}
        <div className="navbar bg-white shadow-sm lg:hidden px-6 border-b border-base-200">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-ghost hover:bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>

          <div className="flex-1 flex justify-center">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex-none">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full border border-primary/20">
                <img
                  src={user?.photoURL || 'https://i.ibb.co/2nF9mZh/default-avatar.png'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-white shadow-sm border-b border-base-200">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">Dashboard</h1>
                <p className="text-sm text-neutral-500 mt-1">
                  Welcome back, {user?.displayName || 'User'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className={`badge ${getRoleBadgeColor(role)} badge-lg`}>
                  {getRoleDisplayName(role)}
                </div>
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full border-2 border-primary/20">
                    <img
                      src={user?.photoURL || 'https://i.ibb.co/2nF9mZh/default-avatar.png'}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 bg-base-200/30">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        <ToastContainer
          position="bottom-right"
          className="z-50"
        />
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside
          className={`bg-white shadow-xl min-h-full transition-all duration-300 flex flex-col border-r border-base-200
    ${sidebarCollapsed ? 'w-20' : 'w-72'} 
    lg:${sidebarCollapsed ? 'w-20' : 'w-80'}
  `}
        >

          {/* Sidebar Header */}
          <div className="p-6 border-b border-base-200">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div className="flex items-center gap-3">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-10 w-auto object-contain"
                  />
                </div>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="btn btn-ghost btn-sm p-2 hover:bg-primary/10"
              >
                {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
              </button>
            </div>
          </div>

          {/* User Info Card */}
          {!sidebarCollapsed && (
            <div className="p-6 border-b border-base-200">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg">
                      <img
                        src={user?.photoURL || 'https://i.ibb.co/2nF9mZh/default-avatar.png'}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutral-800 truncate">
                      {user?.displayName || 'User'}
                    </p>
                    <div className={`badge ${getRoleBadgeColor(role)} badge-sm mt-1`}>
                      {getRoleDisplayName(role)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {/* Home Link */}
              <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/" icon={FaHome} label="Back to Home" />


              {/* User Role Navigation */}
              {!roleLoading && role === 'user' && (
                <>
                  <SectionHeader sidebarCollapsed={sidebarCollapsed} title="User Dashboard" />
                  <SidebarLink
                    sidebarCollapsed={sidebarCollapsed}
                    to="/dashboard"
                    icon={FaTachometerAlt}
                    label="Dashboard"
                  />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/profile" icon={FaUser} label="My Profile" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/requestCharityRole" icon={FaUserCheck} label="Become a Charity" />
                </>
              )}

              {!roleLoading && role === 'charity' && (
                <>
                  <SectionHeader sidebarCollapsed={sidebarCollapsed} title="Charity Management" />
                  <SidebarLink
                    sidebarCollapsed={sidebarCollapsed}
                    to="/dashboard"
                    icon={FaTachometerAlt}
                    label="Dashboard"
                  />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/profile" icon={FaUser} label="Organization Profile" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/myRequests" icon={FaClipboardList} label="My Requests" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/myPickups" icon={FaBoxesPacking} label="Scheduled Pickups" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/receivedDonations" icon={FaBoxOpen} label="Received Donations" />
                </>
              )}

              {!roleLoading && (role === 'charity' || role === 'user') && (
                <>
                  <SectionHeader sidebarCollapsed={sidebarCollapsed} title="Activity & History" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/transactionHistory" icon={FaMoneyCheckAlt} label="Transactions" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/myReviews" icon={FaStarHalfAlt} label="My Reviews" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/favorites" icon={FaHeart} label="Favorites" />
                </>
              )}

              {!roleLoading && role === 'restaurant' && (
                <>
                  <SectionHeader sidebarCollapsed={sidebarCollapsed} title="Restaurant Dashboard" />
                  <SidebarLink
                    sidebarCollapsed={sidebarCollapsed}
                    to="/dashboard"
                    icon={FaTachometerAlt}
                    label="Dashboard"
                  />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/profile" icon={FaUser} label="Restaurant Profile" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/donationStats" icon={IoIosStats} label="Donation Statistics" />

                  <SectionHeader sidebarCollapsed={sidebarCollapsed} title="Donation Management" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/myDonations" icon={FaHandsHelping} label="My Donations" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/addDonation" icon={FaPlusCircle} label="Add New Donation" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/requestedDonations" icon={FaTasks} label="Donation Requests" />
                </>
              )}

              {!roleLoading && role === 'admin' && (
                <>
                  <SectionHeader sidebarCollapsed={sidebarCollapsed} title="Admin Dashboard" />
                  <SidebarLink
                    sidebarCollapsed={sidebarCollapsed}
                    to="/dashboard"
                    icon={FaTachometerAlt}
                    label="Dashboard"
                  />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/profile" icon={FaUser} label="Admin Profile" />

                  <SectionHeader sidebarCollapsed={sidebarCollapsed} title="Content Management" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/manageDonations" icon={FaHandHoldingUsd} label="Manage Donations" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/featureDonations" icon={FaStar} label="Featured Donations" />

                  <SectionHeader sidebarCollapsed={sidebarCollapsed} title="User Management" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/manageUsers" icon={FaUsersCog} label="Manage Users" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/manageRoleRequests" icon={FaUserTag} label="Role Requests" />
                  <SidebarLink sidebarCollapsed={sidebarCollapsed} to="/dashboard/manageRequests" icon={FaClipboardList} label="General Requests" />
                </>
              )}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-base-200">
            <button
              onClick={handleSignOut}
              className="btn btn-ghost w-full justify-start text-error hover:bg-error/10 hover:text-error rounded-xl transition-all duration-200"
            >
              <FaSignOutAlt className="w-5 h-5 mr-3" />
              {!sidebarCollapsed && "Sign Out"}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;