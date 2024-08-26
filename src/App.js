import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminRoutes from 'routes/adminRoutes';
import PublicRoutes from 'routes/publicRoutes';
import SchoolRoutes from 'routes/schoolRoutes';
import TeacherRoutes from 'routes/teacherRoutes';

function App() {
  return (
    <Router>
      {PublicRoutes}
      {SchoolRoutes}
      {AdminRoutes}
      {TeacherRoutes}
    </Router>
  );
}

export default App;
