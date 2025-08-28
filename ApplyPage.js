import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ApplyPage.css";

export default function ApplyPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    careerObjective: "",
    education: [{ degree: "", institution: "", year: "" }],
    experience: [{ role: "", company: "", duration: "" }],
    extracurriculars: [""],
    projects: [{ title: "", description: "" }],
    skills: [""],
  });

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const jobIndex = parseInt(jobId, 10);

    if (!isNaN(jobIndex) && savedJobs[jobIndex]) {
      if (!savedJobs[jobIndex].applicants) {
        savedJobs[jobIndex].applicants = [];
        localStorage.setItem("jobs", JSON.stringify(savedJobs));
      }
      setJob(savedJobs[jobIndex]);
    }
  }, [jobId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (section, index, field, value) => {
    const updated = [...formData[section]];
    if (typeof updated[index] === "string") {
      updated[index] = value;
    } else {
      updated[index][field] = value;
    }
    setFormData({ ...formData, [section]: updated });
  };

  const addField = (section, emptyItem) => {
    setFormData({ ...formData, [section]: [...formData[section], emptyItem] });
  };

  const removeField = (section, index) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData({ ...formData, [section]: updated });
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, resume: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!job) {
      alert("Job not found.");
      return;
    }

    const applications = JSON.parse(localStorage.getItem("applications")) || [];

    const alreadyApplied = applications.some(
      (app) =>
        app.job.id === job.id &&
        app.candidate.email === formData.email
    );

    if (alreadyApplied) {
      alert("You have already applied for this job!");
      return;
    }

    const newApplication = {
      job: { id: job.id, title: job.title, company: job.company },
      candidate: { ...formData },
      status: "Pending",
      appliedAt: new Date().toLocaleString(),
    };

    applications.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(applications));

    alert("Application submitted successfully!");
    navigate("/");
  };

  if (!job) return <p>Job not found</p>;

  const sectionStyle = {
    background: "#fff",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    padding: "6px 12px",
    margin: "5px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer"
  };

  return (
    <div className="apply-page">
      <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
        {/* Heading + Logo + Company Info */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <div>
            <h1 style={{ fontSize: "40px", fontWeight: "bold", margin: 0, color: "#ffffffff" }}>
              Apply for {job.title}
            </h1>
            <br />
            <p style={{ margin: "5px 0", fontSize: "22px", color: "#ffffffff" }}>
              <span style={{ fontWeight: "bold" }}>Company:</span>
              <span style={{ marginLeft: "8px" }}>{job.company}</span>
            </p>
            <p style={{ margin: "5px 0", fontSize: "22px", color: "#ffffffff" }}>
              <span style={{ fontWeight: "bold" }}>Location:</span>
              <span style={{ marginLeft: "8px" }}>{job.location}</span>
            </p>
            <p style={{ margin: "5px 0", fontSize: "22px", color: "#ffffffff" }}>
              <span style={{ fontWeight: "bold" }}>Description:</span>
              <span style={{ marginLeft: "8px" }}>{job.description}</span>
            </p>
          </div>
          {job.logo && (
            <img
              src={job.logo}
              alt={`${job.company} Logo`}
              style={{ width: "70px", height: "70px", objectFit: "contain", marginLeft: "20px" }}
            />
          )}
        </div>

        {/* FORM START */}
        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div style={sectionStyle}>
            <h3 style={{ color: "#000" }}>Basic Information</h3>
            <input type="text" name="name" placeholder="Full Name"
              value={formData.name} onChange={handleChange} style={inputStyle} required />
            <input type="email" name="email" placeholder="Email"
              value={formData.email} onChange={handleChange} style={inputStyle} required />
            <input type="tel" name="phone" placeholder="Phone Number"
              value={formData.phone} onChange={handleChange} style={inputStyle} required />
          </div>

          {/* Career Objective */}
          <div style={sectionStyle}>
            <h3 style={{ color: "#000" }}>Career Objective</h3>
            <textarea
              name="careerObjective"
              placeholder="Write your career objective..."
              value={formData.careerObjective}
              onChange={handleChange}
              rows="3"
              style={inputStyle}
            />
          </div>

          {/* Education */}
          <div style={sectionStyle}>
            <h3 style={{ color: "#000" }}>Education</h3>
            {formData.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <input type="text" placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleArrayChange("education", i, "degree", e.target.value)}
                  style={inputStyle} />
                <input type="text" placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleArrayChange("education", i, "institution", e.target.value)}
                  style={inputStyle} />
                <input type="text" placeholder="Year"
                  value={edu.year}
                  onChange={(e) => handleArrayChange("education", i, "year", e.target.value)}
                  style={inputStyle} />
                <button type="button" onClick={() => removeField("education", i)}
                  style={{ ...buttonStyle, background: "#dc3545", color: "#fff" }}>❌ Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addField("education", { degree: "", institution: "", year: "" })}
              style={{ ...buttonStyle, background: "#28a745", color: "#fff" }}>➕ Add Education</button>
          </div>

          {/* Work Experience */}
          <div style={sectionStyle}>
            <h3 style={{ color: "#000" }}>Work Experience</h3>
            {formData.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <input type="text" placeholder="Role"
                  value={exp.role}
                  onChange={(e) => handleArrayChange("experience", i, "role", e.target.value)}
                  style={inputStyle} />
                <input type="text" placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleArrayChange("experience", i, "company", e.target.value)}
                  style={inputStyle} />
                <input type="text" placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => handleArrayChange("experience", i, "duration", e.target.value)}
                  style={inputStyle} />
                <button type="button" onClick={() => removeField("experience", i)}
                  style={{ ...buttonStyle, background: "#dc3545", color: "#fff" }}>❌ Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addField("experience", { role: "", company: "", duration: "" })}
              style={{ ...buttonStyle, background: "#28a745", color: "#fff" }}>➕ Add Experience</button>
          </div>

          {/* Extracurriculars */}
          <div style={sectionStyle}>
            <h3 style={{ color: "#000" }}>Extra Curricular Activities</h3>
            {formData.extracurriculars.map((activity, i) => (
              <div key={i}>
                <input type="text" placeholder="Activity"
                  value={activity}
                  onChange={(e) => handleArrayChange("extracurriculars", i, null, e.target.value)}
                  style={inputStyle} />
                <button type="button" onClick={() => removeField("extracurriculars", i)}
                  style={{ ...buttonStyle, background: "#dc3545", color: "#fff" }}>❌ Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addField("extracurriculars", "")}
              style={{ ...buttonStyle, background: "#28a745", color: "#fff" }}>➕ Add Activity</button>
          </div>

          {/* Projects */}
          <div style={sectionStyle}>
            <h3 style={{ color: "#000" }}>Projects</h3>
            {formData.projects.map((proj, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <input type="text" placeholder="Project Title"
                  value={proj.title}
                  onChange={(e) => handleArrayChange("projects", i, "title", e.target.value)}
                  style={inputStyle} />
                <input type="text" placeholder="Description"
                  value={proj.description}
                  onChange={(e) => handleArrayChange("projects", i, "description", e.target.value)}
                  style={inputStyle} />
                <button type="button" onClick={() => removeField("projects", i)}
                  style={{ ...buttonStyle, background: "#dc3545", color: "#fff" }}>❌ Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addField("projects", { title: "", description: "" })}
              style={{ ...buttonStyle, background: "#28a745", color: "#fff" }}>➕ Add Project</button>
          </div>

          {/* Skills */}
          <div style={sectionStyle}>
            <h3 style={{ color: "#000" }}>Skills</h3>
            {formData.skills.map((skill, i) => (
              <div key={i}>
                <input type="text" placeholder="Skill"
                  value={skill}
                  onChange={(e) => handleArrayChange("skills", i, null, e.target.value)}
                  style={inputStyle} />
                <button type="button" onClick={() => removeField("skills", i)}
                  style={{ ...buttonStyle, background: "#dc3545", color: "#fff" }}>❌ Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addField("skills", "")}
              style={{ ...buttonStyle, background: "#28a745", color: "#fff" }}>➕ Add Skill</button>
          </div>

          {/* Resume */}
          <div style={sectionStyle}>
            <h3 style={{ color: "#000" }}>Resume</h3>
            <input type="file" accept=".pdf,.doc,.docx,.txt"
              onChange={handleResumeUpload} style={inputStyle} />
            <input type="text" name="resume" placeholder="Or paste resume link"
              value={formData.resume} onChange={handleChange} style={inputStyle} />
          </div>

          {/* Buttons */}
          <button type="submit" style={{ ...buttonStyle, background: "#007bff", color: "#fff" }}>Submit Application</button>
          <button type="button" onClick={() => navigate(-1)}
            style={{ ...buttonStyle, background: "#6c757d", color: "#fff" }}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
