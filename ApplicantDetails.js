// src/ApplicantDetails.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ApplicantDetails.css";

export default function ApplicantDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // support a few possible shapes that might be passed via navigate(state)
  const state = location.state || {};
  const applicant =
    state.applicant ||
    state.application ||
    state.candidate ||
    state.app ||
    {};
  const job = state.job || state.jobData || {};

  // If someone accidentally passed the full application object instead of `applicant`,
  // try to handle that shape as well:
  const maybeApplication = state.application || state.appData || state.app;
  const actualApplicant =
    Object.keys(applicant).length === 0 && maybeApplication?.candidate
      ? maybeApplication.candidate
      : applicant;

  if (!actualApplicant || Object.keys(actualApplicant).length === 0) {
    return (
      <div className="applicant-details">
        <div style={{ padding: 24 }}>
          <h2>No applicant data available</h2>
          <button onClick={() => navigate(-1)} style={buttonStyle}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // helpers
  const formatResumeHref = (resume) => {
    if (!resume) return null;
    // resume might be a dataURL or a link — return as-is
    return resume;
  };

  const renderEducation = (edu) => {
    if (!edu) return <div>Not provided</div>;
    if (Array.isArray(edu)) {
      return (
        <ul>
          {edu.map((e, i) =>
            typeof e === "string" ? (
              <li key={i}>{e}</li>
            ) : (
              <li key={i}>
                <strong>{e.degree || e.title || "Degree:"}</strong>{" "}
                {e.institution ? `, ${e.institution}` : ""}{" "}
                {e.year ? `(${e.year})` : ""}
              </li>
            )
          )}
        </ul>
      );
    }
    // single object or string
    if (typeof edu === "string") return <div>{edu}</div>;
    return (
      <div>
        <strong>{edu.degree || edu.title}</strong>{" "}
        {edu.institution ? `, ${edu.institution}` : ""}{" "}
        {edu.year ? `(${edu.year})` : ""}
      </div>
    );
  };

  const renderExperience = (exp) => {
    if (!exp) return <div>Not provided</div>;
    if (Array.isArray(exp)) {
      return (
        <ul>
          {exp.map((e, i) =>
            typeof e === "string" ? (
              <li key={i}>{e}</li>
            ) : (
              <li key={i}>
                <strong>{e.role || "Role"}</strong>{" "}
                {e.company ? ` @ ${e.company}` : ""}{" "}
                {e.duration ? ` — ${e.duration}` : ""}
                {e.description ? (
                  <div style={{ marginTop: 6 }}>{e.description}</div>
                ) : null}
              </li>
            )
          )}
        </ul>
      );
    }
    // single object or string
    if (typeof exp === "string") return <div>{exp}</div>;
    return (
      <div>
        <strong>{exp.role}</strong> {exp.company ? ` @ ${exp.company}` : ""}{" "}
        {exp.duration ? ` — ${exp.duration}` : ""}
      </div>
    );
  };

  const renderStringList = (list) => {
    if (!list || (Array.isArray(list) && list.length === 0))
      return <div>Not provided</div>;
    if (Array.isArray(list)) {
      return (
        <ul>
          {list.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      );
    }
    // single string
    return <div>{list}</div>;
  };

  const resumeHref = formatResumeHref(actualApplicant.resume);

  // inline styles used so you can paste file without needing CSS changes
  const containerStyle = {
    padding: 24,
    maxWidth: 900,
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    color: "#222",
  };

  const headerRow = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  };

  const titleStyle = { fontSize: 30, margin: 0, fontWeight: 700 };
  const companyStyle = { fontSize: 18, margin: "6px 0" };
  const jobMetaStyle = { margin: "6px 0", fontSize: 16 };

  const section = {
    background: "#fff",
    padding: 16,
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    marginBottom: 16,
  };
  const sectionTitle = { fontSize: 20, margin: "0 0 10px 0" };
  const label = { fontWeight: 700, marginRight: 8, fontSize: 16 };

  // small button style used below
  const backButton = {
    padding: "8px 12px",
    background: "#333",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  };

  return (
    <div className="applicant-details">
  <div style={containerStyle}>
    <div style={headerRow}>
      <div>
        <h1
          style={{
            ...titleStyle,
            color: "#ffffff", // ✅ White heading
            fontSize: "40px",
          }}
        >
          Application for{" "}
          {job.title || actualApplicant.jobTitle || "Job"}
        </h1>

        {job.company || actualApplicant.company ? (
          <div
            style={{
              ...companyStyle,
              color: "#ffffff", // ✅ White company name
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 30, color: "#ffffff" }}>
              {job.company || actualApplicant.company}
            </span>
          </div>
        ) : null}

        {job.location && (
          <div style={{ ...jobMetaStyle, color: "#ffffff" }}>
            <strong>Location:</strong> {job.location}
          </div>
        )}
        {job.description && (
          <div style={{ ...jobMetaStyle, color: "#ffffff" }}>
            <strong>Description:</strong> {job.description}
          </div>
        )}
      </div>

          {/* logo, if available */}
          {job.logo && (
            <div style={{ minWidth: 80, textAlign: "right" }}>
              <img
                src={job.logo}
                alt={`${job.company || "Company"} logo`}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                  borderRadius: 6,
                }}
              />
            </div>
          )}
        </div>

        {/* Basic info */}
        <div style={section}>
          <h3 style={sectionTitle}>Basic Information</h3>
          <p>
            <span style={label}>Name:</span>
            <span style={{ fontSize: 16 }}>
              {actualApplicant.name || "—"}
            </span>
          </p>
          <p>
            <span style={label}>Email:</span>
            <span style={{ fontSize: 16 }}>
              {actualApplicant.email || "—"}
            </span>
          </p>
          <p>
            <span style={label}>Phone:</span>
            <span style={{ fontSize: 16 }}>
              {actualApplicant.phone || "—"}
            </span>
          </p>
          {state.application?.appliedAt && (
            <p>
              <span style={label}>Applied At:</span>
              <span style={{ fontSize: 16 }}>
                {state.application.appliedAt}
              </span>
            </p>
          )}
        </div>

        {/* Career objective */}
        <div style={section}>
          <h3 style={sectionTitle}>Career Objective</h3>
          <div style={{ fontSize: 15 }}>
            {actualApplicant.careerObjective || "Not provided"}
          </div>
        </div>

        {/* Education */}
        <div style={section}>
          <h3 style={sectionTitle}>Education</h3>
          {renderEducation(actualApplicant.education)}
        </div>

        {/* Experience */}
        <div style={section}>
          <h3 style={sectionTitle}>Work Experience</h3>
          {renderExperience(actualApplicant.experience)}
        </div>

        {/* Extracurriculars */}
        <div style={section}>
          <h3 style={sectionTitle}>Extra Curricular Activities</h3>
          {renderStringList(actualApplicant.extracurriculars)}
        </div>

        {/* Projects */}
        <div style={section}>
          <h3 style={sectionTitle}>Academic / Personal Projects</h3>
          {Array.isArray(actualApplicant.projects) &&
          actualApplicant.projects.length > 0 ? (
            <ul>
              {actualApplicant.projects.map((p, i) => (
                <li key={i}>
                  <strong>
                    {p.title || p.name || `Project ${i + 1}`}
                  </strong>
                  {p.description ? (
                    <div style={{ marginTop: 6 }}>{p.description}</div>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : actualApplicant.projects &&
            typeof actualApplicant.projects === "object" ? (
            <div>
              <strong>{actualApplicant.projects.title}</strong>
              <div style={{ marginTop: 6 }}>
                {actualApplicant.projects.description}
              </div>
            </div>
          ) : (
            <div>Not provided</div>
          )}
        </div>

        {/* Skills */}
        <div style={section}>
          <h3 style={sectionTitle}>Skills</h3>
          {renderStringList(actualApplicant.skills)}
        </div>

        {/* Resume & Status */}
        <div style={section}>
          <h3 style={sectionTitle}>Resume & Status</h3>

          <p>
            <span style={label}>Resume:</span>
            {resumeHref ? (
              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 16, color: "#1a73e8" }}
              >
                View Resume
              </a>
            ) : (
              <span style={{ fontSize: 16 }}>Not provided</span>
            )}
          </p>

          <p>
            <span style={label}>Status:</span>
            <span style={{ fontSize: 16 }}>
              {actualApplicant.status || "Pending"}
            </span>
          </p>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => navigate(-1)} style={backButton}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

// small shared button style used in top-level early return
const buttonStyle = {
  padding: "8px 12px",
  background: "#333",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};



