import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {user} = useAuth();

  // Fetch all donation requests for this restaurant
const { data: requests = [], isLoading } = useQuery({
  queryKey: ['restaurantRequests', user.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/donation-requests?restaurantEmail=${user.email}`);
    return res.data;
  },
});

  // Accept request
  const acceptMutation = useMutation({
    mutationFn: async (requestId) => {
      await axiosSecure.patch(`/donation-requests/${requestId}/accept`);
    },
    onSuccess: () => {
      toast.success('Request accepted!');
      queryClient.invalidateQueries(['requestedDonations']);
    },
  });

  // Reject request
  const rejectMutation = useMutation({
    mutationFn: async (requestId) => {
      await axiosSecure.patch(`/donation-requests/${requestId}/reject`);
    },
    onSuccess: () => {
      toast.success('Request rejected!');
      queryClient.invalidateQueries(['requestedDonations']);
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Requested Donations</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Donation Title</th>
              <th>Food Type</th>
              <th>Charity Name</th>
              <th>Charity Email</th>
              <th>Request Description</th>
              <th>Pickup Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.donationTitle}</td>
                <td>{req.foodType}</td>
                <td>{req.charityName}</td>
                <td>{req.charityEmail}</td>
                <td>{req.requestDescription}</td>
                <td>{req.pickupTime}</td>
                <td>{req.status}</td>
                <td className="space-x-2">
                  {req.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => acceptMutation.mutate(req._id)}
                        className="btn btn-success btn-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(req._id)}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {(req.status === 'Accepted' || req.status === 'Rejected') && (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedDonations;
