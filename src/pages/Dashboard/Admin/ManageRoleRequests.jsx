import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCheck, FaTimes, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useState } from 'react';

const ManageRoleRequests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [processingId, setProcessingId] = useState(null);

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['charity-requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/charity-requests');
      return res.data;
    }
  });

  const updateRequestStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      setProcessingId(id);
      const res = await axiosSecure.patch(`/charity-requests/${id}`, { status });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(`Request ${data.status}!`);
      queryClient.invalidateQueries(['charity-requests']);
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
    toast.error( `currently I didn't added the feature`);
    // axiosSecure.post('/send-notification', {
    //   email,
    //   subject: `Your Charity Request was ${status}`,
    //   message: `Your request for charity role has been ${status}.`
    // });
  };

  const handleApprove = (id) => updateRequestStatus.mutate({ id, status: 'approved' });
  const handleReject = (id) => updateRequestStatus.mutate({ id, status: 'rejected' });

  if (isLoading) {
    return <div className="text-center py-8">Loading requests...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">Manage Role Requests</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
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
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No pending requests
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request._id} className="hover:bg-base-100">
                  <td className="px-4 py-2">
                    <div className="font-semibold">{request.userName}</div>
                    <div className="text-sm text-gray-500">{request.userEmail}</div>
                  </td>
                  <td className="px-4 py-2">{request.organizationName}</td>
                  <td className="px-4 py-2 max-w-xs truncate">{request.missionStatement}</td>
                  <td className="px-4 py-2 font-mono text-sm">{request.paymentId}</td>
                  <td className="px-4 py-2">
                    <span className={`badge text-white px-3 py-1 ${
                      request.status === 'pending'
                        ? 'badge-warning'
                        : request.status === 'approved'
                        ? 'badge-success'
                        : 'badge-error'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {request.status === 'pending' ? (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleApprove(request._id)}
                          disabled={processingId === request._id}
                          className="btn btn-sm btn-success text-white"
                        >
                          {processingId === request._id ? (
                            <span className="loading loading-spinner"></span>
                          ) : (
                            <>
                              <FaCheck className="mr-1" /> Approve
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleReject(request._id)}
                          disabled={processingId === request._id}
                          className="btn btn-sm btn-error text-white"
                        >
                          {processingId === request._id ? (
                            <span className="loading loading-spinner"></span>
                          ) : (
                            <>
                              <FaTimes className="mr-1" /> Reject
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => sendNotification(request.userEmail, request.status)}
                        className="btn btn-sm btn-outline btn-info"
                        title="Resend notification"
                      >
                        <FaEnvelope className="mr-1" />
                        Notify
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
