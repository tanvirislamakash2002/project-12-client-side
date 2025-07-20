import React from 'react';
import Navbar from '../component/shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../component/shared/Footer';
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
    return (
        <div>
            <header className=''>
                <Navbar></Navbar>
            </header>
            <main className='pt-16 min-h-[calc(100vh-337px)]'>
                <Outlet></Outlet>
                <ToastContainer />
            </main>
            <footer className=''>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;