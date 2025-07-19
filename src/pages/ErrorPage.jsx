import { Link } from "react-router";
import Lottie from "lottie-react";
import errorAnim from "../../src/assets/lottie/error.json"; // Adjust the path

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 text-center">
      <div className="max-w-md w-full mb-6">
        <Lottie animationData={errorAnim} loop={true} />
      </div>
      <h1 className="text-5xl font-bold text-gray-800 mb-2">Oops! Page Not Found</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        The page you're looking for doesn't exist, or an unexpected error has occurred.
      </p>
      <Link
        to="/"
        className="px-6 py-2 text-white rounded bg-primary hover:bg-primary-dark transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
