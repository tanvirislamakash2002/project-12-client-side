import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const RequestCharityRole = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    organizationName: '',
    missionStatement: ''
  });

  const CHARITY_FEE = 25;

  // Check for existing requests
  const { data: existingRequest, isLoading: checkingRequest } = useQuery({
    queryKey: ['charity-requests', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/charity-requests-transactions?email=${user.email}`);
      return res.data;
    }
  });

  const hasPendingRequest = existingRequest?.some(
    (req) => req.status === 'pending' || req.status === 'approved'
  );

  // Handle payment & request submission
  const { mutate: submitRequest, isPending: submitting } = useMutation({
    mutationFn: async () => {
      // Create payment intent
      const { data: { clientSecret } } = await axiosSecure.post('/create-payment-intent', {
        amount: CHARITY_FEE * 100,
        currency: 'usd',
        metadata: { userEmail: user.email }
      });

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email
          }
        }
      });

      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }

      // Submit request if payment succeeded
      if (paymentIntent.status === 'succeeded') {
        const requestData = {
          userId: user._id,
          userName: user.displayName,
          userEmail: user.email,
          organizationName: formData.organizationName,
          missionStatement: formData.missionStatement,
          paymentAmount: CHARITY_FEE,
          paymentId: paymentIntent.id,
          status: 'pending'
        };

        await axiosSecure.post('/charity-request', requestData);
        return true;
      } else {
        throw new Error('Payment did not succeed');
      }
    },
    onSuccess: () => {
      toast.success('Request submitted for admin approval!');
      queryClient.invalidateQueries({ queryKey: ['charity-requests'] });
      navigate('/dashboard');
    },
    onError: (err) => {
      toast.error(err.message || 'Submission failed');
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.error('Stripe not loaded yet');
      return;
    }
    submitRequest();
  };

  // While checking existing request
  if (checkingRequest) {
    return <p className="text-center mt-10">Checking request status...</p>;
  }

  if (hasPendingRequest) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Charity Role Request</h2>
        <p className="text-gray-600 mb-6">You already have a pending or approved request.</p>
        <button onClick={() => navigate('/dashboard')} className="btn btn-primary w-full">
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-900/50 space-y-6">
      <h2 className="text-2xl font-bold text-center dark:text-white">Request Charity Role</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="label dark:text-gray-300">Your Name</label>
            <input
              type="text"
              value={user?.displayName || ''}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="label dark:text-gray-300">Email Address</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="label dark:text-gray-300">Organization Name *</label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              required
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          <div>
            <label className="label dark:text-gray-300">Mission Statement *</label>
            <textarea
              name="missionStatement"
              value={formData.missionStatement}
              onChange={handleInputChange}
              required
              rows={4}
              className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
            Payment: ${CHARITY_FEE}
          </div>
          <div className="border rounded-lg p-3 shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#374151',
                    '::placeholder': { color: '#9CA3AF' },
                  },
                  invalid: { color: '#DC2626' }
                }
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || submitting}
          className="btn btn-primary w-full dark:bg-primary dark:border-primary dark:hover:bg-primary/80"
        >
          {submitting ? 'Processing...' : `Pay $${CHARITY_FEE} & Submit Request`}
        </button>
      </form>
    </div>
  );
};

export default RequestCharityRole;
