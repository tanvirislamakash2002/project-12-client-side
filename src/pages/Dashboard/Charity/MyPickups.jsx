import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

const MyPickups = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch pickups
  const { data: pickups = [], isLoading } = useQuery({
    queryKey: ['myPickups', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donation-requests/pickups?charityEmail=${user.email}`
      );
      return res.data;
    },
  });
  // Confirm pickup mutation
  const confirmPickupMutation = useMutation({
    mutationFn: async (requestId) => {
      await axiosSecure.patch(`/donation-requests/${requestId}/confirm-pickup`);
    },
    onSuccess: () => {
      toast.success('Pickup confirmed!');
      queryClient.invalidateQueries(['myPickups']);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">My Pickups</h2>

      {pickups.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No assigned pickups yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {pickups.map((pickup) => (
            <div key={pickup._id} className="card bg-base-100 shadow border border-base-300">
              <div className="card-body">
                <h3 className="text-xl font-bold text-primary">{pickup.donationTitle}</h3>

                <div className="text-base-content space-y-1">
                  <p><strong>Restaurant:</strong> {pickup.restaurantName}</p>
                  <p><strong>Location:</strong> {pickup.location}</p>
                  <p><strong>Food Type:</strong> {pickup.foodType}</p>
                  <p><strong>Quantity:</strong> {pickup.quantity}</p>
                  <p><strong>Pickup Time:</strong> {pickup.pickupTime}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span
                      className={`badge text-white ${
                        pickup.status === 'Picked Up'
                          ? 'badge-success'
                          : pickup.status === 'Accepted'
                          ? 'badge-warning'
                          : 'badge-info'
                      }`}
                    >
                      {pickup.status}
                    </span>
                  </p>
                </div>

                {pickup.status === 'Accepted' && (
                  <div className="mt-4">
                    <button
                      onClick={() => confirmPickupMutation.mutate(pickup._id)}
                      className="btn btn-success w-full text-white"
                    >
                      Confirm Pickup
                    </button>
                  </div>
                )}

                {pickup.status === 'Picked Up' && (
                  <div className="mt-4 text-center text-green-600 font-semibold">
                    ✅ Already Picked Up
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPickups;
