import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { FaHome, FaPlusCircle, FaHandsHelping, FaTimes, FaSignOutAlt, FaUserCheck } from 'react-icons/fa';
import Logo from '../component/shared/Logo';
import useAuth from '../hooks/useAuth';
import { ToastContainer } from 'react-toastify';

const DashboardLayout = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOutUser()
            .then(() => navigate('/login'))
            .catch(error => console.error('Logout error:', error));
    };
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar (mobile only) */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Dashboard</div>
                </div>

                {/* Page content */}
                <Outlet />
                <ToastContainer />
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 relative">
                    {/* Close Button (visible on all screens) */}
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-ghost btn-circle absolute right-2 top-2 lg:hidden"
                    >
                        <FaTimes className="text-lg" />
                    </label>
                    <Logo></Logo>
                    {/* Sidebar Links */}
                    <li>
                        <NavLink to="/">
                            <FaHome className="inline-block mr-2" />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myDonations">
                            <FaHandsHelping className="inline-block mr-2" />
                            My Donations
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addDonation">
                            <FaPlusCircle className="inline-block mr-2" />
                            Add Donation
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/requestCharityRole">
                            <FaUserCheck className="inline-block mr-2" />
                            Request Charity Role
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageRoleRequests">
                            <FaUserCheck className="inline-block mr-2" />
                            Manage Role Request
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/transactionHistory">
                            <FaUserCheck className="inline-block mr-2" />
                            Transaction History
                        </NavLink>
                    </li>
                    <li className="mt-auto border-t pt-2">
                        <button onClick={handleSignOut} className="hover:bg-base-300 rounded-lg text-red-600 bg-primary/30">
                            <FaSignOutAlt className="inline-block mr-2" />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;