// Sentiment Analysis Utility for Bobby-Pays-Alot AI Assistant

// Function to analyze sentiment in user messages
function analyzeSentiment(message) {
  const text = message.toLowerCase();
  
  // Positive sentiment indicators - expanded for better detection
  const positivePatterns = [
    'love', 'great', 'awesome', 'amazing', 'excellent', 'fantastic',
    'good', 'wonderful', 'perfect', 'thank', 'appreciate', 'helpful',
    'impressed', 'happy', 'satisfied', 'pleased', 'enjoy', 'best',
    'incredible', 'exceptional', 'outstanding', 'brilliant', 'superb',
    'delighted', 'excited', 'thrilled', 'wow', 'cool', 'nice',
    'impressive', 'beautiful', 'gorgeous', 'stylish', 'sleek',
    'efficient', 'quick', 'fast', 'smooth', 'seamless', 'easy',
    'professional', 'knowledgeable', 'friendly', 'polite', 'courteous',
    'reliable', 'trustworthy', 'dependable', 'top-notch', 'first-class',
    'premium', 'quality', 'value', 'worth', 'recommend', 'refer',
    'favorite', 'preferred', 'like', 'love it', 'great job', 'well done'
  ];
  
  // Negative sentiment indicators - expanded for better detection
  const negativePatterns = [
    'bad', 'poor', 'terrible', 'awful', 'horrible', 'disappointed',
    'frustrat', 'annoyed', 'angry', 'upset', 'unhappy', 'dissatisfied',
    'slow', 'too long', 'wait', 'not good', 'not great', 'not happy',
    'problem', 'issue', 'complaint', 'wrong', 'error', 'mistake',
    'fail', 'broken', 'useless', 'waste', 'not working', "don't like",
    'dislike', 'hate', 'terrible', 'worst', 'sucks', 'rubbish', 'garbage',
    'overpriced', 'expensive', 'costly', 'pricey', 'ripoff', 'scam',
    'dishonest', 'misleading', 'false', 'lie', 'lied', 'cheating',
    'unprofessional', 'rude', 'impolite', 'disrespectful', 'inconsiderate',
    'inconvenient', 'difficult', 'complicated', 'confusing', 'unclear',
    'unreliable', 'untrustworthy', 'suspicious', 'questionable',
    'disappointing', 'letdown', 'not satisfied', 'not impressed',
    'not worth', 'regret', 'wouldn\'t recommend', 'avoid', 'stay away',
    'never again', 'not pleased', 'not up to standard', 'subpar',
    'mediocre', 'underwhelming', 'takes too long', 'application is slow',
    'process is slow', 'too complicated', 'too difficult', 'not user friendly'
  ];
  
  // Mixed sentiment indicators (both positive and negative elements)
  const mixedPatterns = [
    'but', 'however', 'although', 'though', 'except', 'besides',
    'good but', 'like but', 'nice but', 'great but', 'ok but',
    'not bad', 'not terrible', 'could be better', 'could be worse',
    'somewhat', 'kind of', 'sort of', 'okay', 'alright', 'fine',
    'decent', 'acceptable', 'satisfactory', 'adequate', 'tolerable',
    'mixed feelings', 'pros and cons', 'good and bad', 'ups and downs',
    'hit and miss', 'inconsistent', 'mostly good', 'mostly bad',
    'good except', 'nice except', 'great except', 'like it but',
    'good overall but', 'generally good but', 'otherwise good',
    'not perfect but', 'not ideal but', 'not amazing but', 'not terrible but'
  ];
  
  // Specific compliment patterns about cars or service
  const carComplimentPatterns = [
    'nice car', 'nice cars', 'great car', 'great cars', 'beautiful car',
    'beautiful cars', 'amazing car', 'amazing cars', 'love your car',
    'love your cars', 'your cars are nice', 'your cars are great',
    'your vehicles are nice', 'your vehicles are great', 'good selection',
    'great selection', 'impressive selection', 'impressive inventory',
    'good inventory', 'great inventory', 'good variety', 'great variety'
  ];
  
  const serviceComplimentPatterns = [
    'great service', 'excellent service', 'amazing service', 'good service',
    'wonderful service', 'fantastic service', 'helpful service',
    'professional service', 'friendly service', 'prompt service',
    'efficient service', 'quick service', 'outstanding service',
    'exceptional service', 'top-notch service', 'first-class service',
    'premium service', 'quality service', 'reliable service'
  ];
  
  // Specific complaint patterns about application or process
  const applicationComplaintPatterns = [
    'application takes too long', 'process takes too long', 'too much paperwork',
    'too many steps', 'too complicated', 'too difficult', 'too confusing',
    'too slow', 'not user friendly', 'hard to use', 'difficult to use',
    'confusing interface', 'confusing process', 'complicated process',
    'slow application', 'slow process', 'long application', 'long process',
    'too many questions', 'too many fields', 'too much information required'
  ];
  
  // Count matches for each sentiment category
  let positiveScore = 0;
  let negativeScore = 0;
  let mixedIndicators = 0;
  let carCompliment = false;
  let serviceCompliment = false;
  let applicationComplaint = false;
  
  // Check for positive patterns
  for (const pattern of positivePatterns) {
    if (text.includes(pattern)) {
      positiveScore++;
    }
  }
  
  // Check for negative patterns
  for (const pattern of negativePatterns) {
    if (text.includes(pattern)) {
      negativeScore++;
    }
  }
  
  // Check for mixed sentiment indicators
  for (const pattern of mixedPatterns) {
    if (text.includes(pattern)) {
      mixedIndicators++;
    }
  }
  
  // Check for specific compliment patterns
  for (const pattern of carComplimentPatterns) {
    if (text.includes(pattern)) {
      carCompliment = true;
      break;
    }
  }
  
  for (const pattern of serviceComplimentPatterns) {
    if (text.includes(pattern)) {
      serviceCompliment = true;
      break;
    }
  }
  
  // Check for specific complaint patterns
  for (const pattern of applicationComplaintPatterns) {
    if (text.includes(pattern)) {
      applicationComplaint = true;
      break;
    }
  }
  
  // Determine overall sentiment with context
  let sentiment = 'neutral';
  
  // If there are mixed indicators or both positive and negative scores are present
  if (mixedIndicators > 0 || (positiveScore > 0 && negativeScore > 0)) {
    sentiment = 'mixed';
  }
  // If negative score is higher or equal to positive score
  else if (negativeScore > 0 && negativeScore >= positiveScore) {
    sentiment = 'negative';
  }
  // If positive score is higher than negative
  else if (positiveScore > 0) {
    sentiment = 'positive';
  }
  
  return {
    sentiment,
    positiveScore,
    negativeScore,
    mixedIndicators,
    carCompliment,
    serviceCompliment,
    applicationComplaint,
    text
  };
}

// Generate appropriate response based on sentiment and context
function generateSentimentResponse(sentimentResult) {
  const { 
    sentiment, 
    carCompliment, 
    serviceCompliment, 
    applicationComplaint, 
    text 
  } = sentimentResult;
  
  // Handle specific compliments about cars
  if (carCompliment) {
    return "Thank you! We take pride in offering high-quality vehicles. If you'd like, I can help you find one that fits your needs perfectly. Would you like to explore our inventory?";
  }
  
  // Handle specific compliments about service
  if (serviceCompliment) {
    return "We appreciate your kind words about our service! Our team works hard to provide the best experience for our customers. Is there anything else we can assist you with today?";
  }
  
  // Handle specific complaints about application or process
  if (applicationComplaint) {
    return "I'm sorry to hear that our process is taking longer than expected. We're constantly working to improve our systems. In the meantime, let me assist you directly to make things easier. What specific information are you looking for today?";
  }
  
  // Default responses based on general sentiment
  switch (sentiment) {
    case 'positive':
      return "Thank you so much for your positive feedback! If you've enjoyed your experience with Bobby-Pays-Alot, we'd really appreciate it if you could share your experience with friends or leave us a review online. Is there anything specific about our vehicles or services you'd like to know more about?";
    
    case 'negative':
      return "I'm truly sorry to hear about your experience. Your satisfaction is our top priority, and we'd like to make things right. For immediate assistance with your concern, please call our dedicated customer service team at +27825426659. Alternatively, I'm here to help resolve any issues I can.";
    
    case 'mixed':
      return "Thank you for your feedback. We appreciate your honesty about what worked well and what could be improved. We're always looking to enhance our service, and your insights are valuable. How can I help make your experience better today?";
    
    default:
      return null; // Return null for neutral sentiment to use default response
  }
}

// Check if a message requires escalation (very negative sentiment)
function requiresEscalation(message) {
  const result = analyzeSentiment(message);
  
  // If sentiment is negative and score is above threshold, or specific application complaints
  return (result.sentiment === 'negative' && result.negativeScore >= 2) || 
         (result.applicationComplaint && result.negativeScore >= 1);
}

// Generate follow-up message after escalation
function generateFollowUpMessage() {
  const followUpMessages = [
    "A representative has been notified of your concern. Once they've addressed it, feel free to message me again if there's anything else we can do!",
    "Our customer service team will be in touch with you shortly. In the meantime, is there anything else I can help you with?",
    "While you wait for our representative to contact you, please know that we value your feedback and are committed to resolving this issue promptly."
  ];
  
  // Return a random follow-up message
  return followUpMessages[Math.floor(Math.random() * followUpMessages.length)];
}

// Generate preventive message for potential frustration
function generatePreventiveMessage() {
  const preventiveMessages = [
    "Let me double-check that for you—it might just take a moment. While you wait, would you like to explore other options in the meantime?",
    "I understand this process might be taking longer than expected. Would you like me to suggest some alternatives while we wait?",
    "I appreciate your patience. To make the most of your time, perhaps you'd like to learn about our latest promotions?",
    "I know waiting can be frustrating. Let me see if there's a quicker way to get what you need. In the meantime, can I tell you about some of our special offers?",
    "Thank you for your patience. I'm working on getting that information for you as quickly as possible. While I do that, would you like to know about our current financing options?"
  ];
  
  // Return a random preventive message
  return preventiveMessages[Math.floor(Math.random() * preventiveMessages.length)];
}

// Generate personalized response based on specific user input
function generatePersonalizedResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for exact matches to provide tailored responses
  if (lowerMessage.includes("your cars are nice")) {
    return "Thank you! We take pride in offering high-quality vehicles. If you'd like, I can help you find one that fits your needs perfectly.";
  }
  
  if (lowerMessage.includes("great service")) {
    return "We appreciate your kind words! Let us know if there's anything else we can do for you.";
  }
  
  if (lowerMessage.includes("application takes too long") || 
      lowerMessage.includes("process takes too long") ||
      lowerMessage.includes("too slow")) {
    return "I'm sorry to hear that. We're constantly working to improve our processes. In the meantime, let me assist you directly. What would you like to accomplish today?";
  }
  
  // If no exact match, return null to use the standard sentiment analysis
  return null;
}
