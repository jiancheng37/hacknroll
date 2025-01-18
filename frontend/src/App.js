<<<<<<< HEAD
import React from 'react';
import Header from './components/Header'
import './App.css';
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Import Home component
import Upload from "./pages/Upload"; // Import Upload component
import Results from "./pages/Results"; // Import Results component
>>>>>>> 9becb8ed741ec4030b061792e7809d2f710a3eca

function App() {
  
  return (
<<<<<<< HEAD
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
=======
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<Home />} />

        {/* Upload Page Route */}
        <Route path="/upload" element={<Upload />} />

        {/* Results Page Route */}
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
>>>>>>> 9becb8ed741ec4030b061792e7809d2f710a3eca
  );
}

export default App;