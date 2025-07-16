import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const TopContributors = () => {
  const { data: topRestaurants = [], isLoading } = useQuery({
    queryKey: ['topRestaurants'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/top-restaurants');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading top contributors...</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        🌟 Top Restaurant Contributors
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topRestaurants.map((rest, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
          >
            <img
              src={
                rest.logo || 'https://via.placeholder.com/150?text=Restaurant+Logo'
              }
              alt={rest.restaurantName}
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{rest.restaurantName}</h3>
            <p className="text-gray-600 mb-1">
              <strong>Donations:</strong> {rest.totalDonations}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Total Quantity:</strong> {rest.totalQuantity} lbs
            </p>
            <p className="text-gray-500 text-sm">{rest.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopContributors;
