import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Load jobs from localStorage
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const job = jobs[id];

  if (!job) {
    return <h2>Job not found</h2>;
  }

  return (
    <div className="job-detail">
      <h1>{job.title}</h1>
      <h3>{job.company}</h3>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      <p>
        <strong>Salary:</strong> {job.salary}
      </p>
      <p>
        <strong>Description:</strong> {job.description}
      </p>
      <p>
        <strong>Required Skills:</strong> {job.skills}
      </p>
      <p>
        <strong>Responsibilities:</strong> {job.responsibilities}
      </p>
      <p>
        <strong>Benefits:</strong> {job.benefits}
      </p>

      <button className="btn" onClick={() => navigate(`/apply/${id}`)}>
        Apply Now
      </button>
    </div>
  );
}

export default JobDetail;
