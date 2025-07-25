import { useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem('token'); 
        if (user && token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 403) {
          navigate('/forbidden');
        } else if (status === 401) {
          try {
            await signOutUser();
            navigate('/login');
          } catch (err) {
            console.error('Error signing out:', err);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, loading, signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
