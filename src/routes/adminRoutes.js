import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from 'pages/admin/admin_pages/adminDashboard';
import MentorsPage from 'pages/admin/admin_pages/mentorsPage';
import CoursesPage from 'pages/admin/admin_pages/coursesPage';


const AdminRoutes = (
  <Routes>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/mentors" element={<MentorsPage />} />
    <Route path="/admin/courses" element={<CoursesPage />} />
  </Routes>
);

export default AdminRoutes;
