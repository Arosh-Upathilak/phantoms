import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51QVHsVDwN2wl0CGWHVNfAf55kmipeSlvyGeMz7bZ73HtkZI6cWaYTrMe2efChawehSE3cEyDUI9o0sbxyjNyaD2m00vLlarLtl'); // Publishable key

function App() {
  return (
    <div className="App">
     <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    </div>
  );
}

export default App;
