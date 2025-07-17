import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import useAuth from '../../../hooks/useAuth';

const DonationStats = () => {
    const {user} = useAuth()
  const { data = [], isLoading } = useQuery({
    queryKey: ['donationStats', user.email],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/restaurant-donation-stats?email=${user.email}`);
      return res.data;
    },
    enabled: !!user.email,
  });

  if (isLoading) return <p className="text-center">Loading donation stats...</p>;

  console.log(data)
  return (
    <div className="max-w-4xl mx-auto my-8 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">📊 Donation Types vs Quantity</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="foodType" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalQuantity" fill="#2E5941" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationStats;
