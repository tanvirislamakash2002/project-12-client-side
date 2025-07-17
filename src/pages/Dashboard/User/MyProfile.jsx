import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ['myProfile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6 md:mt-10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={profile.photoURL || '/placeholder-user.png'}
          alt="User"
          className="w-32 h-32 rounded-full object-cover shadow-md"
        />
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            {profile.name || 'User Name'}
          </h2>

          {profile.role && profile.role !== 'user' && (
            <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full">
              {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
            </span>
          )}

          {profile.contact && (
            <p className="text-gray-600">
              <strong>Contact:</strong> {profile.contact}
            </p>
          )}

          {profile.createdAt && (
            <p className="text-gray-500 text-sm">
              <strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
