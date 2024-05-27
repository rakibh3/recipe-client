import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Key);
const Payment = () => {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [selectedCoins, setSelectedCoins] = useState(0);

  const handleBuyNow = (amount, coins) => {
    setSelectedAmount(amount);
    setSelectedCoins(coins);
  };
  return (
    <>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto my-12 px-4 md:px-0">
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">100 Coins</h3>
                <p className="text-rose-500">Buy 100 coins for $1</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">$1</span>
                <button
                  className="inline-flex items-center justify-center px-4 py-2 bg-rose-500 text-white font-medium rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  onClick={() => handleBuyNow(1, 100)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">500 Coins</h3>
                <p className="text-rose-500">Buy 500 coins for $5</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">$5</span>
                <button
                  className="inline-flex items-center justify-center px-4 py-2 bg-rose-500 text-white font-medium rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  onClick={() => handleBuyNow(5, 500)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">1000 Coins</h3>
                <p className="text-rose-500">Buy 1000 coins for $10</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">$10</span>
                <button
                  className="inline-flex items-center justify-center px-4 py-2 bg-rose-500 text-white font-medium rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  onClick={() => handleBuyNow(10, 1000)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto my-12 px-4 md:px-0">
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={selectedAmount * 100} />
          </Elements>
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Order Summary</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Coins</span>
                  <span>{selectedCoins}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount</span>
                  <span>${selectedAmount}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${selectedAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
