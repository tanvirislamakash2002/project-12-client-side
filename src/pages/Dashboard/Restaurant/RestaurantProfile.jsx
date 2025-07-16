import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const RestaurantProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ['restaurantProfile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <div className="flex items-center space-x-4">
        <img
          src={profile.photoURL || '/placeholder-restaurant.png'}
          alt="Restaurant"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">
            {profile.name || 'Restaurant Name'}
          </h2>
          <p className="text-gray-600">
            Role: <span className="font-semibold">{profile.role || 'Restaurant'}</span>
          </p>
          {profile.address && (
            <p className="text-gray-500 mt-2">
              <strong>Address:</strong> {profile.address}
            </p>
          )}
          {profile.contact && (
            <p className="text-gray-500 mt-1">
              <strong>Contact:</strong> {profile.contact}
            </p>
          )}
          {profile.createdAt && (
            <p className="text-gray-500 mt-1">
              <strong>Registered:</strong> {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
