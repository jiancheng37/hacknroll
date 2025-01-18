import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Slay orrrr Jail</h1>
        <p>"Where fashion dreams either shine or do time! ✨👗⛓️"</p>
      </div>

      <div className="card-container">
        <div className="slay-or-jail-card">
          <h2 className="card-title">Ready to face the fashion jury?</h2>
          <p className="card-description">
            Upload your fit and let our AI judge decide if you're:
          </p>
          <div className="decision-container">
            <div className="slay">
              <h3>✨ SLAY ✨</h3>
              <p>"Material Gworl!"</p>
            </div>
            <div className="jail">
              <h3>🚨 JAIL 🚨</h3>
              <p>"Hello, fashion police?"</p>
            </div>
          </div>
          <button className="upload-button">Serve Your Look</button>
        </div>
      </div>
    </div>
  );
};

export default Home;