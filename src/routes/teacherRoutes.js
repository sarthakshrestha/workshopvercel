import { Route, Routes } from 'react-router-dom';
import TeachersDashboard from 'pages/teachers/teachersPages/teachersDashboard';
import SchoolsPage from 'pages/teachers/teachersPages/schoolsPage';
import SchoolClasses from 'pages/teachers/teachersPages/Classes';
import AttendanceComponent from 'pages/teachers/teachersPages/attendancePage';
import StudentsPage from 'pages/teachers/teachersPages/studentsPage';
import StudentProfile from 'pages/teachers/teachersPages/individualStudentPage';

const TeacherRoutes = (
    <Routes>
      <Route path="/teacher/dashboard" element={<TeachersDashboard />} />
      <Route path="/teacher/school" element={<SchoolsPage />} />
      <Route path="/teacher/classes" element={<SchoolClasses />} />
      <Route path="/teacher/attendances/:classId" element={<AttendanceComponent/>}/>
      <Route path="/teacher/students/:classId" element={<StudentsPage />} />
      <Route path="/teacher/attendance/:studentId" element={<StudentProfile />} />
    </Routes>
);

export default TeacherRoutes;