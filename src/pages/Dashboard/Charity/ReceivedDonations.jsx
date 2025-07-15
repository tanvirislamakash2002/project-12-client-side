import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import ReviewModal from '../../../component/ReviewModal'; // if you have a reusable modal

const ReceivedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedDonation, setSelectedDonation] = useState(null);

  const { data: received = [], isLoading } = useQuery({
    queryKey: ['receivedDonations', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/received?charityEmail=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Received Donations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {received.map((donation) => (
          <div key={donation._id} className="card p-4 shadow rounded border">
            <h3 className="text-lg font-bold">{donation.donationTitle}</h3>
            <p>Restaurant: {donation.restaurantName}</p>
            <p>Food Type: {donation.foodType}</p>
            <p>Quantity: {donation.quantity}</p>
            <p>Pickup Date: {donation.pickupTime}</p>

            <button
              onClick={() => setSelectedDonation(donation)}
              className="btn btn-primary mt-2"
            >
              Leave Review
            </button>
          </div>
        ))}
      </div>

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
