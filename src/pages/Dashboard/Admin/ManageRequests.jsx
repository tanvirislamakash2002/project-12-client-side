import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['allRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donation-requests/all');
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/admin/donation-requests/${id}`);
    },
    onSuccess: () => {
      toast.success('Request deleted!');
      queryClient.invalidateQueries(['allRequests']);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Delete failed.');
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow-md mb-6">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-primary">Manage Donation Requests</h2>
          <p className="text-base-content/70">View and manage requests submitted by charities.</p>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          No donation requests found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-base-300">
          <table className="table w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>Donation Title</th>
                <th>Charity Name</th>
                <th>Charity Email</th>
                <th>Description</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="hover">
                  <td>{req.donationTitle}</td>
                  <td>{req.charityName}</td>
                  <td className="text-sm text-gray-600">{req.charityEmail}</td>
                  <td className="max-w-xs truncate">{req.requestDescription}</td>
                  <td className="text-center">
                    <button
                      onClick={() => deleteMutation.mutate(req._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
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

export default ManageRequests;
