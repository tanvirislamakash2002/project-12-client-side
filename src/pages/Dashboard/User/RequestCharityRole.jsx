import { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const RequestCharityRole = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);

  const [formData, setFormData] = useState({
    organizationName: '',
    missionStatement: ''
  });

  const CHARITY_FEE = 25;

  useEffect(() => {
    const checkExistingRequest = async () => {
      try {
        const { data } = await axiosSecure.get(`/charity-requests-transactions?email=${user.email}`);
        if (data.some(req => req.status === 'pending' || req.status === 'approved')) {
          setHasPendingRequest(true);
        }
      } catch (error) {
        toast.error('Error checking existing requests');
      }
    };
    if (user?.email) checkExistingRequest();
  }, [user, axiosSecure]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const { data: { clientSecret } } = await axiosSecure.post('/create-payment-intent', {
        amount: CHARITY_FEE * 100,
        currency: 'usd',
        metadata: { userEmail: user.email }
      });

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
        throw error;
      }

      if (paymentIntent.status === 'succeeded') {
        const requestData = {
          userId: user._id,
          userEmail: user.email,
          userName: user.displayName,
          organizationName: formData.organizationName,
          missionStatement: formData.missionStatement,
          paymentAmount: CHARITY_FEE,
          paymentId: paymentIntent.id,
          status: 'pending'
        };

        await axiosSecure.post('/charity-request', requestData);
        toast.success('Request submitted for admin approval!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Stripe error:', error);
      toast.error(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-center">Request Charity Role</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Info */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="label">Your Name</label>
            <input
              type="text"
              value={user?.displayName || ''}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="label">Email Address</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Org Info */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="label">Organization Name *</label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Mission Statement *</label>
            <textarea
              name="missionStatement"
              value={formData.missionStatement}
              onChange={handleInputChange}
              required
              rows={4}
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>

        {/* Payment Info */}
        <div className="mt-6">
          <div className="mb-2 text-sm text-gray-700 font-medium">
            Payment: ${CHARITY_FEE}
          </div>
          <div className="border rounded-lg p-3 shadow-sm bg-gray-50">
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

        {/* Submit */}
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn btn-primary w-full"
        >
          {loading ? 'Processing...' : `Pay $${CHARITY_FEE} & Submit Request`}
        </button>
      </form>
    </div>
  );
};

export default RequestCharityRole;
