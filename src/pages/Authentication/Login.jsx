import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import loginAnimation from '../../assets/lottie/login.json';
import { useMutation } from '@tanstack/react-query';

const Login = () => {
  const { signInWithGoogle, signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';
  const axiosInstance = useAxios();

  const { register, handleSubmit, formState: { errors } } = useForm();

  // 🔐 Email Login Mutation
  const emailLoginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await axiosInstance.get(`/check-user-email?email=${email}`);
      if (!res.data.exists) throw new Error("Email doesn't exist!");
      await signInUser(email, password);
      await axiosInstance.post('/login', { email });
    },
    onSuccess: () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have successfully logged in',
        showConfirmButton: false,
        timer: 1500
      });
      navigate(from);
    },
    onError: (error) => {
      let message = "Login failed";
      if (error.code === 'auth/user-not-found') {
        message = "Email doesn't exist in Firebase";
      } else if (['auth/wrong-password', 'auth/invalid-credential'].includes(error.code)) {
        message = "Password doesn't match";
      } else {
        message = error.message || "Something went wrong";
      }
      toast.error(message);
    }
  });

  // 🔐 Google Login Mutation
  const googleLoginMutation = useMutation({
    mutationFn: async () => {
      const data = await signInWithGoogle();
      const res = await axiosInstance.get(`/check-user-email?email=${data.user.email}`);
      if (!res.data.exists) {
        await axiosInstance.post('/register-user', {
          name: data.user.displayName,
          email: data.user.email,
          photoURL: data.user.photoURL
        });
      }
      await axiosInstance.post('/login', { email: data.user.email });
    },
    onSuccess: () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have successfully logged in with Google',
        showConfirmButton: false,
        timer: 1500
      });
      navigate(from);
    },
    onError: () => {
      toast.error("Something went wrong with Google login.");
    }
  });

  const onSubmit = (data) => {
    emailLoginMutation.mutate(data);
  };

  const handleSignInWithGoogle = () => {
    googleLoginMutation.mutate();
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden grid md:grid-cols-2">
      <div className="hidden md:block bg-green-50 p-6">
        <Lottie animationData={loginAnimation} loop={true} />
      </div>

      <div className="p-10">
        <h2 className="text-4xl font-bold mb-6 text-green-900">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter email"
            />
            {errors.email && <p className="text-sm text-red-600">Email is required</p>}
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter password"
            />
            {errors.password && <p className="text-sm text-red-600">Password is required</p>}
          </div>

          <div className="text-right">
            <a className="text-sm text-green-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="btn btn-success w-full mt-2 text-white"
            disabled={emailLoginMutation.isPending}
          >
            {emailLoginMutation.isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleSignInWithGoogle}
          className="btn btn-outline w-full mb-4"
          disabled={googleLoginMutation.isPending}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2">
            <path fill="#EA4335" d="M24 9.5c3.06 0 5.81 1.1 7.97 2.9l5.94-5.94C34.52 3.58 29.57 1.5 24 1.5 14.8 1.5 7.16 7.68 4.54 16.2l6.98 5.43C13.6 15.1 18.36 9.5 24 9.5z"/>
            <path fill="#34A853" d="M4.54 16.2A23.948 23.948 0 0024 46.5c6.48 0 11.94-2.4 15.91-6.3l-6.98-5.43c-2.56 2.3-5.96 3.73-9.93 3.73-7.63 0-14.09-5.44-15.46-12.69l-7-5.43z"/>
            <path fill="#FBBC05" d="M43.91 19.8H24v8.4h11.54c-1.18 3.06-3.2 5.65-5.61 7.34l6.98 5.43c4.09-3.78 6.51-9.36 6.51-15.77 0-1.5-.18-2.95-.51-4.3z"/>
            <path fill="#4285F4" d="M24 9.5c3.06 0 5.81 1.1 7.97 2.9l5.94-5.94C34.52 3.58 29.57 1.5 24 1.5c-5.64 0-10.4 3.6-12.48 8.88l6.98 5.43C18.36 15.1 24 9.5 24 9.5z"/>
          </svg>
          {googleLoginMutation.isPending ? 'Signing in...' : 'Sign in with Google'}
        </button>

        <p className="text-sm">
          Don&apos;t have an account? <Link className="text-green-600 font-semibold" to="/register" state={location.state}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
