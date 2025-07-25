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
      const res = await axiosSecure.get(
        `/donation-requests/my?charityEmail=${user.email}`
      );
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">My Requests</h2>

      {requests.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No requests found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="card bg-base-100 shadow-md border border-base-300"
            >
              <div className="card-body space-y-2">
                <h3 className="card-title text-primary">{req.donationTitle}</h3>

                <p>
                  <strong>Restaurant:</strong> {req.restaurantName}
                </p>
                <p>
                  <strong>Food Type:</strong> {req.foodType || 'N/A'}
                </p>
                <p>
                  <strong>Quantity:</strong> {req.quantity && req.quantityUnit ? `${req.quantity} ${req.quantityUnit}` : 'N/A'}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    className={`badge text-white ${
                      req.status === 'Accepted'
                        ? 'badge-success'
                        : req.status === 'Rejected'
                        ? 'badge-error'
                        : req.status === 'Picked Up'
                        ? 'badge-info'
                        : 'badge-warning'
                    }`}
                  >
                    {req.status}
                  </span>
                </p>

                {req.status === 'Pending' && (
                  <button
                    className="btn btn-error w-full mt-4"
                    onClick={() => cancelRequestMutation.mutate(req._id)}
                  >
                    Cancel Request
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
