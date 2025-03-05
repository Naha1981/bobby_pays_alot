function Header() {
  try {
    return (
      <header data-name="header" className="bg-black py-4 border-b border-white border-opacity-10 sticky top-0 z-10">
        <div data-name="header-container" className="container mx-auto px-4 flex justify-between items-center">
          <div data-name="logo-container" className="flex items-center">
            <div data-name="logo" className="text-3xl font-bold">
              <span className="text-red-600">Bobby-Pays-Alot</span>
            </div>
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
