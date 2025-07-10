import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../component/shared/Logo';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
    return (
        <div className="">
            <Logo></Logo>
            <div className=' flex items-center h-screen'>
                <Outlet></Outlet>
                <ToastContainer />
            </div>
        </div>
    );
};

export default AuthLayout;