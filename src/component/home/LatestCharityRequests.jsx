import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const LatestDonationRequests = () => {
  const axiosSecure = useAxiosSecure()
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['latestDonationRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donation-requests/latest');
      return res.data;
    },
  });

  if (isLoading)
    return <div className="flex w-52 flex-col gap-4 mx-auto">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>;

  if (!requests || requests.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          🤝 Latest Charity Requests
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((request, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl shadow hover:shadow-md transition duration-200 overflow-hidden flex flex-col"
            >
              <img
                src={
                  request.charityImage ||
                  'https://via.placeholder.com/400x250?text=Charity+Image'
                }
                alt={request.charityName}
                className="h-48 w-full object-cover"
              />

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {request.charityName}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {request.requestDescription}
                </p>

                <div className="mt-auto">
                  <p className="text-sm text-green-700 font-medium">
                    🍱 Requested: <span className="font-semibold">{request.foodDonationTitle}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestDonationRequests;
