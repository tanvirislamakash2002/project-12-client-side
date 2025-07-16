import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const AdminProfile = () => {
  const { user } = useAuth(); // gives you the email
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ['adminProfile', user.email],
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
          src={profile.photoURL || '/placeholder-admin.png'}
          alt="Admin"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{profile.name || 'Admin Name'}</h2>
          <p className="text-gray-600">Role: <span className="font-semibold">{profile.role}</span></p>
          {profile.lastLogin && (
            <p className="text-gray-500">Last login: {new Date(profile.lastLogin).toLocaleString()}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
