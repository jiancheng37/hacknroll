import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Import Home component
import Upload from "./pages/Upload"; // Import Upload component
import Results from "./pages/Results"; // Import Results component

function App() {
  return (
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
  );
}

export default App;
