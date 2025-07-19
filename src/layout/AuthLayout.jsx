import { Outlet } from 'react-router';
import Logo from '../component/shared/Logo';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="py-4 px-6">
        <Logo />
      </div>
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthLayout;
