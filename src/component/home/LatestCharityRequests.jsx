import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const LatestDonationRequests = () => {
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['latestDonationRequests'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/donation-requests/latest');
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading latest charity requests...</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Latest Charity Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {requests.map((request, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={
                request.charityImage ||
                'https://via.placeholder.com/400x250?text=Charity+Logo'
              }
              alt={request.charityName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{request.charityName}</h3>
              <p className="text-gray-600 mb-4">
                {request.requestDescription?.length > 80
                  ? request.requestDescription.slice(0, 80) + '...'
                  : request.requestDescription}
              </p>
              <p className="mt-auto text-sm text-gray-500">
                <strong>Donation:</strong> {request.foodDonationTitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestDonationRequests;
