// Chat agent for Mitmak Motors AI Assistant
const chatAgent = (function() {
  // Simulated AI responses for demo purposes
  // In a production environment, this would connect to a real AI service
  
  // Welcome message when chat is initialized
  function getWelcomeMessage() {
    return `
      👋 Welcome to Mitmak Motors! I'm BobbyPaysALot, your virtual assistant.
      
      I can help you with:
      • Finding your perfect vehicle
      • Selling your current car
      • Scheduling a test drive
      • Exploring financing options
      • Checking your credit score
      
      How can I assist you today?
    `;
  }
  
  // Process user message and generate a response
  async function processMessage(userMessage, chatHistory) {
    try {
      // In a real implementation, this would call an AI service
      // For this demo, we'll use simulated responses based on keywords
      
      const lowerMessage = userMessage.toLowerCase();
      
      // Detect intent from message
      const intent = detectIntent(userMessage);
      
      // Return different responses based on intent
      switch (intent) {
        case 'finance':
          return getFinanceResponse();
        case 'credit-score':
          return getCreditScoreResponse();
        case 'general':
          return getGeneralResponse(lowerMessage);
        default:
          // For buy, sell, test-drive intents, the form will be shown
          // by the ChatContainer component, so we just return a prompt
          return getIntentResponse(intent);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      return "I'm sorry, I encountered an error processing your request. Please try again.";
    }
  }
  
  // Get response for finance intent
  function getFinanceResponse() {
    return `
      Financing your vehicle is easy at Mitmak Motors! We offer competitive rates and flexible terms to suit your budget.
      
      Our financing options include:
      • Low interest rates starting from 7.5%
      • Terms from 12 to 72 months
      • Quick approval process
      • Options for various credit profiles
      
      Click the button below to explore our financing options in detail or to apply online.
      
      <FinanceLink>
    `;
  }
  
  // Get response for credit score intent
  function getCreditScoreResponse() {
    return `
      Your credit score is an important factor in securing favorable financing terms. At Mitmak Motors, we can help you understand your credit profile and find options that work for you.
      
      Benefits of checking your credit score:
      • Know where you stand before applying
      • Identify areas for improvement
      • Get personalized financing options
      • Potentially qualify for better rates
      
      You can check your credit score for free through our partner service by clicking the button below.
      
      <CreditScoreLink>
    `;
  }
  
  // Get response based on intent
  function getIntentResponse(intent) {
    switch (intent) {
      case 'buy':
        return "Great! I'd be happy to help you find your perfect vehicle. To better assist you, please fill out this quick form with your preferences.";
      case 'sell':
        return "Looking to sell your vehicle? We offer competitive prices for quality used cars. Please provide some details about your vehicle in this form.";
      case 'test-drive':
        return "Excellent choice! Test driving a vehicle is an important part of the buying process. Please fill out this form to schedule a test drive at your convenience.";
      default:
        return "How can I assist you with your automotive needs today?";
    }
  }
  
  // Get general response for other queries
  function getGeneralResponse(message) {
    // Sample responses for common questions
    if (message.includes('hours') || message.includes('open')) {
      return "Mitmak Motors is open Monday to Friday from 8:00 AM to 6:00 PM, Saturday from 9:00 AM to 4:00 PM, and Sunday from 10:00 AM to 2:00 PM.";
    }
    
    if (message.includes('location') || message.includes('address') || message.includes('where')) {
      return "Our main dealership is located at 123 Motor Way, Johannesburg. We also have branches in Cape Town, Durban, and Pretoria.";
    }
    
    if (message.includes('warranty') || message.includes('guarantee')) {
      return "All our vehicles come with a 6-month/10,000 km warranty. Extended warranty options are also available for additional peace of mind.";
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return "Our vehicle prices range from R80,000 to R600,000 depending on make, model, year, and condition. You can view our full inventory with pricing on our website or fill out the form to specify your budget and preferences.";
    }
    
    if (message.includes('trade') || message.includes('exchange')) {
      return "Yes, we accept trade-ins! The value of your current vehicle can be applied toward the purchase of your new one. To get started, please fill out our sell form with details about your current vehicle.";
    }
    
    if (message.includes('thank')) {
      return "You're welcome! It's my pleasure to assist you. Is there anything else I can help with today?";
    }
    
    // Default response
    return "I'm here to help you find the perfect vehicle, sell your current car, or schedule a test drive. How can I assist you today?";
  }
  
  // Get prompt for buy form
  function getBuyFormPrompt() {
    return "Please fill out this form to help us find the perfect vehicle for you:";
  }
  
  // Get prompt for sell form
  function getSellFormPrompt() {
    return "Please provide details about the vehicle you'd like to sell:";
  }
  
  // Get prompt for test drive form
  function getTestDriveFormPrompt() {
    return "Please fill out this form to schedule a test drive:";
  }
  
  // Get response after form submission
  function getFormSubmissionResponse(formType) {
    switch (formType) {
      case 'buy':
        return "Thank you for submitting your vehicle preferences! Our team will review your information and contact you shortly with matching options from our inventory. Is there anything else you'd like to know about our vehicles?";
      case 'sell':
        return "Thank you for providing details about your vehicle! Our appraisal team will evaluate the information and contact you within 24-48 hours with a preliminary valuation. Would you like to know more about our selling process?";
      case 'test-drive':
        return "Your test drive has been scheduled! You'll receive a confirmation email shortly with all the details. Our staff will have the vehicle ready for you at your chosen time. Is there anything else you need to know before your visit?";
      default:
        return "Thank you for your submission! Our team will be in touch with you soon. Is there anything else I can help you with today?";
    }
  }
  
  // Public API
  return {
    getWelcomeMessage,
    processMessage,
    getBuyFormPrompt,
    getSellFormPrompt,
    getTestDriveFormPrompt,
    getFormSubmissionResponse
  };
})();
