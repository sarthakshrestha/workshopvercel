// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LandingPage from './pages/landingPage';
import AdminDashboard from 'pages/admin/admin_pages/adminDashboard';
import SchoolsPage from 'pages/admin/admin_pages/schoolsPage';
import MentorsPage from 'pages/admin/admin_pages/mentorsPage';
import CoursesPage from 'pages/admin/admin_pages/coursesPage';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />}/>
        <Route path="/admin/schools" element={<SchoolsPage />} />
        <Route path="/admin/mentors" element={<MentorsPage />} />
        <Route path="/admin/courses" element={<CoursesPage />} />
          {/* <Route path="events" element={<EventsPage />} /> */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
