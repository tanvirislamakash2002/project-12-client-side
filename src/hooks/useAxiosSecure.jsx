import React, { useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `https://ph-a12-server.vercel.app`
});

const useAxiosSecure = () => {
    const { user, loading, signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(loading) return;
        const requestInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                if (user) {
                    try {
                        // Get a fresh token safely
                        const token = await user.getIdToken(true);
                        config.headers.Authorization = `Bearer ${token}`;
                    } catch (error) {
                        console.error('Error refreshing token:', error);
                        // If token refresh fails, you might want to sign out:
                        await signOutUser();
                        navigate('/login');
                        return Promise.reject(error);
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor unchanged
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (res) => res,
            (error) => {
                const status = error.response?.status;
                if (status === 403) {
                    navigate('/forbidden');
                } else if (status === 401) {
                    signOutUser()
                        .then(() => navigate('/login'))
                        .catch(() => { });
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user, signOutUser, navigate]);


    return axiosSecure;
};

export default useAxiosSecure;