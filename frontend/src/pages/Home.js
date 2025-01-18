<<<<<<< HEAD
import React from 'react';
import './Home.css';
=======
import React from "react";
import { Link } from "react-router-dom"; // Use Link for navigation
import "../Home.css"; // Import custom CSS for the Home page
>>>>>>> 9becb8ed741ec4030b061792e7809d2f710a3eca

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
<<<<<<< HEAD
          <button className="upload-button">Serve Your Look</button>
=======

          {/* Navigation Button */}
          <Link to="/upload">
            <button className="serve-look-button">Serve Your Look</button>
          </Link>
>>>>>>> 9becb8ed741ec4030b061792e7809d2f710a3eca
        </div>
      </div>
    </div>
  );
};

export default Home;