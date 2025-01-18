import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Import Home component
import Upload from "./pages/Upload"; // Import Upload component
import Results from "./pages/Results"; // Import Results component
import Header from './components/Header';
import './App.css';
import './Home.css';  // Make sure this path is correct

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header Section */}
        <div className="App-content">
          <div className="App-card">
            <div className="home-header">
              <h1>Slay or Jail</h1>
              <Header />
              <p>"Where fashion dreams either shine or do time! ✨👗⛓️"</p>
            </div>
          </div>
        </div> {/* Closing App-content and App-card divs properly */}

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

        {/* Routing for Pages */}
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<Home />} />

          {/* Upload Page Route */}
          <Route path="/upload" element={<Upload />} />

          {/* Results Page Route */}
          <Route path="/results" element={<Results />} />
        </Routes>
      </div> {/* Closing the outermost App div here */}
    </Router>
  );
}

export default App;