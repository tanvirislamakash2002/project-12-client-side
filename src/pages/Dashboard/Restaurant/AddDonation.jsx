import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const AddDonation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

//   // Food type options
  const foodTypes = [
    "Bakery",
    "Produce",
    "Dairy",
    "Meat",
    "Prepared Meals",
    "Frozen Foods",
    "Canned Goods",
    "Other",
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log(data)
    try {
    //   Upload image if exists
    //   let imageUrl = "";
    //   if (imageFile) {
    //     const formData = new FormData();
    //     formData.append("image", imageFile);
        
        // const uploadRes = await axiosSecure.post("/upload", formData);
        // imageUrl = uploadRes.data.url;
    //   }

      const donationData = {
        ...data,
        restaurantName: user.displayName,
        restaurantEmail: user.email,
        // image: imageUrl,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

    //   Save to database
      const res = await axiosSecure.post("/add-donation", donationData);
      console.log('what', res)
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your donation has been submitted for approval.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        reset();
        setImageFile(null);
      }
    } 
    catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold">Add Food Donation</h2>
          <p className="text-gray-500">Help reduce waste by sharing surplus food</p>
        </div>

        {/* Donation Info */}
        <div className="border p-6 rounded-xl shadow-md space-y-6">
          <h3 className="font-semibold text-xl">Food Details</h3>
          
          {/* Donation Title */}
          <div>
            <label className="label">
              <span className="label-text">Donation Title*</span>
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full"
              placeholder="e.g., Surplus Pastries, Fresh Vegetables"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Food Type */}
          <div>
            <label className="label">
              <span className="label-text">Food Type*</span>
            </label>
            <select
              {...register("foodType", { required: "Food type is required" })}
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
              <p className="text-red-500 text-sm mt-1">{errors.foodType.message}</p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="label">
              <span className="label-text">Quantity*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 1, message: "Must be at least 1" },
                })}
                className="input input-bordered w-3/4"
                placeholder="e.g., 5"
              />
              <select
                {...register("quantityUnit", { required: true })}
                className="select select-bordered w-1/4"
              >
                <option value="portions">Portions</option>
                <option value="kg">Kilograms</option>
                <option value="lbs">Pounds</option>
              </select>
            </div>
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
            )}
          </div>

          {/* Pickup Time */}
          <div>
            <label className="label">
              <span className="label-text">Pickup Time Window*</span>
            </label>
            <input
              {...register("pickupTime", {
                required: "Pickup time is required",
              })}
              className="input input-bordered w-full"
              placeholder="e.g., 2:00 PM - 5:00 PM today"
            />
            {errors.pickupTime && (
              <p className="text-red-500 text-sm mt-1">{errors.pickupTime.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="label">
              <span className="label-text">Pickup Location*</span>
            </label>
            <textarea
              {...register("location", {
                required: "Location is required",
              })}
              className="textarea textarea-bordered w-full"
              placeholder="Full address or coordinates"
              rows={2}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="label">
              <span className="label-text">Food Image</span>
            </label>
            {/* <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="file-input file-input-bordered w-full"
            /> */}
                        <input
              {...register("image", { required: "image is required" })}
              className="input input-bordered w-full"
              placeholder="e.g., image of the donation"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Restaurant Info (readonly) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Restaurant Name</span>
              </label>
              <input
                value={user?.displayName || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Restaurant Email</span>
              </label>
              <input
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          {/* <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className=" flex items-center">
                <span className="loading loading-spinner"></span>
              <span className="ml-2">adding donation</span>
              </div>
            ) : (
              "Add Donation"
            )}
          </button> */}
          <button className="btn btn-primary">Add donation</button>
        </div>
      </form>
    </div>
  );
};

export default AddDonation;