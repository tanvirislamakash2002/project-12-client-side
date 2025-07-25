import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../assets/lottie/register.json';
import { useMutation } from '@tanstack/react-query';
import imageCompression from 'browser-image-compression';

const Register = () => {
  const { createUser, updateUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || '/';
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [hostedImageUrl, setHostedImageUrl] = useState('');
  const axiosInstance = useAxios();

  const { register, handleSubmit, formState: { errors } } = useForm();

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

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100 px-4">

      <div className="w-full lg:w-1/2 flex justify-center items-center mb-10 lg:mb-0">
        <Player
          autoplay
          loop
          src={animationData}
          className="w-full max-w-md"
        />
      </div>

      {/* Register Form */}
      <div className="w-full lg:w-1/2 max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Photo Upload */}
          <div>
            <label className="block font-medium mb-1">Profile Photo</label>
            {previewImage && (
              <div className="my-2">
                <img src={previewImage} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
              </div>
            )}
            {uploading && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-green-600 h-3 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-center mt-1 text-gray-600">
                  Uploading to server: {uploadProgress}% (wait for hosting...)
                </p>
              </div>
            )}
            <input
              type="file"
              onChange={handleImageUpload}
              className="file-input w-full"
            />
            {errors?.photo && <span className="text-red-600">Photo is required</span>}
          </div>

          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              {...register('name', { required: true })}
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            {errors?.name && <span className="text-red-600">Name is required</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            {errors?.email && <span className="text-red-600">Email is required</span>}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
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
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must include at least one special character (for example: ! @ # $ % ^ & * ( ) , . ? " : { } | < > )',
                },
              })}
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
            {errors?.password && (
              <span className="text-red-600">{errors.password.message}</span>
            )}

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={uploading || processing || !hostedImageUrl || mutation.isPending}
            className={`btn w-full text-white ${uploading || processing || !hostedImageUrl || mutation.isPending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-700 hover:bg-green-800'
              }`}
          >
            {uploading
              ? 'Please wait... Image is uploading...'
              : processing
                ? 'Processing image...'
                : mutation.isPending
                  ? 'Registering...'
                  : 'Register'}
          </button>

        </form>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" state={location.state} className="text-green-700 font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
