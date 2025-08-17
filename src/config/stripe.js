// Stripe configuration
export const STRIPE_CONFIG = {
  // Production keys - safe to commit (domain-restricted)
  publishableKey: 'pk_live_51Rx8ME2EogP5gMsZGZ173bLva7PfsYv416Wx32QBLwgDG5XapdydF2TjxFCbAfWexu7Q5WBMUhURjkMS9QKfdlKQ00SKhTt3Zp',
  buyButtonId: 'buy_btn_1Rx8t12EogP5gMsZF1SqAngN',
  
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
