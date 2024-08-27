import { Route, Routes } from "react-router-dom";
import StudentProfile from "pages/teachers/teachersPages/individualStudentPage";
import ProtectedStudent from "@/utils/protectedStudent";
import StudentDashboard from "pages/student/studentDashboard";
import ClassesDashboard from "pages/student/studentClasses";

const StudentRoutes = (
  <Routes>
    <Route element={<ProtectedStudent />}>
      <Route key="student" path="/student" element={<StudentDashboard />} />
      <Route
        key="student"
        path="/student/classes"
        element={<ClassesDashboard />}
      />
      <Route
        key="student"
        path="/student/profile"
        element={<StudentProfile />}
      />
    </Route>
  </Routes>
);

export default StudentRoutes;
