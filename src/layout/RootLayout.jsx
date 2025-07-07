import React from 'react';
import Navbar from '../component/shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../component/shared/Footer';
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='min-h-[calc(100vh-337px)]'>
                <Outlet></Outlet>
                <ToastContainer />
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;