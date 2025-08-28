import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div>
      {/* ✅ Hero Section */}
      <section className="home-container">
        <div className="home-content">
          <h1 className="home-title">
            Welcome to <span className="highlight">Hirely</span>
          </h1>
          <p className="home-subtitle">
            Your one-stop job portal to connect employers and job seekers. Find
            your dream job or hire top talent today.
          </p>

          {/* ✅ Search bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for jobs, companies, or skills..."
            />
            <button className="search-btn">🔍</button>
          </div>

          {/* ✅ Buttons */}
          <div className="button-group">
            <Link to="/jobs" className="browse-btn">
              Browse Jobs
            </Link>
            <Link to="/employer-dashboard" className="post-btn">
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Why Choose Hirely Section */}
      <section className="features-section">
        <h2 className="features-title">Why Choose Hirely?</h2>
        <p className="features-subtitle">
          We provide the tools and features you need to find your perfect job or
          hire the right talent.
        </p>

        {/* ✅ Responsive grid */}
        <div className="features-grid">
          <div className="feature-card">
            <span className="icon blue">🎯</span>
            <h3>Smart Job Matching</h3>
            <p>
              Our AI-powered algorithm matches you with jobs that fit your
              skills and preferences perfectly.
            </p>
          </div>

          <div className="feature-card">
            <span className="icon green">🛡️</span>
            <h3>Verified Companies</h3>
            <p>
              All companies on our platform are verified to ensure legitimacy
              and quality job opportunities.
            </p>
          </div>

          <div className="feature-card">
            <span className="icon orange">⏱️</span>
            <h3>Quick Applications</h3>
            <p>
              Apply to multiple jobs with one click using your saved profile and
              resume.
            </p>
          </div>

          <div className="feature-card">
            <span className="icon purple">🏆</span>
            <h3>Career Growth</h3>
            <p>
              Access career resources, skill assessments, and professional
              development opportunities.
            </p>
          </div>

          <div className="feature-card">
            <span className="icon teal">🤝</span>
            <h3>Professional Network</h3>
            <p>
              Connect with industry professionals and expand your career
              network.
            </p>
          </div>

          <div className="feature-card">
            <span className="icon violet">⚡</span>
            <h3>Instant Notifications</h3>
            <p>
              Get real-time alerts for new job postings that match your
              criteria.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ For Job Seekers & Employers Section */}
      <section className="audience-section">
        {/* Job Seekers Card */}
        <div className="audience-card seekers">
          <div className="audience-header">
            <span className="audience-icon blue">👤</span>
            <h3>For Job Seekers</h3>
          </div>
          <p>
            Discover thousands of job opportunities from top companies. Create
            your profile and get matched with your dream job.
          </p>
          <ul>
            <li>Browse jobs by category and location</li>
            <li>Get personalized job recommendations</li>
            <li>Track your application status</li>
          </ul>
          <Link to="/jobs" className="audience-btn blue">
            Find Jobs Now →
          </Link>
        </div>

        {/* Employers Card */}
        <div className="audience-card employers">
          <div className="audience-header">
            <span className="audience-icon orange">🏢</span>
            <h3>For Employers</h3>
          </div>
          <p>
            Find the perfect candidates for your company. Post jobs and access
            our talent pool of qualified professionals.
          </p>
          <ul>
            <li>Post jobs and reach thousands of candidates</li>
            <li>Advanced candidate filtering and search</li>
            <li>Manage applications efficiently</li>
          </ul>
          <Link to="/employer-dashboard" className="audience-btn orange">
            Post a Job →
          </Link>
        </div>
      </section>
    </div>
  );
}

