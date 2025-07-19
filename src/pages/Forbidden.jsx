import { Link } from "react-router"; // Note: Correct router import
import Lottie from "lottie-react";
import forbiddenAnim from "../../src/assets/lottie/forbidden.json"; // adjust path as needed

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mb-12 bg-gray-50 px-4">
      <div className="max-w-sm w-full mb-6">
        <Lottie animationData={forbiddenAnim} loop={true} />
      </div>
      <h1 className="text-5xl font-bold text-red-600 mb-2">403 - Forbidden</h1>
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
