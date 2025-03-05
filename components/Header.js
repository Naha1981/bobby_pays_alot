function Header() {
  try {
    return (
      <header data-name="header" className="bg-black bg-opacity-60 backdrop-blur-md py-4 border-b border-white border-opacity-10 sticky top-0 z-10">
        <div data-name="header-container" className="container mx-auto px-4 flex justify-between items-center">
          <div data-name="logo-container" className="flex items-center">
            <div data-name="logo" className="text-3xl font-bold text-white">
              <span className="text-red-500">Bobby-Pays-a-Lot</span>
            </div>
          </div>
          
          <div data-name="header-actions" className="flex items-center space-x-4">
            <a 
              data-name="showroom-button"
              href="https://www.mitmakmotors.co.za/search-results/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 py-2 px-4 rounded-md text-sm font-medium"
            >
              <i className="fas fa-car mr-2"></i> View Showroom
            </a>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    reportError(error);
    return null;
  }
}
