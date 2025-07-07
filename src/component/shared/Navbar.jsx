import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {

    const { user, signOutUser } = useAuth()
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state || '/'


    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const navLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/'>About Us</NavLink></li>
        <li><NavLink to='/'>Contact Us</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}

                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                    <button onClick={handleSignOut} className="btn">Logout</button>
                    :
                    <Link to='/login' className="btn">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;