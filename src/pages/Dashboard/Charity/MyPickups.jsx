import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

const MyPickups = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // ✅ Get only "Accepted" requests for this charity
  const { data: pickups = [], isLoading } = useQuery({
    queryKey: ['myPickups', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/pickups?charityEmail=${user.email}`);
      return res.data;
    },
  });

  // ✅ Confirm pickup mutation
  const confirmPickupMutation = useMutation({
    mutationFn: async (requestId) => {
      await axiosSecure.patch(`/donation-requests/${requestId}/confirm-pickup`);
    },
    onSuccess: () => {
      toast.success('Pickup confirmed!');
      queryClient.invalidateQueries(['myPickups']);
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Pickups</h2>
      {pickups.length === 0 ? (
        <p>No assigned pickups yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pickups.map((pickup) => (
            <div
              key={pickup._id}
              className="border rounded-lg p-4 shadow flex flex-col gap-2"
            >
              <h3 className="text-xl font-semibold">{pickup.donationTitle}</h3>
              <p>
                <strong>Restaurant:</strong> {pickup.restaurantName} ({pickup.location})
              </p>
              <p>
                <strong>Food Type:</strong> {pickup.foodType}
              </p>
              <p>
                <strong>Quantity:</strong> {pickup.quantity}
              </p>
              <p>
                <strong>Pickup Time:</strong> {pickup.pickupTime}
              </p>
              <p>
                <strong>Status:</strong> {pickup.status === 'Picked Up' ? 'Picked Up' : 'Assigned'}
              </p>

              {pickup.status === 'Accepted' && (
                <button
                  onClick={() => confirmPickupMutation.mutate(pickup._id)}
                  className="btn btn-success"
                >
                  Confirm Pickup
                </button>
              )}

              {pickup.status === 'Picked Up' && (
                <span className="text-green-600 font-bold">Already Picked Up</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPickups;
