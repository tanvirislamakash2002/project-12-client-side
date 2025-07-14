import { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Modal from '../component/Modal';


const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  // Fetch donation details
  const { data: donation, isLoading } = useQuery({
    queryKey: ['donation', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation/${id}`);
      return res.data;
    },
    onError: () => toast.error('Failed to load donation details'),
  });

  // Fetch donation reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-reviews?donationId=${id}`);
      return res.data;
    },
  });

  // Save to favorites
  const saveToFavorites = async () => {
    await axiosSecure.post('/favorites', {
      donationId: id,
      userEmail: user.email,
    });
    toast.success('Added to your favorites!');
  };

  // Confirm pickup (for charities only)
  const confirmPickup = async () => {
    await axiosSecure.patch(`/donations/${id}/confirm-pickup`);
    toast.success('Donation marked as Picked Up!');
    queryClient.invalidateQueries(['donation', id]);
  };

  // Submit request (charity)
  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const requestDescription = form.requestDescription.value;
    const pickupTime = form.pickupTime.value;

    await axiosSecure.post('/donation-requests', {
      donationId: id,
      donationTitle: donation.title,
      restaurantName: donation.restaurantName,
      charityName: user.displayName,
      charityEmail: user.email,
      requestDescription,
      pickupTime,
      status: 'Pending',
    });

    toast.success('Request submitted!');
    setRequestModalOpen(false);
  };

  // Submit review (user/charity)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const description = form.description.value;
    const rating = parseInt(form.rating.value);

    await axiosSecure.post('/donation-reviews', {
      donationId: id,
      reviewerName: user.displayName,
      reviewerEmail: user.email,
      description,
      rating,
      createdAt: new Date(),
    });

    toast.success('Review added!');
    setReviewModalOpen(false);
    queryClient.invalidateQueries(['reviews', id]);
  };

  if (isLoading) return <p className="py-10 text-center">Loading...</p>;
  if (!donation) return <p className="py-10 text-center">Donation not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{donation.title}</h2>

      {donation.image && (
        <img
          src={donation.image}
          alt={donation.title}
          className="w-full max-h-96 object-cover mb-4 rounded-lg"
        />
      )}

      <p className="mb-2">
        <strong>Description:</strong> {donation.foodType} — {donation.quantity} {donation.quantityUnit}
      </p>
      <p className="mb-2">
        <strong>Pickup Instructions:</strong> {donation.pickupTime}
      </p>
      <p className="mb-2">
        <strong>Restaurant:</strong> {donation.restaurantName} — {donation.location}
      </p>
      <p className="mb-2">
        <strong>Status:</strong> {donation.status}
      </p>

      <div className="flex flex-wrap gap-3 mt-4">
        <button className="btn btn-outline" onClick={saveToFavorites}>
          Save to Favorites
        </button>

        {user?.role === 'charity' && (
          <>
            <button className="btn btn-primary" onClick={() => setRequestModalOpen(true)}>
              Request Donation
            </button>

            {donation.status === 'Accepted' && (
              <button className="btn btn-success" onClick={confirmPickup}>
                Confirm Pickup
              </button>
            )}
          </>
        )}

        <button className="btn btn-secondary" onClick={() => setReviewModalOpen(true)}>
          Add Review
        </button>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-2">Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border p-4 rounded shadow">
                <p className="font-semibold">{review.reviewerName}</p>
                <p>{review.description}</p>
                <p className="text-yellow-500">Rating: {review.rating} / 5</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Modal */}
      {isRequestModalOpen && (
        <Modal onClose={() => setRequestModalOpen(false)}>
          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <h3 className="text-xl font-bold mb-2">Request Donation</h3>
            <p>
              <strong>Donation:</strong> {donation.title}
            </p>
            <p>
              <strong>Restaurant:</strong> {donation.restaurantName}
            </p>
            <p>
              <strong>Charity:</strong> {user.displayName} ({user.email})
            </p>

            <div>
              <label className="label">
                <span className="label-text">Request Description</span>
              </label>
              <textarea
                name="requestDescription"
                className="textarea textarea-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Pickup Time</span>
              </label>
              <input
                name="pickupTime"
                type="text"
                placeholder="e.g., Tomorrow 3 PM"
                className="input input-bordered w-full"
                required
              />
            </div>

            <button className="btn btn-primary w-full" type="submit">
              Submit Request
            </button>
          </form>
        </Modal>
      )}

      {/* Reviews Modal */}
      {isReviewModalOpen && (
        <Modal onClose={() => setReviewModalOpen(false)}>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <h3 className="text-xl font-bold mb-2">Add Review</h3>

            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Rating (1-5)</span>
              </label>
              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                className="input input-bordered w-full"
                required
              />
            </div>

            <button className="btn btn-primary w-full" type="submit">
              Submit Review
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default DonationDetails;
