import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { getStripePublishableKey, getStripeBuyButtonId } from '../config/stripe';

const StripeButton = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    // Ensure the Stripe script is loaded
    if (window.Stripe) {
      // The button should render automatically once the script is loaded
      return;
    }

    // If Stripe is not available, we can add a fallback
    const checkStripe = setInterval(() => {
      if (window.Stripe) {
        clearInterval(checkStripe);
      }
    }, 100);

    return () => clearInterval(checkStripe);
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <stripe-buy-button
        ref={buttonRef}
        buy-button-id={getStripeBuyButtonId()}
        publishable-key={getStripePublishableKey()}
      />
    </Box>
  );
};

export default StripeButton;
