import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['verifiedDonations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations?status=Verified');
      return res.data;
    },
  });

  const { mutate: toggleFeature, isLoading: isMutating } = useMutation({
    mutationFn: async ({ id, featured }) => {
      return await axiosSecure.patch(`/donations/${id}/feature`, { featured });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['verifiedDonations']);
      Swal.fire('Updated!', 'Donation feature status changed.', 'success');
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to update feature status.', 'error');
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Feature Donations</h2>
      <div className="overflow-x-auto border rounded-lg shadow-md">
        <table className="table w-full min-w-[700px]">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="w-24">Image</th>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr
                key={donation._id}
                className="hover:bg-base-200 transition"
              >
                <td>
                  {donation.image ? (
                    <img
                      src={donation.image}
                      alt={donation.title || 'Donation Image'}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-300 rounded-md flex items-center justify-center text-gray-500 text-xs">
                      No Image
                    </div>
                  )}
                </td>
                <td className="font-medium">{donation.title}</td>
                <td>{donation.foodType}</td>
                <td>{donation.restaurantName}</td>
                <td className="text-center">
                  {donation.featured ? (
                    <button
                      onClick={() =>
                        toggleFeature({ id: donation._id, featured: false })
                      }
                      disabled={isMutating}
                      className="btn btn-xs btn-error hover:btn-error/90 text-white"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        toggleFeature({ id: donation._id, featured: true })
                      }
                      disabled={isMutating}
                      className="btn btn-xs btn-primary hover:btn-primary/90"
                    >
                      Feature
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {donations.length === 0 && (
        <p className="text-center py-10 text-gray-500">No donations available.</p>
      )}
    </div>
  );
};

export default FeatureDonations;
