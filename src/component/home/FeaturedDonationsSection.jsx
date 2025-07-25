import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Verified: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
};

const FeaturedDonationsSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: featured = [], isLoading } = useQuery({
    queryKey: ['featuredDonations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations/featured');
      return res.data;
    },
  });

  if (isLoading) return <div className="flex w-52 flex-col gap-4 mx-auto">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>;

  if (!featured || featured.length === 0) return null;
  
  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">🌟 Featured Donations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {featured.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-200 overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.foodType}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.restaurantName}</p>
              <p className="text-xs text-gray-500 mb-2">{item.location}</p>

              <span
                className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${statusColors[item.status] || 'bg-gray-100 text-gray-700'}`}
              >
                {item.status}
              </span>

              <div className="mt-4">
                <Link
                  to={`/donationDetails/${item._id}`}
                  className="btn btn-sm btn-primary w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDonationsSection;
