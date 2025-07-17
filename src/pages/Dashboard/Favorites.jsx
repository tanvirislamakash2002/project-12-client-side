import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Favorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?userEmail=${user.email}`);
      return res.data;
    },
    onError: () => toast.error('Failed to load favorites'),
  });

  const removeFavorite = useMutation({
    mutationFn: async (favoriteId) => {
      await axiosSecure.delete(`/favorites/${favoriteId}`);
    },
    onSuccess: () => {
      toast.success('Removed from favorites');
      queryClient.invalidateQueries(['favorites', user?.email]);
    },
    onError: () => toast.error('Failed to remove favorite'),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        You don’t have any favorite donations yet.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Your Favorite Donations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(({ _id, donation }) => {
          if (!donation) return null;

          return (
            <div key={_id} className="card bg-base-100 border border-base-300 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              {donation.image && (
                <figure className="h-48 overflow-hidden rounded-t-xl">
                  <img
                    src={donation.image}
                    alt={donation.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
              )}
              <div className="card-body space-y-3">
                <h2 className="card-title text-xl font-semibold text-primary">
                  {donation.title}
                </h2>

                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
                  <p><strong>Location:</strong> {donation.location}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={`badge text-white ${donation.status === 'Available' ? 'badge-success' : 'badge-warning'}`}>
                      {donation.status}
                    </span>
                  </p>
                  <p><strong>Quantity:</strong> {donation.quantity} {donation.quantityUnit}</p>
                </div>

                <div className="card-actions mt-4 flex gap-2">
                  <Link to={`/donationDetails/${donation._id}`} className="btn btn-sm btn-primary flex-1">
                    View Details
                  </Link>
                  <button
                    onClick={() => removeFavorite.mutate(_id)}
                    className="btn btn-sm btn-outline btn-error flex-1 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Favorites;
