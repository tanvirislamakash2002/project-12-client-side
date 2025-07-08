import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../component/shared/Logo';

const AuthLayout = () => {
    return (
        <div className="">
            <Logo></Logo>
            <div className=' flex items-center h-screen'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;