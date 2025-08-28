import React from "react";
import "./Auth.css";

export default function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />

          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
