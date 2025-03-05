function FinanceLink({ text }) {
  try {
    return (
      <div data-name="finance-link-container" className="my-4">
        <p data-name="finance-text" className="mb-2">{text}</p>
        <a 
          data-name="finance-button" 
          href="https://www.mitmakmotors.co.za/finance/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition-all duration-300"
        >
          <i className="fas fa-money-check-alt mr-2"></i> Explore Financing Options
        </a>
      </div>
    );
  } catch (error) {
    console.error('FinanceLink component error:', error);
    reportError(error);
    return null;
  }
}

function CreditScoreLink({ text }) {
  try {
    return (
      <div data-name="credit-score-link-container" className="my-4">
        <p data-name="credit-score-text" className="mb-2">{text}</p>
        <a 
          data-name="credit-score-button" 
          href="https://www.mitmakmotors.co.za/free-credit-score/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition-all duration-300"
        >
          <i className="fas fa-chart-line mr-2"></i> Check Your Credit Score
        </a>
      </div>
    );
  } catch (error) {
    console.error('CreditScoreLink component error:', error);
    reportError(error);
    return null;
  }
}
