import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      return axiosSecure.patch(`/users/${id}/role`, { role });
    },
    onSuccess: () => {
      toast.success("User role updated!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Failed to update role."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/users/${id}`);
    },
    onSuccess: () => {
      toast.success("User deleted!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Failed to delete user."),
  });

  if (isLoading) return <p className="text-center py-8">Loading users...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">Manage Users</h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200 shadow-sm">
            <thead className="bg-base-200 text-base-content text-primary">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-base-100">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`badge px-3 py-1 capitalize ${
                        user.role === "admin"
                          ? "badge-success text-white"
                          : user.role === "restaurant"
                          ? "badge-info text-white"
                          : user.role === "charity"
                          ? "badge-warning text-white"
                          : "badge-ghost"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-y-1 sm:space-x-2 sm:space-y-0 flex flex-col sm:flex-row">
                    <button
                      onClick={() => roleMutation.mutate({ id: user._id, role: "admin" })}
                      className="btn btn-xs btn-success text-white"
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => roleMutation.mutate({ id: user._id, role: "restaurant" })}
                      className="btn btn-xs btn-info text-white"
                    >
                      Restaurant
                    </button>
                    <button
                      onClick={() => roleMutation.mutate({ id: user._id, role: "charity" })}
                      className="btn btn-xs btn-warning text-white"
                    >
                      Charity
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(user._id)}
                      className="btn btn-xs btn-error text-white"
                    >
                      Delete
                    </button>
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

export default ManageUsers;
