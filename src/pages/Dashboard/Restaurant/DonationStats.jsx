import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import useAuth from '../../../hooks/useAuth';
import { FaChartBar } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const DonationStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ['donationStats', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/restaurant-donation-stats?email=${user.email}`);
      return res.data;
    },
    enabled: !!user.email,
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaChartBar className="text-primary" />
              Donation Statistics
            </h2>
            <p className="text-sm text-gray-500">Overview of food types you’ve donated</p>
          </div>
          <button
            onClick={refetch}
            className="btn btn-sm btn-outline text-sm"
          >
            Refresh
          </button>
        </div>

        {/* Chart */}
        {isLoading ? (
          <div className="h-72 flex items-center justify-center">
            <span className="loading loading-bars loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            {data.length === 0 ? (
              <p className="text-center text-gray-500">No donation stats available yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="foodType" label={{ value: 'Food Type', position: 'insideBottom', dy: 10 }} />
                  <YAxis label={{ value: 'Quantity', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="totalQuantity" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DonationStats;
