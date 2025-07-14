import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Favorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all favorites for this user
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['favorites', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?userEmail=${user.email}`);
      return res.data; // Expect [{ _id, donation: { ... } }]
    },
    onError: () => toast.error('Failed to load favorites'),
  });

  // Remove favorite mutation
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

  if (isLoading) return <p className="py-10 text-center">Loading favorites...</p>;
  if (favorites.length === 0) return <p className="py-10 text-center">No favorites found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Favorites</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <div
            key={favorite._id}
            className="border rounded-lg p-4 shadow flex flex-col"
          >
            {favorite.donation?.image && (
              <img
                src={favorite.donation.image}
                alt={favorite.donation.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
            )}
            <h3 className="text-xl font-bold mb-2">{favorite.donation?.title}</h3>
            <p className="mb-1">
              <strong>Restaurant:</strong> {favorite.donation?.restaurantName} — {favorite.donation?.location}
            </p>
            <p className="mb-1">
              <strong>Status:</strong> {favorite.donation?.status}
            </p>
            <p className="mb-4">
              <strong>Quantity:</strong> {favorite.donation?.quantity} {favorite.donation?.quantityUnit}
            </p>
            <div className="mt-auto flex gap-2">
              <Link
                to={`/donationDetails/${favorite.donation?._id}`}
                className="btn btn-primary flex-1"
              >
                Details
              </Link>
              <button
                onClick={() => removeFavorite.mutate(favorite._id)}
                className="btn btn-outline flex-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
