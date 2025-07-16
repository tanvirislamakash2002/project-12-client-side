import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const FeaturedDonationsSection = () => {
    const axiosSecure = useAxiosSecure()
  const { data: featured = [], isLoading } = useQuery({
    queryKey: ['featuredDonations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations/featured');
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Donations</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map(item => (
          <div key={item._id} className="card shadow-md">
            <img src={item.image} alt={item.title} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.foodType}</h3>
              <p className="text-gray-600">{item.restaurantName} - {item.location}</p>
              <p className="text-green-600 font-medium">{item.status}</p>
              <Link to={`/donationDetails/${item._id}`} className="btn btn-sm btn-primary mt-2">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedDonationsSection;
