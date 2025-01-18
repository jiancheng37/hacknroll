import React from 'react';
import './Home.css'; // Import custom CSS for the Home page

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Slay or Jail</h1>
        <p>"Where fashion dreams either shine or do time! ✨👗⛓️"</p>
      </div>

      <div className="home-content">
        <div className="card">
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

export default Home;