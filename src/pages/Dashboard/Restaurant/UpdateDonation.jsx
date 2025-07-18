import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateDonation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  // Donation data passed from MyDonation page
  const donation = location.state || {};

  const [imageUrl, setImageUrl] = useState(donation.image || '');
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: donation.title || '',
      foodType: donation.foodType || '',
      quantity: donation.quantity || '',
      quantityUnit: donation.quantityUnit || 'portions',
      pickupTime: donation.pickupTime || '',
      location: donation.location || '',
    },
  });

  // If donation data arrives later, update form values
  useEffect(() => {
    if (donation) {
      setValue('title', donation.title);
      setValue('foodType', donation.foodType);
      setValue('quantity', donation.quantity);
      setValue('quantityUnit', donation.quantityUnit);
      setValue('pickupTime', donation.pickupTime);
      setValue('location', donation.location);
      setImageUrl(donation.image || '');
    }
  }, [donation, setValue]);

  const foodTypes = [
    'Bakery',
    'Produce',
    'Dairy',
    'Meat',
    'Prepared Meals',
    'Frozen Foods',
    'Canned Goods',
    'Other',
  ];

  const onSubmit = async (data) => {
    if (!imageUrl) {
      return Swal.fire('Image Required', 'Please upload an image.', 'warning');
    }
    setIsSubmitting(true);
    try {
      const updatedDonation = {
        ...data,
        image: imageUrl,
        // keep other fields if needed, like restaurantName, restaurantEmail
        status: donation.status || 'Pending', // keep existing status
      };

      const res = await axiosSecure.patch(`/donation/${id}`, updatedDonation);
      if (res.data.modified) {
        Swal.fire('Success', 'Donation updated!', 'success');
        navigate(`/donationDetails/${id}`); // redirect to details page
      } else {
        Swal.fire('Info', 'No changes made.', 'info');
      }
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imbb_Upload_Key}`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await res.json();
      setImageUrl(data.data.url);
      Swal.fire('Image Uploaded', 'Successfully uploaded!', 'success');
    } catch (err) {
      Swal.fire('Upload Failed', err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Update Donation</h2>
        <p className="text-gray-500 text-center mb-8">
          Update the details of your food donation below
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <label className="label-text font-medium">Donation Title*</label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="input input-bordered w-full"
                placeholder="e.g., Extra Sandwiches"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="label-text font-medium">Food Type*</label>
              <select
                {...register('foodType', { required: 'Food type is required' })}
                className="select select-bordered w-full"
              >
                <option value="">Select food type</option>
                {foodTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.foodType && (
                <p className="text-sm text-red-500">{errors.foodType.message}</p>
              )}
            </div>

            <div>
              <label className="label-text font-medium">Quantity*</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  min={1}
                  {...register('quantity', {
                    required: 'Quantity is required',
                    min: { value: 1, message: 'Must be at least 1' },
                  })}
                  className="input input-bordered w-2/3"
                  placeholder="e.g., 5"
                />
                <select
                  {...register('quantityUnit', { required: true })}
                  className="select select-bordered w-1/3"
                >
                  <option value="portions">Portions</option>
                  <option value="kg">Kilograms</option>
                  <option value="lbs">Pounds</option>
                </select>
              </div>
              {errors.quantity && (
                <p className="text-sm text-red-500">{errors.quantity.message}</p>
              )}
            </div>

            <div>
              <label className="label-text font-medium">Pickup Time Window*</label>
              <input
                {...register('pickupTime', { required: 'Pickup time is required' })}
                className="input input-bordered w-full"
                placeholder="e.g., 2:00 PM - 5:00 PM"
              />
              {errors.pickupTime && (
                <p className="text-sm text-red-500">{errors.pickupTime.message}</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div>
              <label className="label-text font-medium">Pickup Location*</label>
              <textarea
                {...register('location', { required: 'Location is required' })}
                className="textarea textarea-bordered w-full"
                rows={3}
                placeholder="e.g., 123 Food St, City"
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="label-text font-medium">Food Image*</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />
              {uploading && (
                <p className="text-sm text-blue-500 mt-1">Uploading...</p>
              )}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="mt-3 rounded-md max-h-48 object-cover"
                />
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-between mt-6">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate('/dashboard/myDonations')}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary px-6"
              disabled={isSubmitting || uploading}
            >
              {isSubmitting
                ? <span className="loading loading-spinner"></span>
                : uploading
                ? 'Uploading...'
                : 'Update Donation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonation;
