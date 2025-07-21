import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const postJWT = async (email) => {
  const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email });
  return data;
};

export const useJwtToken = () => {
  return useMutation({
    mutationFn: postJWT,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
    },
    onError: (error) => {
      console.error('JWT fetch error:', error);
    },
  });
};
