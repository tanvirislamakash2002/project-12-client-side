import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['restaurantRequests', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests?restaurantEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const acceptMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/donation-requests/${id}/accept`),
    onSuccess: () => {
      toast.success('Request accepted!');
      queryClient.invalidateQueries(['restaurantRequests']);
    },
    onError: () => toast.error('Failed to accept request'),
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/donation-requests/${id}/reject`),
    onSuccess: () => {
      toast.success('Request rejected!');
      queryClient.invalidateQueries(['restaurantRequests']);
    },
    onError: () => toast.error('Failed to reject request'),
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-600">
        <span className="loading loading-spinner text-primary"></span>
        <p>Loading donation requests...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">📨 Requested Donations</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No donation requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border rounded-lg shadow-md">
            <thead className="bg-base-200 text-base font-semibold">
              <tr>
                <th>#</th>
                <th>Donation Title</th>
                <th>Food Type</th>
                <th>Charity Name</th>
                <th>Charity Email</th>
                <th>Description</th>
                <th>Pickup Time</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.donationTitle}</td>
                  <td>{req.foodType}</td>
                  <td>{req.charityName}</td>
                  <td>{req.charityEmail}</td>
                  <td>{req.requestDescription}</td>
                  <td>{req.pickupTime}</td>
                  <td>
                    <span
                      className={`badge px-3 py-1 whitespace-nowrap ${
                        req.status === 'Pending'
                          ? 'badge-warning'
                          : req.status === 'Accepted'
                          ? 'badge-success'
                          : req.status === 'Picked Up'
                          ? 'badge-info'
                          : 'badge-error'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="flex gap-2 justify-center">
                    {req.status === 'Pending' ? (
                      <>
                        <button
                          className="btn btn-sm btn-success text-white"
                          onClick={() => acceptMutation.mutate(req._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-sm btn-error text-white"
                          onClick={() => rejectMutation.mutate(req._id)}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400 italic">No actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RequestedDonations;
