import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JobListings from "./pages/JobListings";
import ApplyPage from "./pages/ApplyPage";
import EmployerDashboard from "./pages/EmployerDashboard";
import ApplicantDetails from "./pages/ApplicantDetails";
import CandidateDashboard from "./pages/CandidateDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword"; 


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/apply/:jobId" element={<ApplyPage />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/applicant-details" element={<ApplicantDetails />} />
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
