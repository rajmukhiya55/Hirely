import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./JobListings.css";

export default function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");

  const normalizeJobType = (type) => {
    if (!type) return "";
    return type.toLowerCase().replace(/[\s-]/g, "");
  };

  const isJobExpired = (job) => {
    if (!job.validTill) return false;
    const today = new Date();
    const expiryDate = new Date(job.validTill);
    return expiryDate < today;
  };

  useEffect(() => {
    const savedJobsData = JSON.parse(localStorage.getItem("jobs")) || [];
    const normalizedJobs = savedJobsData.map((job) => ({
      ...job,
      type: normalizeJobType(job.type),
    }));

    const activeJobs = normalizedJobs.filter((job) => !isJobExpired(job));
    setJobs(activeJobs);
    setFilteredJobs(activeJobs);
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (search) {
      filtered = filtered.filter((job) => {
        const title = job.title ? job.title.toLowerCase() : "";
        const desc = job.description ? job.description.toLowerCase() : "";
        const skills = job.skills ? job.skills.toLowerCase() : "";
        return (
          title.includes(search.toLowerCase()) ||
          desc.includes(search.toLowerCase()) ||
          skills.includes(search.toLowerCase())
        );
      });
    }

    if (location) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (salary) {
      filtered = filtered.filter(
        (job) => parseInt(job.salary) >= parseInt(salary)
      );
    }

    if (jobType) {
      filtered = filtered.filter(
        (job) => normalizeJobType(job.type) === normalizeJobType(jobType)
      );
    }

    setFilteredJobs(filtered);
  }, [search, location, salary, jobType, jobs]);

  return (
    // ✅ Only updated wrapper className here
    <div className="job-listings-page" style={{ textAlign: "center" }}>
      <h2>Job Listings</h2>

      <div className="search-filters" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <option value="">All Types</option>
          <option value="fulltime">Full-time</option>
          <option value="parttime">Part-time</option>
          <option value="internship">Internship</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      {filteredJobs.length > 0 ? (
        filteredJobs.map((job, index) => (
          <div
            key={index}
            className="job-card"
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              margin: "20px auto",
              borderRadius: "10px",
              maxWidth: "600px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              background: "#fff",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            <div style={{ flex: 1 }}>
              <h3>{job.title?.toUpperCase()}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Experience:</strong> {job.experience || "Not specified"}</p>
              <p><strong>Valid Till:</strong> {job.validTill || "Lifetime"}</p>

              {/* ✅ Navigate to Apply page */}
              <Link to={`/apply/${index}`}>
                <button>Apply</button>
              </Link>
            </div>

            {job.logo ? (
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "#eee",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                No Logo
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No jobs found</p>
      )}
    </div>
  );
}
