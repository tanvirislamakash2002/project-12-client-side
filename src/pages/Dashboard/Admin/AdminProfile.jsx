import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ['adminProfile', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const { name, photoURL, role, lastLogin, email } = profile;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body flex flex-col md:flex-row items-center gap-6">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={photoURL || '/placeholder-admin.png'}
                alt={name || 'Admin'}
              />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {name || 'Admin Name'}
            </h2>
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">Email:</span> {email}
            </p>
            <p className="mt-1">
              <span className="font-semibold">Role:</span>{' '}
              <span className="badge badge-primary badge-outline">{role}</span>
            </p>
            {lastLogin && (
              <p className="text-sm text-gray-500 mt-1">
                Last login: {new Date(lastLogin).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
