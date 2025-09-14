import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaCamera, 
  FaEye, 
  FaEyeSlash, 
  FaGoogle,
  FaCheck,
  FaTimes,
  FaUpload,
  FaUserPlus,
  FaHeart,
  FaUtensils
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaShield } from 'react-icons/fa6';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import imageCompression from 'browser-image-compression';

const Register = () => {
  const { updateUser, createUser, signInWithGoogle } = useAuth();
  const axiosInstance = useAxios()

  const [showPassword, setShowPassword] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [hostedImageUrl, setHostedImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const password = watch('password');

  // Password validation helpers
  const validatePassword = (value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasMinLength = value?.length >= 6;

    return {
      hasUpperCase,
      hasSpecialChar,
      hasMinLength
    };
  };

  const passwordValidation = password ? validatePassword(password) : {};

  const mutation = useMutation({
    mutationFn: async ({ name, email, password, photoURL }) => {
      await createUser(email, password);
      await updateUser({ displayName: name, photoURL });
      return axiosInstance.post('/register-user', { name, email, photoURL });
    },
    onSuccess: () => {
      Swal.fire({ title: 'Registration Successful', timer: 1400, icon: 'success' });
      navigate(from);
    },
    onError: (error) => {
      Swal.fire({
        title: 'Registration Failed',
        text: error?.response?.data?.error || error.message,
        icon: 'error'
      });
    }
  });

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    mutation.mutate({ name, email, password, photoURL: hostedImageUrl });
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];

    console.log(imageFile)
    if (!imageFile) return;

    try {
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(imageFile, options);
      const localPreviewUrl = URL.createObjectURL(compressedFile);
      setPreviewImage(localPreviewUrl);

      setProcessing(true); 
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('image', compressedFile);

      const res = await axiosInstance.post('/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
          }
        },
        timeout: 180000,
      });

      const url = res.data?.data?.url;

      if (!url) throw new Error('Image URL not returned');

      setHostedImageUrl(url);
      setProcessing(false);
      setUploading(false); 
    } catch (err) {
      console.error('Upload error:', err);
      Swal.fire('Upload Failed', 'Could not upload image', 'error');
      setPreviewImage('');
      setHostedImageUrl('');
      setProcessing(false);
      setUploading(false);
      setUploadProgress(0);
    }
  };

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
  
    // const onSubmit = (data) => {
    //   emailLoginMutation.mutate(data);
    // };
  
    const handleSignInWithGoogle = () => {
      googleLoginMutation.mutate();
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F9F9] to-[#E2E8F0] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        
        {/* Left Side - Branding & Benefits */}
        <div className="bg-gradient-to-br from-[#2E5941] to-[#38A169] p-8 lg:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10  rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10  rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-3">Join FoodBridge</h1>
              <p className="text-lg FoodFairy mb-6">
                Create your account and start making a difference in your community
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">What you can do:</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/10  rounded-lg">
                  <div className="bg-[#E28436] p-2 rounded-lg flex-shrink-0">
                    <FaHeart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Apply for Charity Status</h4>
                    <p className="text-sm">Request food donations from local restaurants to help your community</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/10  rounded-lg">
                  <div className="bg-[#F4A261] p-2 rounded-lg flex-shrink-0">
                    <FaUtensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Restaurant Partnership</h4>
                    <p className="text-sm FoodFairy">Post surplus food and connect with charities in your area</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white/10  rounded-lg">
                  <div className="bg-[#3182CE] p-2 rounded-lg flex-shrink-0">
                    <FaShield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Secure Platform</h4>
                    <p className="text-sm FoodFairy">Your data is protected with enterprise-grade security</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/10  rounded-lg">
                <p className="text-sm FoodFairy">
                  <strong>🌟 Impact:</strong> Join thousands of users who have helped redistribute over 50,000 meals to those in need.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="p-8 lg:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1A202C] mb-2">Create Account</h2>
            <p className="text-[#3D4451]">Join our community and start making a difference</p>
          </div>

          <div className="space-y-6">
            {/* Profile Photo Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-[#1A202C]">Profile Photo</span>
              </label>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-20 h-20 rounded-full object-cover border-4 border-[#E2E8F0]" 
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#E2E8F0] border-4 border-[#E2E8F0] flex items-center justify-center">
                      <FaUser className="w-8 h-8 text-[#3D4451]" />
                    </div>
                  )}
                  
                  {uploading && (
                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-white text-xs font-bold">{uploadProgress}%</div>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                    disabled={uploading || processing}
                  />
                  <label 
                    htmlFor="photo-upload"
                    className={`btn btn-outline border-[#E2E8F0] hover:bg-[#2E5941] hover:border-[#2E5941] hover:text-white ${
                      uploading || processing ? 'btn-disabled' : ''
                    }`}
                  >
                    <FaCamera className="w-4 h-4" />
                    {uploading ? 'Uploading...' : processing ? 'Processing...' : 'Choose Photo'}
                  </label>
                  <p className="text-xs text-[#3D4451] mt-1">
                    JPG, PNG or GIF (max 5MB)
                  </p>
                </div>
              </div>

              {uploading && (
                <div className="mt-3">
                  <div className="w-full bg-[#E2E8F0] rounded-full h-2">
                    <div
                      className="bg-[#2E5941] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-center mt-1 text-[#3D4451]">
                    {processing ? 'Processing image...' : `Uploading: ${uploadProgress}%`}
                  </p>
                </div>
              )}
            </div>

            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-[#1A202C]">Full Name</span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3D4451] w-4 h-4" />
                <input
                  {...register('name', { 
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters"
                    }
                  })}
                  type="text"
                  className="input input-bordered w-full pl-12 bg-[#F9F9F9] border-[#E2E8F0] focus:border-[#2E5941] focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-[#E53E3E] mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-[#1A202C]">Email Address</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3D4451] w-4 h-4" />
                <input
                  {...register('email', { 
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  className="input input-bordered w-full pl-12 bg-[#F9F9F9] border-[#E2E8F0] focus:border-[#2E5941] focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-[#E53E3E] mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-[#1A202C]">Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#3D4451] w-4 h-4" />
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                    validate: {
                      hasUpperCase: value =>
                        /[A-Z]/.test(value) || 'Password must include at least one uppercase letter',
                      hasSpecialChar: value =>
                        /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must include at least one special character',
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-12 pr-12 bg-[#F9F9F9] border-[#E2E8F0] focus:border-[#2E5941] focus:outline-none"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#3D4451] hover:text-[#2E5941]"
                >
                  {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Requirements */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className={`flex items-center gap-2 text-sm ${passwordValidation.hasMinLength ? 'text-[#38A169]' : 'text-[#E53E3E]'}`}>
                    {passwordValidation.hasMinLength ? <FaCheck className="w-3 h-3" /> : <FaTimes className="w-3 h-3" />}
                    <span>At least 6 characters</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${passwordValidation.hasUpperCase ? 'text-[#38A169]' : 'text-[#E53E3E]'}`}>
                    {passwordValidation.hasUpperCase ? <FaCheck className="w-3 h-3" /> : <FaTimes className="w-3 h-3" />}
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${passwordValidation.hasSpecialChar ? 'text-[#38A169]' : 'text-[#E53E3E]'}`}>
                    {passwordValidation.hasSpecialChar ? <FaCheck className="w-3 h-3" /> : <FaTimes className="w-3 h-3" />}
                    <span>One special character</span>
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="text-sm text-[#E53E3E] mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="form-control">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  {...register('terms', { required: "You must accept the terms and conditions" })}
                  type="checkbox" 
                  className="checkbox checkbox-sm mt-1 border-[#E2E8F0] [--chkbg:#2E5941] [--chkfg:white]" 
                />
                <span className="text-sm text-[#3D4451] leading-relaxed">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#2E5941] hover:underline font-medium">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-[#2E5941] hover:underline font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="text-sm text-[#E53E3E] mt-1">{errors.terms.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || uploading || processing || !hostedImageUrl}
              className="btn bg-[#2E5941] hover:bg-[#38A169] text-white border-none w-full h-12"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : uploading ? (
                <>
                  <FaUpload className="w-4 h-4" />
                  Image Uploading...
                </>
              ) : processing ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Processing...
                </>
              ) : (
                <>
                  <FaUserPlus className="w-4 h-4" />
                  Create Account
                </>
              )}
            </button>

            <div className="divider text-[#3D4451] text-sm">OR CONTINUE WITH</div>

            {/* Google Sign Up */}
            <button
              type="button"
              onClick={handleSignInWithGoogle}
              disabled={googleLoading}
              className="btn btn-outline w-full h-12 border-[#E2E8F0] hover:bg-[#F9F9F9] hover:border-[#2E5941]"
            >
              {googleLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Connecting...
                </>
              ) : (
                <>
                  <FaGoogle className="w-4 h-4 text-[#EA4335]" />
                  Sign up with Google
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-[#3D4451]">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  state={location.state}
                  className="text-[#2E5941] hover:text-[#38A169] font-semibold hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;