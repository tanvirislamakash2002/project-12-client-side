import { useParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import Modal from '../component/Modal';
import { useEffect, useState } from 'react';
import useUserRole from '../hooks/useUserRole';
import { useForm } from 'react-hook-form';

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const {
    register: registerReview,
    handleSubmit: handleReviewSubmitHook,
    reset: resetReview,
    formState: { errors: reviewErrors },
  } = useForm();

  const { data: donation, isLoading: isDonationLoading } = useQuery({
    queryKey: ['donation', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation/${id}`);
      return res.data;
    },
    onError: () => toast.error('Failed to load donation details'),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-reviews?donationId=${id}`);
      return res.data;
    },
  });

  const { data: isFavorite = false, refetch: refetchFavorite } = useQuery({
    queryKey: ['favorite', id, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/check?userEmail=${user.email}&donationId=${id}`);
      return res.data.isFavorite;
    },
    enabled: !!user?.email && !!id
  });

  const toggleFavorite = async () => {
    try {
      const res = await axiosSecure.post('/favorites/toggle', {
        userEmail: user.email,
        donationId: id,
      });
      toast.success(res.data.message);
      refetchFavorite();
    } catch {
      toast.error('Failed to update favorite');
    }
  };

  // const { data: myRequest } = useQuery({
  //   queryKey: ['mySingleRequest', id, user?.email],
  //   queryFn: async () => {
  //     if (!user?.email || !id) return null;
  //     const res = await axiosSecure.get(
  //       `/donation-requests/my/single?donationId=${id}&charityEmail=${user.email}`
  //     );
  //     return res.data;
  //   },
  //   enabled: !!user?.email && !!id,
  // });


  // const handleRequestButtonClick = async () => {
  //   try {
  //     const res = await axiosSecure.get(`/donation-requests/check?donationId=${id}&charityEmail=${user.email}`);
  //     const request = res.data?.request;
  //     if (request && request.status === 'Pending') {
  //       toast.info('You have already requested this donation.');
  //       return;
  //     }
  //     setRequestModalOpen(true);
  //   } catch {
  //     toast.error('Failed to check request status.');
  //   }
  // };
  // 2. For checking if already requested (new)
  const { data: checkRequest } = useQuery({
    queryKey: ['checkRequest', id, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/check?donationId=${id}&charityEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email && !!id,
  });
  console.log(checkRequest?.request)
  const onSubmit = async (data) => {
    try {
      await axiosSecure.post('/donation-requests', {
        donationId: id,
        donationTitle: donation.title,
        restaurantName: donation.restaurantName,
        charityName: user.displayName,
        charityEmail: user.email,
        requestDescription: data.requestDescription,
        pickupTime: data.pickupTime,
        status: 'Pending',
      });

      toast.success('Request submitted!');
      setRequestModalOpen(false);
      reset();
      queryClient.invalidateQueries(['donation', id]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit request!');
    }
  };


  const confirmPickup = async () => {
    if (!checkRequest?.request?._id) {
      toast.error('Request ID not found');
      return;
    }

    try {
      await axiosSecure.patch(`/donation-requests/${checkRequest?.request?._id}/confirm-pickup`);
      toast.success('Donation marked as Picked Up!');
      queryClient.invalidateQueries(['donation', id]);
      queryClient.invalidateQueries(['myRequests', id, user?.email]);
    } catch {
      toast.error('Failed to confirm pickup');
    }
  };

  const handleReviewSubmit = async ({ description, rating }) => {
    try {
      await axiosSecure.post('/donation-reviews', {
        donationId: id,
        reviewerName: user.displayName,
        reviewerEmail: user.email,
        reviewerImage: user.photoURL,
        restaurantEmail: donation.restaurantEmail,
        rating,
        description,
      });

      toast.success('Review submitted!');
      setReviewModalOpen(false);
      resetReview();
      queryClient.invalidateQueries(['reviews', id]);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review!');
    }
  };

  if (isDonationLoading) return <p className="py-10 text-center text-lg">Loading donation details...</p>;
  if (!donation) return <p className="py-10 text-center text-lg">Donation not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center mb-8">{donation.title}</h1>

      {/* Main grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Image */}
        {donation.image && (
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Middle: Donation & Pickup Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Donation Details */}
          <section className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Donation Details</h2>
            <p><strong>Food Type:</strong> <span className="text-gray-700">{donation.foodType}</span></p>
            <p><strong>Quantity:</strong> <span className="text-gray-700">{donation.quantity} {donation.quantityUnit}</span></p>
            <p><strong>Pickup Time Window:</strong> <span className="text-gray-700">{donation.pickupStart} - {donation.pickupEnd}</span></p>
            <p><strong>Pickup Location:</strong> <span className="text-gray-700">{donation.location}</span></p>
          </section>

          {/* Restaurant Info */}
          <section className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Restaurant Information</h2>
            <p><strong>Name:</strong> <span className="text-gray-700">{donation.restaurantName}</span></p>
            <p><strong>Email:</strong> <a href={`mailto:${donation.restaurantEmail}`} className="text-blue-600 hover:underline">{donation.restaurantEmail}</a></p>
          </section>

          {/* Status */}
          <section className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Status</h2>
            <span
              className={`inline-block px-4 py-2 rounded-full text-white font-semibold
                ${donation.status === 'Verified' ? 'bg-green-600' :
                  donation.status === 'Picked Up' ? 'bg-blue-600' :
                    donation.status === 'Rejected' ? 'bg-red-600' :
                      'bg-gray-500'
                }`}
            >
              {donation.status === "Verified" ? 'Available' : donation.status}
            </span>
          </section>

          {/* Actions */}
          <section className="flex flex-wrap gap-4 mt-4">
            {!roleLoading && (role === 'user' || role === 'charity') && (
              <>
                {/* Add to Favorites */}
                <button
                  onClick={toggleFavorite}
                  className={`btn btn-outline ${isFavorite ? 'btn-success' : ''} flex-grow md:flex-grow-0`}
                >
                  {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
                </button>

                {/* Add Review */}
                <button
                  className="btn btn-secondary flex-grow md:flex-grow-0"
                  onClick={() => setReviewModalOpen(true)}
                >
                  Add Review
                </button>

                {/* Charity-only buttons */}
                {role === 'charity' && (
                  <>
                    {donation?.status !== 'Picked Up' && (
                      <>
                        {checkRequest?.request?.status !== 'Accepted' && (
                          <button
                            className={`btn btn-primary flex-grow md:flex-grow-0 ${checkRequest?.request?.status === 'Pending' ? 'btn-disabled cursor-not-allowed' : ''}`}
                            onClick={() => {
                              if (checkRequest?.request?.status !== 'Pending') {
                                setRequestModalOpen(true);
                              }
                            }}
                            disabled={checkRequest?.request?.status === 'Pending'}
                          >
                            {checkRequest?.request?.status === 'Pending' ? 'Requested' : 'Request Donation'}
                          </button>
                        )}

                        {checkRequest?.request?.status === 'Accepted' && (
                          <button
                            className="btn btn-info text-white flex-grow md:flex-grow-0"
                            onClick={confirmPickup}
                          >
                            Confirm Pickup
                          </button>
                        )}
                      </>
                    )}


                  </>
                )}
              </>
            )}

          </section>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6 border-b pb-3">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="italic text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map(review => (
              <article
                key={review._id}
                className="border rounded-lg p-5 shadow-sm bg-gray-50"
                aria-label={`Review by ${review.reviewerName}`}
              >
                <header className="mb-2 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{review.reviewerName}</h3>
                  <span className="text-yellow-500 font-bold">Rating: {review.rating} / 5</span>
                </header>
                <p className="text-gray-700 whitespace-pre-wrap">{review.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Request Donation Modal */}
      {isRequestModalOpen && (
        <Modal onClose={() => setRequestModalOpen(false)}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-5 max-w-md">
            <h3 className="text-2xl font-bold mb-4 text-center">Request Donation</h3>

            <div>
              <label className="label font-semibold">Donation Title</label>
              <input
                type="text"
                value={donation.title}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="label font-semibold">Restaurant Name</label>
              <input
                type="text"
                value={donation.restaurantName}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="label font-semibold">Charity Name</label>
              <input
                type="text"
                value={user.displayName}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="label font-semibold">Charity Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="label font-semibold">Request Description</label>
              <textarea
                {...register('requestDescription', { required: true })}
                rows={4}
                placeholder="Describe your request and pickup details"
                className="textarea textarea-bordered w-full"
              />
              {errors.requestDescription && (
                <p className="text-red-500 text-sm mt-1">This field is required</p>
              )}
            </div>

            <div>
              <label className="label font-semibold">Pickup Time</label>

              <input
                type="time"
                {...register("pickupTime", { required: true })}
                className="input input-bordered w-full"

              />
              {errors.pickupTime && (
                <p className="text-red-500 text-sm mt-1">This field is required</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full mt-3">
              Submit Request
            </button>
          </form>
        </Modal>
      )}


      {/* Add Review Modal */}
      {isReviewModalOpen && (
        <Modal onClose={() => setReviewModalOpen(false)}>
          <form
            onSubmit={handleReviewSubmitHook((data) => {
              handleReviewSubmit({
                description: data.description,
                rating: parseFloat(data.rating),
              });
              resetReview(); // clear the form after submit
            })}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>

            <div>
              <label className="label font-semibold">Description</label>
              <textarea
                {...registerReview('description', { required: 'Description is required' })}
                rows="4"
                placeholder="Write your feedback"
                className="textarea textarea-bordered w-full"
              />
              {reviewErrors.description && (
                <p className="text-red-500 text-sm mt-1">{reviewErrors.description.message}</p>
              )}
            </div>

            <div>
              <label className="label font-semibold">Rating (1 to 5)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                {...registerReview('rating', {
                  required: 'Rating is required',
                  min: { value: 1, message: 'Min rating is 1' },
                  max: { value: 5, message: 'Max rating is 5' },
                })}
                placeholder="e.g., 4.5"
                className="input input-bordered w-full"
              />
              {reviewErrors.rating && (
                <p className="text-red-500 text-sm mt-1">{reviewErrors.rating.message}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Submit Review
            </button>
          </form>

        </Modal>
      )}
    </div>
  );
};

export default DonationDetails;
