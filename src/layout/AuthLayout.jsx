import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className=' flex items-center h-screen'>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;