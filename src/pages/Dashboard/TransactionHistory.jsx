import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const formatDate = (iso) => new Date(iso).toLocaleString();

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/charity-requests-transactions?email=${user.email}`);
        return res.data;
      } catch (error) {
        toast.error("Failed to load transaction history");
        throw new Error("Fetch failed");
      }
    },
  });

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-10">Transaction History</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center text-gray-500">No transactions found.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="table w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-base-100">
                  <td className="whitespace-nowrap">{tx.paymentId}</td>
                  <td className="text-green-600 font-semibold">${tx.amount}</td>
                  <td>{formatDate(tx.createdAt)}</td>
                  <td>
                    <span
                      className={`badge text-white ${
                        tx.status === "approved"
                          ? "badge-success"
                          : tx.status === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default TransactionHistory;
