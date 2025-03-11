// Chat agent for Mitmak Motors AI Assistant
const chatAgent = (function() {
  // Simulated AI responses for demo purposes
  // In a production environment, this would connect to a real AI service
  
  // Welcome message when chat is initialized
  function getWelcomeMessage() {
    return `
      👋 Hi there! I'm your personal assistant at Bobby-Pays-Alot.
      
      I can help you with:
      • Finding your dream car that fits your lifestyle
      • Getting a great offer for your current vehicle
      • Setting up a convenient test drive
      • Exploring flexible financing options
      • Checking your credit score without affecting your rating
      
      How can I make your car shopping experience better today?
    `;
  }
  
  // Process user message and generate a response
  async function processMessage(userMessage, chatHistory) {
    try {
      // In a real implementation, this would call an AI service
      // For this demo, we'll use simulated responses based on keywords
      
      const lowerMessage = userMessage.toLowerCase();
      
      // First, check for exact matches using personalized responses
      const personalizedResponse = generatePersonalizedResponse(userMessage);
      if (personalizedResponse) {
        return personalizedResponse;
      }
      
      // Analyze sentiment of the message
      const sentimentResult = analyzeSentiment(userMessage);
      
      // Check if the message requires escalation
      if (requiresEscalation(userMessage)) {
        // Return a special response indicating escalation is needed
        return {
          content: "I understand you're experiencing some frustration. Let me connect you with our customer service team who can assist you better and resolve this quickly.",
          needsEscalation: true,
          followUp: generateFollowUpMessage()
        };
      }
      
      // Get sentiment-specific response if applicable
      const sentimentResponse = generateSentimentResponse(sentimentResult);
      
      // Detect intent from message
      const intent = detectIntent(userMessage);
      
      // Get the base response based on intent
      let baseResponse;
      
      // Return different responses based on intent
      switch (intent) {
        case 'finance':
          baseResponse = getFinanceResponse();
          break;
        case 'credit-score':
          baseResponse = getCreditScoreResponse();
          break;
        case 'general':
          baseResponse = getGeneralResponse(lowerMessage, sentimentResult);
          break;
        default:
          // For buy, sell, test-drive intents, the form will be shown
          // by the ChatContainer component, so we just return a prompt
          baseResponse = getIntentResponse(intent);
      }
      
      // If there's a sentiment-specific response, append it to the base response
      if (sentimentResponse && baseResponse.indexOf(sentimentResponse) === -1) {
        return baseResponse + "\n\n" + sentimentResponse;
      }
      
      return baseResponse;
    } catch (error) {
      console.error('Error processing message:', error);
      return "I'm sorry, I encountered an error while processing your request. Could you please try again or rephrase your question?";
    }
  }
  
  // Get response for finance intent
  function getFinanceResponse() {
    const responses = [
      `
        Financing your vehicle is easy at Bobby-Pays-Alot! We offer competitive rates and flexible terms tailored to your budget.
        
        Our financing options include:
        • Low interest rates starting from 7.5%
        • Flexible terms from 12 to 72 months
        • Quick approval process, often within hours
        • Options for various credit profiles, including first-time buyers
        
        Click the button below to explore our financing options in detail or to apply online.
        
        <FinanceLink>
      `,
      `
        Looking for financing options? You've come to the right place! At Bobby-Pays-Alot, we work with multiple lenders to find the best rates for you.
        
        Here's what makes our financing special:
        • Personalized payment plans based on your budget
        • Pre-approval available before you shop
        • Special rates for returning customers
        • No hidden fees or surprises
        
        Ready to see your options? Click below to get started with our simple application.
        
        <FinanceLink>
      `
    ];
    
    // Return a random response for variety
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Get response for credit score intent
  function getCreditScoreResponse() {
    const responses = [
      `
        Your credit score plays a key role in securing favorable financing terms. At Bobby-Pays-Alot, we help you understand your credit profile and find options that work for you.
        
        Benefits of checking your credit score:
        • Know where you stand before applying
        • Identify areas for improvement
        • Get personalized financing options
        • Potentially qualify for better rates
        
        You can check your credit score for free through our partner service without affecting your rating.
        
        <CreditScoreLink>
      `,
      `
        Wondering about your credit score? No problem! Understanding your credit is an important step in the car buying process.
        
        Our free credit check service:
        • Takes just 2 minutes to complete
        • Doesn't affect your credit score
        • Gives you a complete breakdown of factors affecting your score
        • Helps us match you with the right financing options
        
        Click below to check your score securely and instantly.
        
        <CreditScoreLink>
      `
    ];
    
    // Return a random response for variety
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Get response based on intent with more human-like variations
  function getIntentResponse(intent) {
    const buyResponses = [
      "Great! I'd be happy to help you find your perfect vehicle. To better assist you, please fill out this quick form with your preferences.",
      "Excellent! Let's find your dream car. To narrow down the options and show you vehicles that match your needs, could you share a few details in this form?",
      "I'd love to help you find the right vehicle! To get started, please tell me a bit about what you're looking for by completing this quick form."
    ];
    
    const sellResponses = [
      "Looking to sell your vehicle? We offer competitive prices for quality used cars. Please provide some details about your vehicle in this form.",
      "We're always interested in quality vehicles! To give you an accurate valuation, please share some information about your car in this form.",
      "I'd be happy to help you sell your vehicle. Our team offers great prices and a hassle-free process. Could you fill out this form with your car's details?"
    ];
    
    const testDriveResponses = [
      "Excellent choice! Test driving a vehicle is an important part of the buying process. Please fill out this form to schedule a test drive at your convenience.",
      "There's nothing like getting behind the wheel to know if a car is right for you! Let's schedule your test drive - just fill out this quick form.",
      "I'd be happy to arrange a test drive for you! Please complete this form, and we'll have the vehicle ready for you at your preferred time."
    ];
    
    const generalResponses = [
      "How can I assist you with your automotive needs today?",
      "I'm here to make your car buying or selling experience as smooth as possible. What can I help you with?",
      "What aspect of our automotive services are you interested in today?"
    ];
    
    // Select a random response based on intent
    switch (intent) {
      case 'buy':
        return buyResponses[Math.floor(Math.random() * buyResponses.length)];
      case 'sell':
        return sellResponses[Math.floor(Math.random() * sellResponses.length)];
      case 'test-drive':
        return testDriveResponses[Math.floor(Math.random() * testDriveResponses.length)];
      default:
        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }
  }
  
  // Get general response for other queries with sentiment awareness
  function getGeneralResponse(message, sentimentResult) {
    // Sample responses for common questions with more conversational tone
    if (message.includes('hours') || message.includes('open')) {
      return "We're open Monday to Friday from 8:00 AM to 6:00 PM, Saturday from 9:00 AM to 4:00 PM, and Sunday from 10:00 AM to 2:00 PM. Is there a particular day you'd like to visit us?";
    }
    
    if (message.includes('location') || message.includes('address') || message.includes('where')) {
      return "Our main dealership is located at 123 Motor Way, Johannesburg. We also have branches in Cape Town, Durban, and Pretoria. Which location would be most convenient for you to visit?";
    }
    
    if (message.includes('warranty') || message.includes('guarantee')) {
      return "All our vehicles come with a 6-month/10,000 km warranty as standard. We also offer extended warranty options for additional peace of mind. Would you like to learn more about our warranty coverage?";
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return "Our vehicle prices range from R80,000 to R600,000 depending on make, model, year, and condition. Do you have a specific budget or type of vehicle in mind? I'd be happy to show you options that fit your price range.";
    }
    
    if (message.includes('trade') || message.includes('exchange')) {
      return "Yes, we gladly accept trade-ins! The value of your current vehicle can be applied toward the purchase of your new one. Would you like to get an estimate of your vehicle's trade-in value?";
    }
    
    if (message.includes('thank')) {
      if (sentimentResult.positiveScore > 0) {
        return "You're very welcome! It's been my pleasure to assist you. If you've enjoyed our conversation, we'd love it if you could share your experience with friends or family who might be looking for a vehicle.";
      } else {
        return "You're welcome! I'm here anytime you need assistance with your automotive needs. Is there anything else I can help with today?";
      }
    }
    
    // Default response with variations based on sentiment
    if (sentimentResult.sentiment === 'positive') {
      return "I'm glad to hear your enthusiasm! I'm here to help you find the perfect vehicle, sell your current car, or schedule a test drive. What would you like to explore first?";
    } else if (sentimentResult.sentiment === 'negative') {
      return "I understand your concerns, and I'm here to make your experience better. How can I assist you today with finding a vehicle, valuing your current car, or answering any questions you might have?";
    } else {
      return "I'm here to help with finding your ideal vehicle, selling your current car, or scheduling a test drive. How can I assist you today?";
    }
  }
  
  // Get prompt for buy form
  function getBuyFormPrompt() {
    const prompts = [
      "Please fill out this form to help us find the perfect vehicle for you:",
      "To help us match you with your ideal vehicle, please share a few details below:",
      "Let's find your dream car! Please provide some information about what you're looking for:"
    ];
    
    return prompts[Math.floor(Math.random() * prompts.length)];
  }
  
  // Get prompt for sell form
  function getSellFormPrompt() {
    const prompts = [
      "Please provide details about the vehicle you'd like to sell:",
      "To give you an accurate valuation for your vehicle, we need a few details:",
      "Let's get started with selling your vehicle. Please share some information below:"
    ];
    
    return prompts[Math.floor(Math.random() * prompts.length)];
  }
  
  // Get prompt for test drive form
  function getTestDriveFormPrompt() {
    const prompts = [
      "Please fill out this form to schedule a test drive:",
      "Let's arrange your test drive. Please provide the following details:",
      "We're excited for you to experience our vehicles! Please complete this form to schedule your test drive:"
    ];
    
    return prompts[Math.floor(Math.random() * prompts.length)];
  }
  
  // Get response after form submission with more conversational tone
  function getFormSubmissionResponse(formType) {
    switch (formType) {
      case 'buy':
        return "Thank you for sharing your vehicle preferences! Our team will carefully review your information and reach out shortly with personalized recommendations that match your criteria. In the meantime, is there anything specific you'd like to know about our vehicle features or buying process?";
      case 'sell':
        return "Thanks for providing details about your vehicle! Our appraisal team will evaluate this information and contact you within 24-48 hours with a competitive valuation. While you wait, would you like to know more about how our selling process works or what factors affect your vehicle's value?";
      case 'test-drive':
        return "Your test drive is all set! We've sent a confirmation email with all the details, and our team will have your selected vehicle ready and waiting for you. Before your visit, would you like any additional information about the vehicle or our dealership amenities?";
      default:
        return "Thank you for your submission! Our team will be in touch with you soon. While you wait, is there anything else I can help you with today?";
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
