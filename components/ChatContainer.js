function ChatContainer() {
  try {
    const [messages, setMessages] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [activeForm, setActiveForm] = React.useState(null);
    const messagesEndRef = React.useRef(null);

    // Initialize chat with welcome message
    React.useEffect(() => {
      const welcomeMessage = {
        role: 'assistant',
        content: chatAgent.getWelcomeMessage(),
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    }, []);

    // Scroll to bottom when messages change
    React.useEffect(() => {
      scrollToBottom('chat-messages');
    }, [messages]);

    // Handle sending a message
    const handleSendMessage = async (content) => {
      if (!content.trim() || isLoading) return;

      // Add user message to chat
      const userMessage = {
        role: 'user',
        content,
        timestamp: new Date().toISOString()
      };

      setMessages(prevMessages => [...prevMessages, userMessage]);
      setIsLoading(true);

      try {
        // Detect intent to show appropriate form
        const intent = detectIntent(content);
        
        if (['buy', 'sell', 'test-drive'].includes(intent) && !activeForm) {
          // Show form based on intent
          let formPrompt;
          
          switch (intent) {
            case 'buy':
              // First, add a message with showroom button
              const showroomMessage = {
                role: 'assistant',
                content: "You might want to check our current inventory before proceeding. Our showroom has a wide selection of quality vehicles.",
                timestamp: new Date().toISOString(),
                specialComponent: <ShowroomButton />
              };
              setMessages(prevMessages => [...prevMessages, showroomMessage]);
              
              // Then add the regular form prompt
              formPrompt = chatAgent.getBuyFormPrompt();
              setActiveForm('buy');
              break;
            case 'sell':
              formPrompt = chatAgent.getSellFormPrompt();
              setActiveForm('sell');
              break;
            case 'test-drive':
              formPrompt = chatAgent.getTestDriveFormPrompt();
              setActiveForm('test-drive');
              break;
          }
          
          // Add form prompt as assistant message
          const formMessage = {
            role: 'assistant',
            content: formPrompt,
            timestamp: new Date().toISOString()
          };
          
          setMessages(prevMessages => [...prevMessages, formMessage]);
        } else {
          // Process with AI for general conversation
          const assistantResponse = await chatAgent.processMessage(
            content, 
            messages.map(({ role, content }) => ({ role, content }))
          );
          
          // Check if response contains special link tags
          let processedResponse = assistantResponse;
          let specialComponent = null;
          
          if (assistantResponse.includes('<FinanceLink>')) {
            processedResponse = assistantResponse.replace('<FinanceLink>', '');
            specialComponent = (
              <FinanceLink text="Click below to explore our financing options:" />
            );
          } else if (assistantResponse.includes('<CreditScoreLink>')) {
            processedResponse = assistantResponse.replace('<CreditScoreLink>', '');
            specialComponent = (
              <CreditScoreLink text="Click below to check your credit score for free:" />
            );
          }
          
          const assistantMessage = {
            role: 'assistant',
            content: processedResponse,
            timestamp: new Date().toISOString(),
            specialComponent: specialComponent
          };
          
          setMessages(prevMessages => [...prevMessages, assistantMessage]);
        }
      } catch (error) {
        console.error('Error processing message:', error);
        
        const errorMessage = {
          role: 'assistant',
          content: "I'm sorry, I encountered an error processing your request. Please try again.",
          timestamp: new Date().toISOString()
        };
        
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    };

    // Handle form submission
    const handleFormSubmit = (formData) => {
      const formType = activeForm;
      const responseMessage = {
        role: 'assistant',
        content: chatAgent.getFormSubmissionResponse(formType),
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, responseMessage]);
      setActiveForm(null);
    };

    // Handle form cancellation
    const handleFormCancel = () => {
      const cancelMessage = {
        role: 'assistant',
        content: "No problem! Is there anything else I can help you with today?",
        timestamp: new Date().toISOString()
      };
      
      setMessages(prevMessages => [...prevMessages, cancelMessage]);
      setActiveForm(null);
    };

    // Render the appropriate form based on activeForm state
    const renderActiveForm = () => {
      switch (activeForm) {
        case 'buy':
          return <BuyForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />;
        case 'sell':
          return <SellForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />;
        case 'test-drive':
          return <TestDriveForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />;
        default:
          return null;
      }
    };

    return (
      <div data-name="chat-container" className="container mx-auto px-4 py-6">
        <div data-name="chat-window" className="chat-container glass-effect">
          <div data-name="chat-messages" id="chat-messages" className="chat-messages scrollbar-thin">
            {messages.map((message, index) => (
              <React.Fragment key={index}>
                <Message message={message} />
                {message.specialComponent}
              </React.Fragment>
            ))}
            
            {isLoading && <TypingIndicator />}
            
            {activeForm && renderActiveForm()}
            
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('ChatContainer component error:', error);
    reportError(error);
    return null;
  }
}
