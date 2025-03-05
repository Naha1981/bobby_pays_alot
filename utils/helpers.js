// Helper function to scroll to bottom of chat
function scrollToBottom(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
}

// Helper function to format date
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Detect user intent from message
function detectIntent(message) {
  const lowerMessage = message.toLowerCase();
  
  // Buy intent
  const buyPatterns = [
    'buy', 'purchase', 'looking for', 'interested in', 'what cars do you have', 
    'for sale', 'available', 'inventory', 'stock', 'new car', 'used car'
  ];
  
  // Sell intent
  const sellPatterns = [
    'sell', 'trade in', 'trade-in', 'selling', 'value of my car', 'worth', 
    'appraisal', 'get rid of', 'cash for my', 'offer for my'
  ];
  
  // Test drive intent
  const testDrivePatterns = [
    'test drive', 'test-drive', 'drive', 'try', 'experience', 'feel', 
    'behind the wheel', 'schedule', 'appointment', 'book'
  ];
  
  // Finance intent
  const financePatterns = [
    'finance', 'financing', 'loan', 'payment plan', 'installment', 'monthly payment',
    'car loan', 'auto loan', 'interest rate', 'down payment', 'deposit'
  ];
  
  // Credit score intent
  const creditScorePatterns = [
    'credit score', 'credit rating', 'credit check', 'credit history', 'credit report',
    'credit profile', 'credit status', 'credit assessment'
  ];
  
  // Check for each intent
  for (const pattern of buyPatterns) {
    if (lowerMessage.includes(pattern)) return 'buy';
  }
  
  for (const pattern of sellPatterns) {
    if (lowerMessage.includes(pattern)) return 'sell';
  }
  
  for (const pattern of testDrivePatterns) {
    if (lowerMessage.includes(pattern)) return 'test-drive';
  }
  
  for (const pattern of financePatterns) {
    if (lowerMessage.includes(pattern)) return 'finance';
  }
  
  for (const pattern of creditScorePatterns) {
    if (lowerMessage.includes(pattern)) return 'credit-score';
  }
  
  return 'general';
}

// Validate form fields
function validateField(type, value) {
  switch (type) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    case 'phone':
      const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
      return phoneRegex.test(value);
    case 'required':
      return value && value.trim().length > 0;
    default:
      return true;
  }
}

// Save form data to local storage
function saveFormData(formType, formData) {
  try {
    const existingData = JSON.parse(localStorage.getItem('mitmakMotorsFormData') || '{}');
    existingData[formType] = formData;
    localStorage.setItem('mitmakMotorsFormData', JSON.stringify(existingData));
    return true;
  } catch (error) {
    console.error('Error saving form data:', error);
    return false;
  }
}

// Generate a unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Send data to a webhook
async function sendToWebhook(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`Webhook error: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error sending data to webhook:', error);
    return false;
  }
}
