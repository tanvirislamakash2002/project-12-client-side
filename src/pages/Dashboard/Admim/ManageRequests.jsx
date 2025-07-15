import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['allRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donation-requests/all');
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/admin/donation-requests/${id}`);
    },
    onSuccess: () => {
      toast.success('Request deleted!');
      queryClient.invalidateQueries(['allRequests']);
    },
    onError: (err) => {
        console.log(err.response)
      toast.error(err.response?.data?.message || 'Delete failed.');
    },
  });

  if (isLoading) return <p>Loading...</p>;

  console.log(requests)
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Donation Title</th>
              <th>Charity Name</th>
              <th>Charity Email</th>
              <th>Request Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.donationTitle}</td>
                <td>{req.charityName}</td>
                <td>{req.charityEmail}</td>
                <td>{req.requestDescription}</td>
                <td>
                  <button
                    onClick={() => deleteMutation.mutate(req._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequests;
