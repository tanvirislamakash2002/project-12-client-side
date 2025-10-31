import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import TopSkeleton from './loadingScreen/TopSkeleton';

const TopContributors = () => {
  const axiosSecure = useAxiosSecure()
  const { data: topRestaurants = [], isLoading } = useQuery({
    queryKey: ['topRestaurants'],
    queryFn: async () => {
      const res = await axiosSecure.get('/top-restaurants');
      return res.data;
    },
  });

  if (isLoading)
    return <TopSkeleton></TopSkeleton>;

  if (!topRestaurants || topRestaurants.length === 0) return null;

  return (
<section className="bg-gray-50 dark:bg-base-200 py-16">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12 dark:text-base-content">
      🍽️ Top Restaurant Contributors
    </h2>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {topRestaurants.map((rest, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-base-100 p-6 rounded-2xl shadow hover:shadow-lg transition duration-200 text-center border border-gray-100 dark:border-base-300"
        >
          <img
            src={
              rest.logo || 'https://via.placeholder.com/150?text=Restaurant+Logo'
            }
            alt={rest.restaurantName}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-primary dark:border-primary"
          />

          <h3 className="text-xl font-bold text-gray-800 dark:text-base-content">{rest.restaurantName}</h3>
          <p className="text-gray-500 dark:text-base-content/70 text-sm mb-3">{rest.location}</p>

          <div className="flex justify-center gap-4 mt-4">
            <span className="bg-green-100 dark:bg-success/20 text-green-700 dark:text-success px-3 py-1 rounded-full text-sm font-medium">
              {rest.totalDonations} Donations
            </span>
            <span className="bg-blue-100 dark:bg-info/20 text-blue-700 dark:text-info px-3 py-1 rounded-full text-sm font-medium">
              {rest.totalQuantity} lbs
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default TopContributors;
