import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from 'pages/admin/admin_pages/adminDashboard';
import MentorsPage from 'pages/admin/admin_pages/mentorsPage';
import CoursesPage from 'pages/admin/admin_pages/coursesPage';
import EventPage from 'pages/admin/admin_pages/eventPage';


const AdminRoutes = (
  <Routes>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/mentors" element={<MentorsPage />} />
    <Route path="/admin/courses" element={<CoursesPage />} />
    <Route path="/admin/events" element={<EventPage/>}/>
  </Routes>
);

export default AdminRoutes;
