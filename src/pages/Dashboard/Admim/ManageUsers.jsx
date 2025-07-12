import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Role change mutation
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

  // Delete user mutation
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

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border capitalize">{user.role}</td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    onClick={() => roleMutation.mutate({ id: user._id, role: "admin" })}
                    className="btn btn-xs btn-success"
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => roleMutation.mutate({ id: user._id, role: "restaurant" })}
                    className="btn btn-xs btn-info"
                  >
                    Make Restaurant
                  </button>
                  <button
                    onClick={() => roleMutation.mutate({ id: user._id, role: "charity" })}
                    className="btn btn-xs btn-warning"
                  >
                    Make Charity
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(user._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
