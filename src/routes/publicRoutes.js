import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInPage from "pages/authentication/login";
import LandingPage from "../pages/landingPage";
import ContactUs from "pages/contactus/contactus";
import AdminLogin from "pages/authentication/adminlogin";
import MentorLogin from "pages/authentication/mentorlogin";

const PublicRoutes = [
  <Routes>
    <Route key="landing" path="/" element={<LandingPage />} />,
    <Route key="auth" path="/login" element={<SignInPage />} />,
    <Route key="auth" path="/mlogin" element={<MentorLogin />} />,
    <Route key="auth" path="/admin/login" element={<AdminLogin />} />,
    {/* <Route key="aboutus" path="/about" element={<AboutUs />} />, */}
    {/* <Route key="courses" path="/courses" element={<Courses />} />, */}
    {/* <Route key="student" path="/student" element={<StudentDashboard />} /> */}
    {/* <Route
      key="student"
      path="/student/classes"
      element={<ClassesDashboard />}
    /> */}
    {/* <Route key="student" path="/student/profile" element={<StudentProfile />} /> */}
    <Route key="contact" path="/contact" element={<ContactUs />} />
  </Routes>,
];

export default PublicRoutes;
