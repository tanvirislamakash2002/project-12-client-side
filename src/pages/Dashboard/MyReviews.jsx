import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch my reviews
const { data: myReviews = [], isLoading } = useQuery({
  queryKey: ['myReviews', user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/donation-reviews?reviewerEmail=${user?.email}`);
    return res.data;
  },
  enabled: !!user?.email
});

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/donation-reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myReviews", user?.email]);
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Review has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Reviews</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : myReviews.length === 0 ? (
        <p>You haven’t submitted any reviews yet.</p>
      ) : (
        <div className="grid gap-4">
          {myReviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 rounded-md shadow-sm bg-white"
            >
              <h3 className="text-xl font-semibold mb-1">
                {review.donation?.title || "Unknown Title"}
              </h3>
              <p className="text-gray-500 mb-1">
                <strong>Restaurant:</strong> {review.donation?.restaurantName || "Unknown Restaurant"}
              </p>
              <p className="text-gray-500 mb-1">
                <strong>Time:</strong>{" "}
                {new Date(review.createdAt).toLocaleString()}
              </p>
              <p className="mb-2">{review.description}</p>
              <button
                onClick={() => handleDelete(review._id)}
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
