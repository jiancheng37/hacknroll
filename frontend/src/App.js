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
          
          </div>
        </div> {/* Closing App-content and App-card divs properly */}

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

