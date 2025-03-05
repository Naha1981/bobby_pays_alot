function ChatInput({ onSendMessage, isLoading }) {
  try {
    const [message, setMessage] = React.useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (message.trim() && !isLoading) {
        onSendMessage(message);
        setMessage('');
      }
    };
    
    return (
      <div data-name="chat-input-container" className="chat-input-container">
        <form data-name="chat-form" className="chat-form" onSubmit={handleSubmit}>
          <input
            data-name="chat-input"
            type="text"
            className="chat-input"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
          />
          <button
            data-name="send-button"
            type="submit"
            className="send-button"
            disabled={isLoading || !message.trim()}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    );
  } catch (error) {
    console.error('ChatInput component error:', error);
    reportError(error);
    return null;
  }
}
