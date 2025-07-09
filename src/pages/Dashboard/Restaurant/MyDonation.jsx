import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { FaEdit, FaTrash, FaClock, FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyDonation = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch donations
    const { data: donations = [] } = useQuery({
        queryKey: ['my-donations', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    // Delete mutation
    const { mutate: deleteDonation } = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/donation/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['my-donations']);
            Swal.fire('Deleted!', 'Donation has been deleted.', 'success');
        },
        onError: (error) => {
            Swal.fire('Error', error.message, 'error');
        }
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDonation(id);
            }
        });
    };

    // Status badge component
    const StatusBadge = ({ status }) => {
        const statusConfig = {
            Pending: { color: 'bg-yellow-100 text-yellow-800', icon: <FaClock /> },
            Verified: { color: 'bg-green-100 text-green-800', icon: <FaCheck /> },
            Rejected: { color: 'bg-red-100 text-red-800', icon: <FaTimes /> }
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${statusConfig[status]?.color}`}>
                {statusConfig[status]?.icon} {status}
            </span>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">My Donations</h2>

            {donations.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">You haven't added any donations yet.</p>
                    <Link to="/dashboard/addDonation" className="btn btn-primary mt-4">
                        Add Your First Donation
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {donations.map((donation) => (
                        <div key={donation._id} className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
                            <figure className="h-48 bg-gray-100">
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
                            </figure>
                            <div className="card-body p-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="card-title text-lg">{donation.title}</h3>
                                    <StatusBadge status={donation.status} />
                                </div>
                                <div className="space-y-2 mt-2">
                                    <p><span className="font-semibold">Food Type:</span> {donation.foodType}</p>
                                    <p><span className="font-semibold">Quantity:</span> {donation.quantity} {donation.quantityUnit}</p>
                                    <p><span className="font-semibold">Pickup Time:</span> {donation.pickupTime}</p>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    {donation.status !== 'Rejected' && (
                                        <Link
                                            to={`/dashboard/updateDonation/${donation._id}`}
                                            state={donation}
                                            className="btn btn-sm btn-outline"
                                        >
                                            <FaEdit /> Update
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => handleDelete(donation._id)}
                                        className="btn btn-sm btn-error text-white"
                                    >
                                        <FaTrash /> Delete
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