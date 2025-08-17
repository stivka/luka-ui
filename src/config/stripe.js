// Stripe configuration
export const STRIPE_CONFIG = {
  // Production keys - safe to commit (domain-restricted)
  publishableKey: 'pk_live_your_actual_live_key_here', // Replace with your live key
  buyButtonId: 'buy_btn_your_actual_live_button_id_here', // Replace with your live button ID
  
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
