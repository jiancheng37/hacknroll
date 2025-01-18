import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Upload from "./pages/Upload";
import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <div className="App-header">
                <h1>Slay or Jail</h1>
                <p>"Where fashion dreams either shine or do time! ✨👗⛓️"</p>
              </div>
              <div className="App-content">
                <div className="App-card">
                  <h2>Ready to face the fashion jury?</h2>
                  <p>Upload your fit and let our AI judge decide if you're:</p>
                  <Link to="/upload">
                    <button style={{ padding: "10px 20px", fontSize: "16px" }}>
                      Serve Your Look
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/upload" element={<Upload />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
