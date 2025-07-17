import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const CharityProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ['charityProfile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="card bg-base-100 shadow-lg border border-base-300">
        <div className="card-body">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={profile.photoURL || '/placeholder-charity.png'}
              alt="Charity"
              className="w-32 h-32 rounded-full object-cover border border-base-300"
            />
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold">{profile.name || 'Charity Name'}</h2>
              <p className="text-base-content/70">
                Role: <span className="font-semibold">{profile.role || 'Charity'}</span>
              </p>

              {profile.mission && (
                <p className="mt-3 text-base-content">
                  <span className="font-medium">Mission:</span> {profile.mission}
                </p>
              )}

              {profile.contact && (
                <p className="mt-1 text-base-content">
                  <span className="font-medium">Contact:</span> {profile.contact}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityProfile;
