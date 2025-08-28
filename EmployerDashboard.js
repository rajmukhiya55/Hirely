import React, { useState, useEffect } from "react";
import "./EmployerDashboard.css";
// ✅ Added import for navigation
import { useNavigate } from "react-router-dom";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState(
    JSON.parse(localStorage.getItem("jobs")) || []
  );
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    logo: "",
    location: "",
    salary: "",
    type: "",
    description: "",
    experience: "", // ✅ New field
    validTill: "", // ✅ New field
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [openJobIndex, setOpenJobIndex] = useState(null);

  // ✅ Added navigate hook
  const navigate = useNavigate();

  useEffect(() => {
    const savedApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const validApplications = savedApplications.filter(
      (app) =>
        app &&
        app.candidate &&
        app.candidate.name &&
        app.candidate.email &&
        app.candidate.phone &&
        app.candidate.resume
    );

    const updatedJobs = jobs.map((job) => {
      // ✅ Collect ALL applicants for this job
      const jobApplicants = validApplications
        .filter((app) => app.job && app.job.id === job.id)
        .map((app) => ({
          ...app.candidate,
          status: app.status || "Pending",
        }));

      // ✅ Always overwrite job.applicants with synced list
      return { ...job, applicants: jobApplicants };
    });

    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  }, []);

  const normalizeJobType = (type) => {
    if (!type) return "";
    const t = type.trim().toLowerCase();
    if (t.includes("full")) return "full-time";
    if (t.includes("part")) return "part-time";
    if (t.includes("intern")) return "internship";
    if (t.includes("remote")) return "remote";
    return t;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostJob = () => {
    const normalizedJob = {
      ...formData,
      id: editingIndex !== null ? jobs[editingIndex].id : Date.now(),
      type: normalizeJobType(formData.type),
      applicants: formData.applicants || [],
    };

    let updatedJobs;
    if (editingIndex !== null) {
      updatedJobs = jobs.map((job, idx) =>
        idx === editingIndex ? normalizedJob : job
      );
      setEditingIndex(null);
      addNotification(`Job "${formData.title}" updated successfully.`);
    } else {
      updatedJobs = [...jobs, normalizedJob];
      addNotification(`New job "${formData.title}" posted.`);
    }

    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    setFormData({
      title: "",
      company: "",
      logo: "",
      location: "",
      salary: "",
      type: "",
      description: "",
      experience: "", // reset
      validTill: "", // reset
    });
  };

  const handleEdit = (index) => {
    setFormData(jobs[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    addNotification("Job deleted successfully.");
  };

  const handleStatusChange = (jobIndex, candidateIndex, status) => {
    const updatedJobs = [...jobs];
    updatedJobs[jobIndex].applicants[candidateIndex].status = status;
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    let allApplications =
      JSON.parse(localStorage.getItem("applications")) || [];
    allApplications = allApplications.map((app) => {
      if (
        app.job &&
        app.job.id === updatedJobs[jobIndex].id &&
        app.candidate.email ===
          updatedJobs[jobIndex].applicants[candidateIndex].email
      ) {
        return { ...app, status };
      }
      return app;
    });
    localStorage.setItem("applications", JSON.stringify(allApplications));

    addNotification(
      `Candidate status updated to "${status}" for job "${jobs[jobIndex].title}".`
    );
  };

  const addNotification = (msg) => {
    setNotifications((prev) => [...prev, msg]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 4000);
  };

  const isJobExpired = (job) => {
    if (!job.validTill) return false;
    const today = new Date();
    const expiryDate = new Date(job.validTill);
    return expiryDate < today;
  };

  // ✅ New function to navigate to ApplicantDetails page
  const viewApplicantDetails = (applicant, job) => {
    navigate("/applicant-details", { state: { applicant, job } });
  };

  return (
    <div className="employer-dashboard">
      <h1 className="dashboard-heading">Employer Dashboard</h1>

      <div className="notifications">
        {notifications.map((note, i) => (
          <div key={i} className="notification">{note}</div>
        ))}
      </div>

      {/* Job Post Form */}
      <div className="form-card">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />

        <h3 style={{ color: "black" }}>Company Logo</h3>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
        {formData.logo && (
          <img
            src={formData.logo}
            alt="Logo Preview"
            className="company-logo-preview"
          />
        )}

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Job Type (Full-time, Part-time, Internship, Remote)"
          value={formData.type}
          onChange={handleChange}
        />

        {/* ✅ Experience */}
        <input
          type="text"
          name="experience"
          placeholder="Experience (e.g. 2+ years, Fresher)"
          value={formData.experience}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
        />

        {/* ✅ Valid Till */}
        <label style={{ marginTop: "10px", color: "black" }}>
          <b>Valid Till:</b>
        </label>
        <input
          type="date"
          name="validTill"
          value={formData.validTill}
          onChange={handleChange}
        />

        <button className="post-btn" onClick={handlePostJob}>
          {editingIndex !== null ? "Update Job" : "Post Job"}
        </button>
      </div>

      {/* Posted Jobs */}
      <h2 className="posted-heading">Your Posted Jobs</h2>
      <div className="jobs-list">
        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          jobs.map((job, index) => (
            <div key={job.id} className="job-card">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>
                  {job.title}{" "}
                  {isJobExpired(job) && (
                    <span style={{ color: "red", fontSize: "14px" }}>
                      (Expired)
                    </span>
                  )}
                </h3>
                {job.logo && (
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      marginLeft: "10px",
                    }}
                  />
                )}
              </div>
              <p><b>Company:</b> {job.company}</p>
              <p><b>Location:</b> {job.location}</p>
              <p><b>Salary:</b> {job.salary}</p>
              <p><b>Type:</b> {job.type}</p>
              <p><b>Experience:</b> {job.experience || "Not specified"}</p>
              <p>{job.description}</p>
              <p><b>Valid Till:</b> {job.validTill || "Lifetime"}</p>

              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>

              <p><b>Applicants:</b> {job.applicants ? job.applicants.length : 0}</p>

              <button
                className="view-applications-btn"
                onClick={() =>
                  setOpenJobIndex(openJobIndex === index ? null : index)
                }
              >
                {openJobIndex === index ? "Hide Applications" : "View Applications"}
              </button>

              {openJobIndex === index && job.applicants && job.applicants.length > 0 && (
                <div className="applicants">
                  <h4>Applicants:</h4>
                  {job.applicants.map((applicant, aIdx) => (
                    <div key={aIdx} className="applicant-card">
                      <p><b>Name:</b> {applicant.name}</p>
                      <p><b>Email:</b> {applicant.email}</p>
                      <p><b>Phone:</b> {applicant.phone}</p>
                      <p>
                        <b>Resume:</b>{" "}
                        <a href={applicant.resume} target="_blank" rel="noreferrer">
                          View
                        </a>
                      </p>
                      <p><b>Status:</b> {applicant.status || "Pending"}</p>
                      <select
                        value={applicant.status || ""}
                        onChange={(e) =>
                          handleStatusChange(index, aIdx, e.target.value)
                        }
                      >
                        <option value="">Update Status</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interview">Interview</option>
                        <option value="selected">Selected</option>
                        <option value="rejected">Rejected</option>
                      </select>

                      {/* ✅ New button to view full application */}
                      <button
                        onClick={() => viewApplicantDetails(applicant, job)}
                        style={{ marginTop: "5px" }}
                      >
                        View Full Application
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
