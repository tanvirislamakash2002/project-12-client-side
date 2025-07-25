import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import imageCompression from "browser-image-compression";

const UpdateDonation = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: donation,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (donation) {
      reset({
        title: donation.title || "",
        foodType: donation.foodType || "",
        quantity: donation.quantity || "",
        quantityUnit: donation.quantityUnit || "portions",
        pickupStart: donation.pickupStart || "",
        pickupEnd: donation.pickupEnd || "",
        location: donation.location || "",
      });
      setImageUrl(donation.image || "");
    }
  }, [donation, reset]);

  const updateDonationMutation = useMutation({
    mutationFn: async (updatedDonation) => {
      const res = await axiosSecure.patch(`/donation/${id}`, updatedDonation);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.modified) {
        Swal.fire("Success", "Donation updated!", "success");
        queryClient.invalidateQueries(["donation", id]);
        navigate("/dashboard/myDonations");
      } else {
        Swal.fire("Info", "No changes made.", "info");
      }
    },
    onError: (err) => {
      Swal.fire("Error", err.message, "error");
    },
  });

  const onSubmit = (data) => {
    if (!imageUrl) {
      return Swal.fire("Image Required", "Please upload an image.", "warning");
    }

    if (data.pickupStart >= data.pickupEnd) {
      return Swal.fire("Invalid Time", "Start time must be before end time.", "error");
    }

    const updatedDonation = {
      ...data,
      image: imageUrl,
      restaurantName: donation.restaurantName || "",
      restaurantEmail: donation.restaurantEmail || "",
      status: donation.status || "Pending",
      createdAt: donation.createdAt || new Date().toISOString(),
    };

    updateDonationMutation.mutate(updatedDonation);
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(imageFile, options);

      const formData = new FormData();
      formData.append("image", compressedFile);

      const res = await axiosSecure.post("/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      const uploadedUrl = res?.data?.data?.url;
      if (!uploadedUrl) throw new Error("No image URL returned from server");

      setImageUrl(uploadedUrl);
      Swal.fire("Image Uploaded", "Successfully uploaded!", "success");
    } catch (err) {
      Swal.fire("Upload Failed", err.message, "error");
    } finally {
      setUploading(false);
    }
  };



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

  if (isLoading) return <div className="text-center py-20">Loading donation...</div>;
  if (isError) return <div className="text-center text-red-500 py-20">Error loading donation.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Update Food Donation</h2>
        <p className="text-gray-500 text-center mb-8">
          Update the details of your food donation below
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <label className="label-text font-medium">Donation Title*</label>
              <input
                {...register("title", { required: "Title is required" })}
                className="input input-bordered w-full"
                placeholder="e.g., Extra Sandwiches"
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div>
              <label className="label-text font-medium">Food Type*</label>
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
                <p className="text-sm text-red-500">{errors.foodType.message}</p>
              )}
            </div>

            <div>
              <label className="label-text font-medium">Quantity*</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  min={1}
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: { value: 1, message: "Must be at least 1" },
                  })}
                  className="input input-bordered w-2/3"
                  placeholder="e.g., 5"
                />
                <select
                  {...register("quantityUnit", { required: true })}
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

            {/* Pickup Time Window */}
            <div>
              <label className="label-text font-medium mb-1 block">Pickup Time Window*</label>
              <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl">
                <div className="w-1/2">
                  <label className="block text-sm text-gray-500 mb-1">From</label>
                  <input
                    type="time"
                    {...register("pickupStart", { required: "Start time is required" })}
                    className="input input-bordered w-full"
                  />
                  {errors.pickupStart && (
                    <p className="text-sm text-red-500">{errors.pickupStart.message}</p>
                  )}
                </div>

                <div className="text-gray-400 font-semibold">to</div>

                <div className="w-1/2">
                  <label className="block text-sm text-gray-500 mb-1">To</label>
                  <input
                    type="time"
                    {...register("pickupEnd", { required: "End time is required" })}
                    className="input input-bordered w-full"
                  />
                  {errors.pickupEnd && (
                    <p className="text-sm text-red-500">{errors.pickupEnd.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div>
              <label className="label-text font-medium">Pickup Location*</label>
              <textarea
                {...register("location", { required: "Location is required" })}
                className="textarea textarea-bordered w-full"
                rows={3}
                placeholder="e.g., 123 Food St, City"
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>

            {imageUrl && (
              <div className="mt-2">
                <img src={imageUrl} alt="Uploaded Food" className="w-40 rounded-xl border" />
              </div>
            )}

            <div>
              <label className="label-text font-medium">Food Image*</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />
              {uploading && <progress value={uploadProgress} max="100" className="progress progress-info w-full"></progress>}

              {uploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
            </div>

            <div>
              <label className="label-text font-medium">Restaurant Name</label>
              <input
                value={donation.restaurantName || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            <div>
              <label className="label-text font-medium">Restaurant Email</label>
              <input
                value={donation.restaurantEmail || ""}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
          </div>

          {/* Submit + Cancel Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="btn btn-primary px-6"
              disabled={updateDonationMutation.isPending || uploading}
            >
              {updateDonationMutation.isPending ? (
                <span className="loading loading-spinner"></span>
              ) : uploading ? (
                "Uploading..."
              ) : (
                "Update Donation"
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/myDonations")}
              className="btn btn-outline btn-secondary px-6"
              disabled={updateDonationMutation.isPending || uploading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonation;
