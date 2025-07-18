import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const ManageDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all donations
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['allDonations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations');
      return res.data;
    },
  });

  // Verify donation mutation
  const verifyDonation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/donations/${id}`, { status: 'Verified' });
    },
    onSuccess: () => {
      toast.success('Donation verified');
      queryClient.invalidateQueries(['allDonations']);
    },
    onError: () => toast.error('Failed to verify donation'),
  });

  // Reject donation mutation
  const rejectDonation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/donations/${id}`, { status: 'Rejected' });
    },
    onSuccess: () => {
      toast.info('Donation rejected');
      queryClient.invalidateQueries(['allDonations']);
    },
    onError: () => toast.error('Failed to reject donation'),
  });

  if (isLoading) {
    return <p className="text-center py-10 text-lg">Loading donations...</p>;
  }

  if (donations.length === 0) {
    return <p className="text-center py-10 text-lg">No donations found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">Manage Donations</h2>

      {/* For larger screens: Table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-primary/10 text-primary">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Food Type</th>
              <th className="py-3 px-4 text-left">Restaurant Name</th>
              <th className="py-3 px-4 text-left">Restaurant Email</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="hover:bg-primary/20 transition">
                <td className="py-3 px-4 border-t border-gray-200">{donation.title}</td>
                <td className="py-3 px-4 border-t border-gray-200">{donation.foodType}</td>
                <td className="py-3 px-4 border-t border-gray-200">{donation.restaurantName}</td>
                <td className="py-3 px-4 border-t border-gray-200 break-words">{donation.restaurantEmail}</td>
                <td className="py-3 px-4 border-t border-gray-200">
                  {donation.quantity} {donation.quantityUnit}
                </td>
                <td className="py-3 px-4 border-t border-gray-200 font-semibold text-sm">
                  <span
                    className={`badge whitespace-nowrap px-3 ${
                      donation.status === 'Verified'
                        ? 'badge-success'
                        : donation.status === 'Rejected'
                        ? 'badge-error'
                        : 'badge-warning'
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-t border-gray-200 space-x-2">
                  {donation.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => verifyDonation.mutate(donation._id)}
                        className="btn btn-success btn-sm"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => rejectDonation.mutate(donation._id)}
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* For smaller screens: Card view */}
      <div className="md:hidden space-y-4">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-primary mb-2">{donation.title}</h3>
            <p>
              <span className="font-semibold">Food Type:</span> {donation.foodType}
            </p>
            <p>
              <span className="font-semibold">Restaurant:</span> {donation.restaurantName}
            </p>
            <p className="break-words">
              <span className="font-semibold">Email:</span> {donation.restaurantEmail}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {donation.quantity} {donation.quantityUnit}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{' '}
              <span
                className={`badge ${
                  donation.status === 'Verified'
                    ? 'badge-success'
                    : donation.status === 'Rejected'
                    ? 'badge-error'
                    : 'badge-warning'
                }`}
              >
                {donation.status}
              </span>
            </p>

            {donation.status === 'Pending' ? (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => verifyDonation.mutate(donation._id)}
                  className="btn btn-success btn-sm flex-1"
                >
                  Verify
                </button>
                <button
                  onClick={() => rejectDonation.mutate(donation._id)}
                  className="btn btn-error btn-sm flex-1"
                >
                  Reject
                </button>
              </div>
            ) : (
              <p className="mt-4 text-center text-gray-500">No actions available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageDonations;
