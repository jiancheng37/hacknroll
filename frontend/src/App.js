import React from 'react';
import Header from './components/Header'
import './App.css';

function App() {
  
  return (
    <div className="App">
      {/* Header Section */}
      <div className="App-content">
        <div className="App-card">
          <h1>Slay or Jail</h1>
          <Header />
          <p>"Where fashion dreams either shine or do time! ✨👗⛓️"</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="App-content">
        <div className="App-card">
          <h2>Ready to face the fashion jury?</h2>
          <p>Upload your fit and let our AI judge decide if you're:</p>

          <div className="slay-jail">
            <div className="slay">
              <h3>✨ SLAY ✨</h3>
              <p>"Material Gworl!"</p>
            </div>
            <div className="jail">
              <h3>🚨 JAIL 🚨</h3>
              <p>"Hello, fashion police?"</p>
            </div>
          </div>

          <button>Serve Your Look</button>
        </div>
      </div>
    </div>
  );
}

export default App;