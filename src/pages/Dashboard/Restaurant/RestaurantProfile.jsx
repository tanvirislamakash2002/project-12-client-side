import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { FaMapMarkerAlt, FaPhoneAlt, FaUser, FaRegCalendarAlt } from 'react-icons/fa';

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

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500">
        <span className="loading loading-spinner text-primary"></span>
        <p className="mt-2">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={profile.photoURL || '/placeholder-restaurant.png'}
          alt="Restaurant Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-md"
        />

        <div className="flex-1 space-y-2">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaUser className="text-primary" /> {profile.name || 'Restaurant Name'}
          </h2>

          <p className="text-gray-600">
            <span className="font-semibold text-gray-700">Role:</span> {profile.role || 'Restaurant'}
          </p>

          {profile.address && (
            <p className="text-gray-600 flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              {profile.address}
            </p>
          )}

          {profile.contact && (
            <p className="text-gray-600 flex items-center gap-2">
              <FaPhoneAlt className="text-primary" />
              {profile.contact}
            </p>
          )}

          {profile.createdAt && (
            <p className="text-gray-600 flex items-center gap-2">
              <FaRegCalendarAlt className="text-primary" />
              Registered on: {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantProfile;
