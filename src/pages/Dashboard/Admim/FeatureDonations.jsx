import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['verifiedDonations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations?verified=true');
      return res.data;
    },
  });

  const { mutate: toggleFeature } = useMutation({
    mutationFn: async ({ id, featured }) => {
      return await axiosSecure.patch(`/donations/${id}/feature`, { featured });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['verifiedDonations']);
      Swal.fire('Updated!', 'Donation feature status changed.', 'success');
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Food Type</th>
            <th>Restaurant</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {donations.map(donation => (
            <tr key={donation._id}>
              <td><img src={donation.image} alt="" className="w-20 h-20 object-cover" /></td>
              <td>{donation.title}</td>
              <td>{donation.foodType}</td>
              <td>{donation.restaurantName}</td>
              <td>
                {donation.featured ? (
                  <button
                    onClick={() => toggleFeature({ id: donation._id, featured: false })}
                    className="btn btn-xs btn-error"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => toggleFeature({ id: donation._id, featured: true })}
                    className="btn btn-xs btn-primary"
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
  );
};

export default FeatureDonations;
