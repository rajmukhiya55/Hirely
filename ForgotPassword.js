import React, { useState } from "react";
import "./Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Reset link sent to: ${email}`);
    // later you will connect backend here
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Send Reset Link
          </button>
        </form>

        <p className="auth-text">
          Remember your password?{" "}
          <a href="/login" className="auth-link">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}
