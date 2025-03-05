function App() {
  try {
    return (
      <div data-name="app" className="min-h-screen flex flex-col">
        <Header />
        <main data-name="main" className="flex-grow">
          <ChatContainer />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    reportError(error);
    return null;
  }
}

// Render the app
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
