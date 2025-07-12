import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const formatDate = (iso) => new Date(iso).toLocaleString();

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/charity-requests-transactions?email=${user.email}`);        
        return res.data;
      } catch (error) {
        toast.error('Failed to load transaction history');
        throw new Error('Fetch failed');
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>

      {isLoading ? (
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
                    {/* {new Date(tx.createdAt).toLocaleDateString()} */}
                    {formatDate(tx.createdAt)}
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
