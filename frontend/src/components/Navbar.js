import React from 'react';
import './Navbar.css'; // Import the custom CSS for Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/upload">Upload</a></li>
        <li><a href="/results">Results</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;