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

  const { data: checkRequest } = useQuery({
    queryKey: ['checkRequest', id, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/check?donationId=${id}&charityEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email && !!id,
  });

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

  if (isDonationLoading) return <div className="flex w-52 flex-col gap-4">
    <div className="skeleton h-32 w-full"></div>
    <div className="skeleton h-4 w-28"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div>;
  if (!donation) return <p className="py-10 text-center text-lg">Donation not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-gray-800/25">
      
      <h1 className="text-4xl font-extrabold text-center mb-8 dark:text-white">{donation.title}</h1>

      {/* layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left section */}
        {donation.image && (
          <div className="rounded-lg overflow-hidden shadow-md dark:shadow-gray-800/25">
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Right section */}
        <div className="md:col-span-2 space-y-6">
          
          <section className="border rounded-lg p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-800/25">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2 dark:text-white dark:border-gray-600">Donation Details</h2>
            <p className="dark:text-gray-300"><strong className="dark:text-white">Food Type:</strong> <span className="text-gray-700 dark:text-gray-300">{donation.foodType}</span></p>
            <p className="dark:text-gray-300"><strong className="dark:text-white">Quantity:</strong> <span className="text-gray-700 dark:text-gray-300">{donation.quantity} {donation.quantityUnit}</span></p>
            <p className="dark:text-gray-300"><strong className="dark:text-white">Pickup Time Window:</strong> <span className="text-gray-700 dark:text-gray-300">{donation.pickupStart} - {donation.pickupEnd}</span></p>
            <p className="dark:text-gray-300"><strong className="dark:text-white">Pickup Location:</strong> <span className="text-gray-700 dark:text-gray-300">{donation.location}</span></p>
          </section>

          
          <section className="border rounded-lg p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-800/25">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2 dark:text-white dark:border-gray-600">Restaurant Information</h2>
            <p className="dark:text-gray-300"><strong className="dark:text-white">Name:</strong> <span className="text-gray-700 dark:text-gray-300">{donation.restaurantName}</span></p>
            <p className="dark:text-gray-300"><strong className="dark:text-white">Email:</strong> <span className="text-primary hover:underline dark:text-blue-400">{donation.restaurantEmail}</span></p>
          </section>

          <section className="border rounded-lg p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:shadow-gray-800/25">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2 dark:text-white dark:border-gray-600">Status</h2>
            <span
              className={`inline-block px-4 py-2 rounded-full text-white font-semibold
                ${donation.status === 'Verified' ? 'bg-green-600 dark:bg-green-700' :
                  donation.status === 'Picked Up' ? 'bg-blue-600 dark:bg-blue-700' :
                    donation.status === 'Rejected' ? 'bg-red-600 dark:bg-red-700' :
                      'bg-gray-500 dark:bg-gray-600'
                }`}
            >
              {donation.status === "Verified" ? 'Available' : donation.status}
            </span>
          </section>

          <section className="flex flex-wrap gap-4 mt-4">
            {!roleLoading && (role === 'user' || role === 'charity') && (
              <>
                {/* Add to Favorites */}
                <button
                  onClick={toggleFavorite}
                  className={`btn btn-outline dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 ${isFavorite ? 'btn-success dark:bg-green-800 dark:border-green-700' : ''} flex-grow md:flex-grow-0`}
                >
                  {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
                </button>

                {/* Add Review */}
                <button
                  className="btn btn-secondary flex-grow md:flex-grow-0 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
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
                            className={`btn btn-primary flex-grow md:flex-grow-0 dark:bg-blue-700 dark:border-blue-600 dark:text-white dark:hover:bg-blue-600 ${checkRequest?.request?.status === 'Pending' ? 'btn-disabled cursor-not-allowed dark:bg-gray-600 dark:border-gray-500' : ''}`}
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
                            className="btn btn-info text-white flex-grow md:flex-grow-0 dark:bg-cyan-700 dark:border-cyan-600 dark:hover:bg-cyan-600"
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
        <h2 className="text-3xl font-bold mb-6 border-b pb-3 dark:text-white dark:border-gray-600">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="italic text-gray-500 dark:text-gray-400">No reviews yet.</p>
        ) : (
          <div className="space-y-6">
            {reviews.map(review => (
              <article
                key={review._id}
                className="border rounded-lg p-5 shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-800/25"
                aria-label={`Review by ${review.reviewerName}`}
              >
                <header className="mb-2 flex justify-between items-center">
                  <h3 className="text-lg font-semibold dark:text-white">{review.reviewerName}</h3>
                  <span className="text-yellow-500 font-bold dark:text-yellow-400">Rating: {review.rating} / 5</span>
                </header>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{review.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Request Donation Modal */}
      {isRequestModalOpen && (
        <Modal onClose={() => setRequestModalOpen(false)}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-5 max-w-md dark:bg-gray-800 dark:text-white">
            <h3 className="text-2xl font-bold mb-4 text-center dark:text-white">Request Donation</h3>

            <div>
              <label className="label font-semibold dark:text-gray-300">Donation Title</label>
              <input
                type="text"
                value={donation.title}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="label font-semibold dark:text-gray-300">Restaurant Name</label>
              <input
                type="text"
                value={donation.restaurantName}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="label font-semibold dark:text-gray-300">Charity Name</label>
              <input
                type="text"
                value={user.displayName}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="label font-semibold dark:text-gray-300">Charity Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="label font-semibold dark:text-gray-300">Request Description</label>
              <textarea
                {...register('requestDescription', { required: true })}
                rows={4}
                placeholder="Describe your request and pickup details"
                className="textarea textarea-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.requestDescription && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">This field is required</p>
              )}
            </div>

            <div>
              <label className="label font-semibold dark:text-gray-300">Pickup Time</label>

              <input
                type="time"
                {...register("pickupTime", { required: true })}
                className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"

              />
              {errors.pickupTime && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">This field is required</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full mt-3 dark:bg-blue-700 dark:border-blue-600 dark:hover:bg-blue-600">
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
            className="space-y-4 dark:bg-gray-800 dark:text-white"
          >
            <h3 className="text-lg font-semibold mb-2 dark:text-white">Leave a Review <span className='text-primary underline text-sm dark:text-blue-400'>{user?.displayName}</span></h3>

            <div>
              <label className="label font-semibold dark:text-gray-300">Description</label>
              <textarea
                {...registerReview('description', { required: 'Description is required' })}
                rows="4"
                placeholder="Write your feedback"
                className="textarea textarea-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {reviewErrors.description && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{reviewErrors.description.message}</p>
              )}
            </div>

            <div>
              <label className="label font-semibold dark:text-gray-300">Rating (1 to 5)</label>
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
                className="input input-bordered w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {reviewErrors.rating && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{reviewErrors.rating.message}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full dark:bg-blue-700 dark:border-blue-600 dark:hover:bg-blue-600">
              Submit Review
            </button>
          </form>

        </Modal>
      )}
    </div>
  );
};

export default DonationDetails;
