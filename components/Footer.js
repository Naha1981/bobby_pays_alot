function Footer() {
  try {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer data-name="footer" className="bg-black py-6 border-t border-white border-opacity-10">
        <div data-name="footer-container" className="container mx-auto px-4">
          <div data-name="footer-content" className="flex justify-center items-center">
            <p data-name="footer-credit" className="text-gray-400 text-center">
              Powered by: NahaInc, &copy; 2025 Mitmak Motors. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    reportError(error);
    return null;
  }
}
