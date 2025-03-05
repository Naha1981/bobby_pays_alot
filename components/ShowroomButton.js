function ShowroomButton() {
  try {
    return (
      <div data-name="showroom-link-container" className="showroom-link-container">
        <a 
          data-name="showroom-button" 
          href="https://www.mitmakmotors.co.za/search-results/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="showroom-button"
        >
          <i className="fas fa-car mr-2"></i> View Showroom
        </a>
      </div>
    );
  } catch (error) {
    console.error('ShowroomButton component error:', error);
    reportError(error);
    return null;
  }
}
