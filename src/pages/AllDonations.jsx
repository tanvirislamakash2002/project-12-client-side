import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['verifiedDonations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations?status=Verified');
      return res.data;
    },
    onError: () => toast.error('Failed to load donations'),
  });

  if (isLoading) {
    return <p className="text-center py-10">Loading donations...</p>;
  }

  if (donations.length === 0) {
    return <p className="text-center py-10">No verified donations found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Verified Donations</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            {donation.image ? (
              <img
                src={donation.image}
                alt={donation.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-xl font-semibold mb-2">{donation.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Restaurant:</strong> {donation.restaurantName}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Location:</strong> {donation.location}
              </p>
              {donation.charityName && (
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Assigned Charity:</strong> {donation.charityName}
                </p>
              )}
              <p className="text-sm text-gray-600 mb-1">
                <strong>Status:</strong> {donation.status || 'Available'}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Quantity:</strong> {donation.quantity} {donation.quantityUnit}
              </p>

              <Link
                to={`/donationDetails/${donation._id}`}
                className="btn btn-primary w-full mt-auto"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDonations;
