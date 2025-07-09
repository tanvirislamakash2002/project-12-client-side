import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCheck, FaTimes, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ManageRoleRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [processingId, setProcessingId] = useState(null);

  // Fetch all role requests
  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['charity-requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/charity-requests');
      return res.data;
    }
  });

  // Update request status
  const updateRequestStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      setProcessingId(id);
      const res = await axiosSecure.patch(`/charity-requests/${id}`, { status });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(`Request ${data.status}!`);
      queryClient.invalidateQueries(['charity-requests']);
      // Optional: Send email notification
      sendNotification(data.userEmail, data.status);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Update failed');
    },
    onSettled: () => {
      setProcessingId(null);
    }
  });

  const sendNotification = (email, status) => {
    // This would call your backend email service
    axiosSecure.post('/send-notification', {
      email,
      subject: `Your Charity Request was ${status}`,
      message: `Your request for charity role has been ${status}.`
    });
  };

  const handleApprove = (id) => {
    updateRequestStatus.mutate({ id, status: 'approved' });
  };

  const handleReject = (id) => {
    updateRequestStatus.mutate({ id, status: 'rejected' });
  };

  if (isLoading) return <div className="text-center py-8">Loading requests...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Manage Role Requests</h2>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>User</th>
              <th>Organization</th>
              <th>Mission</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No pending requests
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td>
                    <div className="font-medium">{request.userName}</div>
                    <div className="text-sm text-gray-500">{request.userEmail}</div>
                  </td>
                  <td>{request.organizationName}</td>
                  <td className="max-w-xs truncate">{request.missionStatement}</td>
                  <td className="font-mono text-sm">{request.paymentId}</td>
                  <td>
                    <span className={`badge ${
                      request.status === 'pending' ? 'badge-warning' :
                      request.status === 'approved' ? 'badge-success' : 'badge-error'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    {request.status === 'pending' ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(request._id)}
                          disabled={processingId === request._id}
                          className="btn btn-sm btn-success"
                        >
                          {processingId === request._id ? (
                            <span className="loading loading-spinner"></span>
                          ) : (
                            <FaCheck />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(request._id)}
                          disabled={processingId === request._id}
                          className="btn btn-sm btn-error"
                        >
                          {processingId === request._id ? (
                            <span className="loading loading-spinner"></span>
                          ) : (
                            <FaTimes />
                          )}
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button 
                        className="btn btn-ghost btn-sm"
                        onClick={() => sendNotification(request.userEmail, request.status)}
                        title="Resend notification"
                      >
                        <FaEnvelope />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoleRequests;