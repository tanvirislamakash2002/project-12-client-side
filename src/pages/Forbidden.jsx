import { Link } from "react-router";
import { FaLock } from "react-icons/fa"; 

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <FaLock className="w-16 h-16 text-red-500 mb-4" /> 
      <h1 className="text-6xl font-bold text-red-600 mb-2">403</h1>
      <h2 className="text-3xl font-semibold mb-2">Forbidden</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Sorry, you don’t have permission to access this page.
        Please contact an administrator if you believe this is a mistake.
      </p>
      <Link
        to="/"
        className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Forbidden;
