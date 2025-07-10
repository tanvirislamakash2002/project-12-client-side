import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        console.log(user.email)
        const { data } = await axiosSecure.get(`/charity-request?email=${user.email}`);
        setTransactions(data);
      } catch (error) {
        toast.error('Failed to load transaction history');
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchTransactions();
    }
  }, [user, axiosSecure]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">Transaction ID</th>
                <th className="py-2 px-4 border-b">Amount Paid ($)</th>
                <th className="py-2 px-4 border-b">Request Date</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{tx.paymentId}</td>
                  <td className="py-2 px-4 border-b">${tx.amount}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b capitalize">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
