import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaEdit, FaTrash, FaClock, FaCheck, FaTimes, FaBox } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyDonation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: donations = [] } = useQuery({
    queryKey: ['my-donations', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { mutate: deleteDonation } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/donation/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['my-donations']);
      Swal.fire('Deleted!', 'Donation has been deleted.', 'success');
    },
    onError: (error) => {
      Swal.fire('Error', error.message, 'error');
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDonation(id);
      }
    });
  };

  const StatusBadge = ({ status }) => {
    const styleMap = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Verified: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
      'Picked Up': 'bg-blue-100 text-blue-800',
    };

    const iconMap = {
      Pending: <FaClock />,
      Verified: <FaCheck />,
      Rejected: <FaTimes />,
      'Picked Up': <FaBox />,
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${styleMap[status]}`}>
        {iconMap[status]} {status}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">📦 My Donations</h2>

      {donations.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">You haven't added any donations yet.</p>
          <Link to="/dashboard/addDonation" className="btn btn-primary mt-4">
            Add Your First Donation
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {donations.map((donation) => (
            <div key={donation._id} className="rounded-xl overflow-hidden shadow-md bg-white">
              <div className="h-48 bg-gray-100">
                {donation.image ? (
                  <img
                    src={donation.image}
                    alt={donation.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg text-gray-800">{donation.title}</h3>
                  <StatusBadge status={donation.status} />
                </div>
                <p><strong>🍽 Food:</strong> {donation.foodType}</p>
                <p><strong>📦 Quantity:</strong> {donation.quantity} {donation.quantityUnit}</p>
                <p><strong>⏰ Pickup Time:</strong> {donation.pickupTime}</p>

                <div className="flex justify-end gap-2 mt-4">
                  {donation.status !== 'Rejected' && (
                    <Link
                      to={`/dashboard/updateDonation/${donation._id}`}
                      state={donation}
                      className="btn btn-sm btn-outline"
                    >
                      <FaEdit className="mr-1" /> Update
                    </Link>
                  )}
                  <button
                    onClick={() => handleDelete(donation._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonation;
