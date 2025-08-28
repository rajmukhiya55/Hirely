import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Hirely</Link>
      </div>

      {/* Desktop Menu */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/jobs">Job Listings</Link></li>
        <li><Link to="/employer-dashboard">Employer Dashboard</Link></li>
        <li><Link to="/candidate-dashboard">Candidate Dashboard</Link></li>
      </ul>

      <div className="auth-buttons">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn signup">Signup</Link>
      </div>

      {/* Hamburger Button */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
        <ul>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/jobs" onClick={() => setIsOpen(false)}>Job Listings</Link></li>
          <li><Link to="/employer-dashboard" onClick={() => setIsOpen(false)}>Employer Dashboard</Link></li>
          <li><Link to="/candidate-dashboard" onClick={() => setIsOpen(false)}>Candidate Dashboard</Link></li>
        </ul>
        <div className="mobile-auth">
          <Link to="/login" className="btn" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/signup" className="btn signup" onClick={() => setIsOpen(false)}>Signup</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

