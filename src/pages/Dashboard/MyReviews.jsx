import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: myReviews = [], isLoading } = useQuery({
    queryKey: ['myReviews', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-reviews?reviewerEmail=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

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
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">My Reviews</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : myReviews.length === 0 ? (
        <div className="text-center text-gray-500">You haven’t submitted any reviews yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {myReviews.map((review) => (
            <div
              key={review._id}
              className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="card-body space-y-2">
                <h2 className="card-title text-lg font-semibold text-primary">
                  {review.donation?.title || "Unknown Donation"}
                </h2>
                <p className="text-sm text-gray-600">
                  <strong>Restaurant:</strong> {review.donation?.restaurantName || "Unknown"}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Reviewed:</strong> {new Date(review.createdAt).toLocaleString()}
                </p>
                <p className="text-sm">{review.description}</p>

                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyReviews;
