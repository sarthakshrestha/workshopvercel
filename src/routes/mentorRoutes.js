import { Route, Routes } from "react-router-dom";
import TeachersDashboard from "pages/mentors/mentorPages/mentorDashboard";
import SchoolsPage from "pages/mentors/mentorPages/schoolsPage";
import SchoolClasses from "pages/mentors/mentorPages/Classes";
import AttendanceComponent from "pages/mentors/mentorPages/attendancePage";
import StudentsPage from "pages/mentors/mentorPages/studentsPage";
import StudentProfile from "pages/mentors/mentorPages/individualStudentPage";
import ProtectedMentor from "@/utils/protectedMentor";
import Feedback from "pages/mentors/mentorPages/feedbackPage";
import AssignmentPage from "pages/mentors/mentorPages/assignmentPage";
import JournalPage from "pages/mentors/mentorPages/journalPage";
import IndividualMentor from "pages/mentors/mentorPages/mentorProfile";

const MentorRoutes = (
  <Routes>
    <Route element={<ProtectedMentor />}>
      <Route path="/mentor/dashboard" element={<TeachersDashboard />} />
      <Route path="/mentor/school" element={<SchoolsPage />} />
      <Route path="/mentor/journals" element={<JournalPage />} />
      <Route path="/mentor/classes" element={<SchoolClasses />} />
      <Route
        path="/mentor/attendances/:classId"
        element={<AttendanceComponent />}
      />
      <Route path="/mentor/students/:classId" element={<StudentsPage />} />
      <Route
        path="/mentor/attendance/:studentId"
        element={<StudentProfile />}
      />
      <Route path="/mentor/feedback/:studentId" element={<Feedback />} />
      <Route path="/mentor/assignment/:classId" element={<AssignmentPage />} />
      <Route path="/mentor/profile" element={<IndividualMentor />} />
    </Route>
  </Routes>
);

export default MentorRoutes;
