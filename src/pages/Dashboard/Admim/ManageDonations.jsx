import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const ManageDonations = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all donations
    const { data: donations = [], isLoading } = useQuery({
        queryKey: ['allDonations'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donations');
            return res.data;
        },
    });

    // Verify donation mutation
    const verifyDonation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.patch(`/donations/${id}`, { status: 'Verified' });
        },
        onSuccess: () => {
            toast.success('Donation verified');
            queryClient.invalidateQueries(['allDonations']);
        },
        onError: () => toast.error('Failed to verify donation'),
    });

    // Reject donation mutation
    const rejectDonation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.patch(`/donations/${id}`, { status: 'Rejected' });
        },
        onSuccess: () => {
            toast.info('Donation rejected');
            queryClient.invalidateQueries(['allDonations']);
        },
        onError: () => toast.error('Failed to reject donation'),
    });

    if (isLoading) {
        return <p>Loading donations...</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Manage Donations</h2>

            {donations.length === 0 ? (
                <p>No donations found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="py-2 px-4 border-b">Title</th>
                                <th className="py-2 px-4 border-b">Food Type</th>
                                <th className="py-2 px-4 border-b">Restaurant Name</th>
                                <th className="py-2 px-4 border-b">Restaurant Email</th>
                                <th className="py-2 px-4 border-b">Quantity</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((donation) => (
                                <tr key={donation._id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{donation.title}</td>
                                    <td className="py-2 px-4 border-b">{donation.foodType}</td>
                                    <td className="py-2 px-4 border-b">{donation.restaurantName}</td>
                                    <td className="py-2 px-4 border-b">{donation.restaurantEmail}</td>
                                    <td className="py-2 px-4 border-b">
                                        {donation.quantity} {donation.quantityUnit}
                                    </td>
                                    <td className="py-2 px-4 border-b">{donation.status}</td>
                                    <td className="py-2 px-4 border-b space-x-2">
                                        {donation.status === 'Pending' && (
                                            <>
                                                <button
                                                    onClick={() => verifyDonation.mutate(donation._id)}
                                                    className="btn btn-success btn-sm"
                                                >
                                                    Verify
                                                </button>
                                                <button
                                                    onClick={() => rejectDonation.mutate(donation._id)}
                                                    className="btn btn-error btn-sm"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {donation.status !== 'Pending' && <span>-</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageDonations;
