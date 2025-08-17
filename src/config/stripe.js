// Stripe configuration
export const STRIPE_CONFIG = {
  // Test keys - replace with live keys for production
  publishableKey: 'pk_test_51Rx6qvRdv3r6QYHNDbhx41Zc2cTkRCZumB9X8nE5O3KpgihMQAoQfmplV0uM8uYq1sbM9X0a8VEMHSQZmNPE5Xlx00Y2A4XOTd',
  buyButtonId: 'buy_btn_1Rx7XaRdv3r6QYHNCt9cKfNa',
  
  // Environment detection
  isProduction: process.env.NODE_ENV === 'production',
  
  // URLs for different environments
  successUrl: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com/success' 
    : 'http://localhost:3000/success',
  
  cancelUrl: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com/cancel' 
    : 'http://localhost:3000/cancel',
};

// Helper function to get the appropriate publishable key
export const getStripePublishableKey = () => {
  return STRIPE_CONFIG.publishableKey;
};

// Helper function to get the buy button ID
export const getStripeBuyButtonId = () => {
  return STRIPE_CONFIG.buyButtonId;
};
