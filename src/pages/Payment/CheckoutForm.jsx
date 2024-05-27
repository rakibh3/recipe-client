/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useCallback, useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ amount }) => {
  console.log(amount);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .post('/create-payment-intent', {
        price: amount * 100,
      })
      .then((response) => {
        console.log(response.data.clientSecret);
        setClientSecret(response.data.clientSecret);
      });
  }, [axiosSecure, amount]);

  const handlePaymentSuccess = useCallback(() => {
    axiosSecure
      .patch('/update-user-coins-after-purchase', { amount })
      .then(() => {})
      .catch((error) => {
        console.error('Error updating user coins:', error);
      });

    navigate('/recipes');
  }, [axiosSecure, amount, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      toast.error(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
    // COnfirm the payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || 'anonymous',
            name: user?.displayName || 'anonymous',
          },
        },
      });
    if (confirmError) {
      toast.error(confirmError.message);
    } else {
      if (paymentIntent?.status === 'succeeded') {
        toast.success('Payment succeeded');

        handlePaymentSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
              color: '#9e2146',
            },
          },
        }}
      />
      <button disabled={!stripe || !clientSecret} type="submit">
        Pay
      </button>
    </form>
  );
};
export default CheckoutForm;
