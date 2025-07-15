import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const MyRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['myRequests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/my?charityEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const cancelRequestMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/donation-requests/${id}`);
    },
    onSuccess: () => {
      toast.success('Request cancelled');
      queryClient.invalidateQueries(['myRequests', user?.email]);
    },
    onError: () => toast.error('Failed to cancel request'),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map(req => (
            <div key={req._id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-bold">{req.donationTitle}</h3>
              <p><strong>Restaurant:</strong> {req.restaurantName}</p>
              <p><strong>Food:</strong> {req.foodType || 'N/A'}</p>
              <p><strong>Quantity:</strong> {req.quantity || 'N/A'}</p>
              <p><strong>Status:</strong> {req.status}</p>

              {req.status === 'Pending' && (
                <button
                  className="btn btn-error mt-2"
                  onClick={() => cancelRequestMutation.mutate(req._id)}
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
