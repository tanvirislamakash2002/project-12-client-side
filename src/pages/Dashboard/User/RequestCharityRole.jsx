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

    const CHARITY_FEE = 25; // Fixed $25 fee

    //   // Check for existing requests
    useEffect(() => {
        const checkExistingRequest = async () => {
            try {
                const { data } = await axiosSecure.get(`/charity-requests?email=${user.email}`);
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
            // 1. Create payment intent
            const { data: { clientSecret } } = await axiosSecure.post('/create-payment-intent', {
                amount: CHARITY_FEE * 100,
                currency: 'usd', // Add currency
                metadata: { userEmail: user.email }
            });

            // 2. Confirm payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    }
                },
                // Add this critical line:
                //   setup_future_usage: 'off_session' // For future payments
            });

            if (error) {
                console.log('Stripe error:', error);
                toast.error(error.message);
                throw error;
            }

            // 3. Save request to database
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
            //   toast.error(error.response?.data?.message || 'Payment failed');
            console.error('Full Stripe Error:', error);
            toast.error(error.message || 'Payment failed');
        } finally {
            setLoading(false);
        }
    };

    if (hasPendingRequest) {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-xl font-bold mb-4">Charity Role Request</h2>
                <p className="text-gray-600 mb-4">
                    You already have a pending or approved charity role request.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="btn btn-primary"
                >
                    Return to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Request Charity Role</h2>
            <form
                onSubmit={handleSubmit}
                className="space-y-4">
                {/* Readonly User Info */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* Organization Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Organization Name *
                    </label>
                    <input
                        type="text"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        required
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Mission Statement */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Mission Statement *
                    </label>
                    <textarea
                        name="missionStatement"
                        value={formData.missionStatement}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="textarea textarea-bordered w-full"
                    />
                </div>

                {/* Payment Section */}
                <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Payment</h3>
                    <p className="text-gray-600 mb-2">Charity Role Fee: $
                        {CHARITY_FEE}
                    </p>

                    <div className="border rounded-lg p-3 mb-4">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#ef4444',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    //   disabled={!stripe || loading}
                    className="btn btn-primary w-full"
                >
                    {loading ? 'Processing...' : `Pay $${CHARITY_FEE}`}
                    {/* { 'Processing...' } */}
                </button>
            </form>
        </div>
    );
};

export default RequestCharityRole;