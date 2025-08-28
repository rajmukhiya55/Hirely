import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CandidateDashboard.css";

export default function CandidateDashboard() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
  });

  const [applications, setApplications] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  // Load saved profile & applications on page load
  useEffect(() => {
    const savedProfile =
      JSON.parse(localStorage.getItem("candidateProfile")) || {};
    if (savedProfile.name) {
      setProfile(savedProfile);
      setIsSaved(true);
    }

    const allApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const candidateApps = savedProfile.email
      ? allApplications.filter(
          (app) => app.candidate.email === savedProfile.email
        )
      : allApplications;

    setApplications(candidateApps);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle resume file upload
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, resume: reader.result }));
      };
      reader.readAsDataURL(file); // Convert to base64
    }
  };

  // Save profile
  const saveProfile = () => {
    if (!profile.name || !profile.email || !profile.phone) {
      alert("Please fill in all required fields before saving.");
      return;
    }
    localStorage.setItem("candidateProfile", JSON.stringify(profile));
    setIsSaved(true);
    alert("Profile saved successfully!");
  };

  // Clear profile completely
  const clearProfile = () => {
    localStorage.removeItem("candidateProfile");
    setProfile({ name: "", email: "", phone: "", resume: "" });
    setIsSaved(false);
    alert("Profile cleared successfully!");
  };

  // View application details
  const viewApplication = (app) => {
    navigate("/applicant-details", {
      state: { applicant: app.candidate, job: app.job, application: app },
    });
  };

  // Delete an application
  const deleteApplication = (index) => {
    const updatedApplications = applications.filter((_, i) => i !== index);
    setApplications(updatedApplications);

    const allApplications =
      JSON.parse(localStorage.getItem("applications")) || [];
    const remaining = allApplications.filter(
      (app) =>
        !(
          app.candidate.email === profile.email &&
          applications.indexOf(app) === index
        )
    );
    localStorage.setItem("applications", JSON.stringify(remaining));

    alert("Application deleted successfully!");
  };

  return (
    <div className="candidate-dashboard">
      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <h2>Candidate Dashboard</h2>

        {/* Profile Section */}
        <h3>Profile</h3>
        <div
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "20px",
            background: "#f9f9f9",
          }}
        >
          <label style={{ display: "block", marginBottom: "10px" }}>
            Name:
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={isSaved}
              placeholder="Enter your name"
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label style={{ display: "block", marginBottom: "10px" }}>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={isSaved}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label style={{ display: "block", marginBottom: "10px" }}>
            Phone:
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={isSaved}
              placeholder="Enter your phone number"
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </label>

          <label style={{ display: "block", marginBottom: "10px" }}>
            Resume:
            {profile.resume ? (
              <div style={{ marginBottom: "5px" }}>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Uploaded Resume
                </a>
              </div>
            ) : (
              <input
                type="text"
                name="resume"
                value={profile.resume}
                onChange={handleChange}
                disabled={isSaved}
                placeholder="Enter resume link"
                style={{
                  width: "100%",
                  padding: "8px",
                  marginTop: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            )}

            {!isSaved && (
              <input
                type="file"
                onChange={handleResumeUpload}
                accept=".pdf,.doc,.docx"
                style={{ marginTop: "10px" }}
              />
            )}
          </label>

          {!isSaved ? (
            <button
              onClick={saveProfile}
              style={{
                padding: "10px 20px",
                background: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Save Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsSaved(false);
                  alert("You can now edit your profile.");
                }}
                style={{
                  padding: "10px 20px",
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Edit Profile
              </button>

              <button
                onClick={clearProfile}
                style={{
                  padding: "10px 20px",
                  background: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Clear Profile
              </button>
            </>
          )}
        </div>

        {/* Applied Jobs Section */}
        <h3>Applied Jobs</h3>
        {applications.length === 0 ? (
          <p>You have not applied to any jobs yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "12px" }}>
            {applications.map((app, index) => (
              <div
                key={index}
                style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  onClick={() => viewApplication(app)}
                  style={{ cursor: "pointer" }}
                >
                  <h4 style={{ margin: 0 }}>{app.job.title}</h4>
                  <p style={{ margin: "4px 0" }}>{app.job.company}</p>
                  <p>Status: {app.status} | Applied At: {app.appliedAt}</p>
                </div>

                <div>
                  <button
                    onClick={() => viewApplication(app)}
                    style={{
                      padding: "6px 12px",
                      background: "#1a73e8",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginRight: "8px",
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteApplication(index)}
                    style={{
                      padding: "6px 12px",
                      background: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

