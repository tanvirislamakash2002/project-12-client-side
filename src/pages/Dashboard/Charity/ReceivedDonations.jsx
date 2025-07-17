import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import ReviewModal from '../../../component/ReviewModal';

const ReceivedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedDonation, setSelectedDonation] = useState(null);

  const { data: received = [], isLoading } = useQuery({
    queryKey: ['receivedDonations', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/received?charityEmail=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Received Donations
      </h2>

      {received.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No donations received yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {received.map((donation) => (
            <div
              key={donation._id}
              className="card bg-base-100 shadow-md border border-base-300"
            >
              <div className="card-body space-y-2">
                <h3 className="card-title text-primary">
                  {donation.donationTitle}
                </h3>

                <p>
                  <strong>Restaurant:</strong> {donation.restaurantName}
                </p>
                <p>
                  <strong>Food Type:</strong> {donation.foodType}
                </p>
                <p>
                  <strong>Quantity:</strong> {donation.quantity}
                </p>
                <p>
                  <strong>Pickup Date:</strong> {donation.pickupTime}
                </p>

                <button
                  onClick={() => setSelectedDonation(donation)}
                  className="btn btn-outline btn-primary w-full mt-4"
                >
                  Leave Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDonation && (
        <ReviewModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
        />
      )}
    </div>
  );
};

export default ReceivedDonations;
