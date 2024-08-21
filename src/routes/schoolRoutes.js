import { Route, Routes } from 'react-router-dom';
import SchoolOverview from "pages/admin/admin_pages/school_pages/schoolOverview";
import SchoolProfile from "pages/admin/admin_pages/school_pages/schoolProfile";
import { SchoolContextProvider } from "context/SchoolContext";
import SchoolsPage from "pages/admin/admin_pages/schoolsPage";
import SchoolClasses from 'pages/admin/admin_pages/school_pages/schoolClasses';
import SchoolCourses from 'pages/admin/admin_pages/school_pages/schoolCourses';
import ClassDetails from 'pages/admin/class_details/classDetails';
import SchoolCalendar from 'pages/admin/admin_pages/school_pages/schoolCalendar';

const SchoolRoutes = (
  <SchoolContextProvider>
    <Routes>
      <Route path="/admin/schools" element={<SchoolsPage />} />
      <Route path="/admin/schools/overview" element={<SchoolOverview />} />
      <Route path="/admin/schools/classes" element={<SchoolClasses />} />
      <Route path="/admin/schools/classes/:classId" element={<ClassDetails />} />
      <Route path="/admin/schools/courses" element={<SchoolCourses />} />
      <Route path="/admin/schools/calendar" element={<SchoolCalendar />} />
      <Route path="/admin/schools/profile" element={<SchoolProfile />} />
    </Routes>
  </SchoolContextProvider>
);

export default SchoolRoutes;
