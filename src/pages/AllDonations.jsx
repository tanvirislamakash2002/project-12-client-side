import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { IoFilter } from "react-icons/io5";
const AllDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const [searchLocation, setSearchLocation] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [debouncedSearch] = useDebounce(searchLocation, 500);

  const { data: donations = [], isLoading } = useQuery({
    enabled: !loading && !!user,
    queryKey: ['verifiedDonations', debouncedSearch, sortBy],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donations?status=Verified&location=${debouncedSearch}&sortBy=${sortBy}`
      );
      return res.data;
    },
    onError: () => toast.error('Failed to load donations'),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        All Verified Donations
      </h2>

      {/* Drawer wrapper with drawer open on large screens */}
      <div className="drawer lg:drawer-open">
        <input id="filter-drawer" type="checkbox" className="drawer-toggle" />

        {/* Main content */}
        <div className="drawer-content">
          {/* Drawer toggle button for small screens */}
          <div className="lg:hidden mb-4">
            <label htmlFor="filter-drawer" className="btn btn-outline w-full">
             <IoFilter /> Open Filters
            </label>
          </div>

          {/* Donations grid or loading/empty state */}
          {isLoading ? (
            <div className="text-center text-lg py-10">Loading donations...</div>
          ) : donations.length === 0 ? (
            <div className="text-center text-gray-500 py-10 text-lg">
              No verified donations found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {donations.map((donation) => (
                <div
                  key={donation._id}
                  className="card bg-base-100 shadow-xl transition-transform hover:scale-[1.015] overflow-hidden"
                >
                  {donation.image ? (
                    <figure className="h-48 w-full overflow-hidden">
                      <img
                        src={donation.image}
                        alt={donation.title}
                        className="h-full w-full object-cover"
                      />
                    </figure>
                  ) : (
                    <div className="h-48 flex items-center justify-center bg-gray-100 text-gray-400">
                      No Image Available
                    </div>
                  )}

                  <div className="card-body flex flex-col justify-between">
                    <div>
                      <h3 className="card-title text-lg text-primary">
                        {donation.title}
                      </h3>
                      <p>
                        <strong>Restaurant:</strong> {donation.restaurantName}
                      </p>
                      <p>
                        <strong>Location:</strong> {donation.location}
                      </p>
                      {donation.charityName && (
                        <p>
                          <strong>Assigned Charity:</strong> {donation.charityName}
                        </p>
                      )}
                      <p>
                        <strong>Quantity:</strong> {donation.quantity}{' '}
                        {donation.quantityUnit}
                      </p>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <span
                        className={`badge ${
                          donation.status === 'Verified'
                            ? 'badge-success'
                            : 'badge-warning'
                        }`}
                      >
                        {donation.status}
                      </span>
                      <Link
                        to={`/donationDetails/${donation._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-40">
          {/* Overlay for drawer on small screens */}
          <label htmlFor="filter-drawer" className="drawer-overlay"></label>
          <div className="menu p-6 w-80 min-h-full bg-base-200 text-base-content">
            <h3 className="text-xl font-semibold mb-6">Filter & Sort</h3>

            <input
              type="text"
              placeholder="Search by location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="input input-bordered w-full mb-6"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Sort By</option>
              <option value="quantity">Quantity</option>
              <option value="pickupTime">Pickup Time</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDonations;
