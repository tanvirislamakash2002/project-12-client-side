import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome, FaPlusCircle, FaHandsHelping, FaTimes } from 'react-icons/fa'; 
import Logo from '../component/shared/Logo';

const DashboardLayout = () => {
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
                        <NavLink to="/dashboard">
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
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;