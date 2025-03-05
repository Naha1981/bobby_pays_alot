function Message({ message }) {
  try {
    const isUser = message.role === 'user';
    const messageClass = isUser ? 'message-user' : 'message-assistant';
    
    return (
      <div 
        data-name={`message-${isUser ? 'user' : 'assistant'}`}
        className={`message p-4 ${messageClass}`}
      >
        <div data-name="message-content" className="text-white">
          {message.content}
        </div>
        <div data-name="message-timestamp" className="text-xs text-gray-400 mt-1 text-right">
          {formatDate(new Date(message.timestamp))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Message component error:', error);
    reportError(error);
    return null;
  }
}

function TypingIndicator() {
  try {
    return (
      <div 
        data-name="typing-indicator" 
        className="message message-assistant p-4 inline-block"
      >
        <div data-name="typing-animation" className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  } catch (error) {
    console.error('TypingIndicator component error:', error);
    reportError(error);
    return null;
  }
}
