import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { FaCheck, FaTimes, FaClock } from 'react-icons/fa';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Accepted: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
  };

  const statusIcons = {
    Pending: <FaClock />,
    Accepted: <FaCheck />,
    Rejected: <FaTimes />,
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
      {statusIcons[status]} {status}
    </span>
  );
};

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['restaurantRequests', user.email],
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
  onError: (error) => {
    console.error('Accept request error:', error.response?.data || error.message);
    toast.error('Failed to accept request');
  }
});

  const rejectMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/donation-requests/${id}/reject`),
    onSuccess: () => {
      toast.success('Request rejected!');
      queryClient.invalidateQueries(['restaurantRequests']);
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        <span className="loading loading-spinner text-primary"></span>
        <p className="mt-2">Loading donation requests...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">📨 Requested Donations</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No donation requests found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <div key={req._id} className="bg-white shadow-md rounded-xl overflow-hidden p-5 hover:shadow-lg transition duration-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{req.donationTitle}</h3>
              <p className="text-sm text-gray-600 mb-1"><span className="font-medium">🍽 Food Type:</span> {req.foodType}</p>
              <p className="text-sm text-gray-600 mb-1"><span className="font-medium">🏢 Charity:</span> {req.charityName}</p>
              <p className="text-sm text-gray-600 mb-1 truncate"><span className="font-medium">📧 Email:</span> {req.charityEmail}</p>
              <p className="text-sm text-gray-600 mb-1"><span className="font-medium">🕒 Pickup Time:</span> {req.pickupTime}</p>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2"><span className="font-medium">📝 Description:</span> {req.requestDescription}</p>
              <div className="flex justify-between items-center mt-4">
                <StatusBadge status={req.status} />
                {req.status === 'Pending' ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => acceptMutation.mutate(req._id)}
                      className="btn btn-sm btn-success text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate(req._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">No actions</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestedDonations;
