import { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const ReviewModal = ({ donation, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const {user} =useAuth();
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async () => {
    await axiosSecure.post('/donation-reviews', {
      donationId: donation._id,
      reviewerName:user.displayName,
      reviewerEmail:user.email,
      description,
      rating,
    });
    toast.success('Review submitted!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-xl font-bold mb-2">Leave a Review</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 mb-2"
          rows={4}
          placeholder="Write your review..."
        />
        <input
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-2 w-full mb-2"
          placeholder="Rating (1-5)"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="btn">Cancel</button>
          <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
