function EscalationMessage() {
  try {
    return (
      <div data-name="escalation-container" className="my-4 p-4 bg-red-900 bg-opacity-20 border border-red-500 rounded-lg">
        <h4 data-name="escalation-title" className="font-bold text-red-400 mb-2">
          <i className="fas fa-exclamation-circle mr-2"></i> 
          Immediate Assistance Available
        </h4>
        <p data-name="escalation-message" className="mb-3">
          We're sorry you're experiencing difficulties. For immediate assistance, please contact our customer service representative:
        </p>
        <a 
          data-name="escalation-phone" 
          href="tel:+27825426659" 
          className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
        >
          <i className="fas fa-phone-alt mr-2"></i> Call +27 82 542 6659
        </a>
      </div>
    );
  } catch (error) {
    console.error('EscalationMessage component error:', error);
    reportError(error);
    return null;
  }
}
