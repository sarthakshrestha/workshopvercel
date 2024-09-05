import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, MessageSquareShare } from "lucide-react";
import TeacherSidebar from "../mentorSidebar";
import { Input } from "@/components/ui/input"; // Add this import
import apiClient from "config/apiClient";

const StudentsPage = () => {
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Add this state
  const { classId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await apiClient.get(`/class/${classId}`);
        setClassData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch class data");
        setLoading(false);
      }
    };

    fetchClassData();
  }, [classId]);

  // Add this function to filter students
  const filteredStudents = classData?.students.filter((student) =>
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      <TeacherSidebar />
      <div className="p-6 bg-white min-h-screen w-full ml-56">
        <Card>
          <CardHeader>
            <CardTitle>{classData?.class_name} - Students</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add search input */}
            <Input
              type="text"
              placeholder="Search by student name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-center">Name</TableHead>
                  <TableHead className="text-center">Age</TableHead>
                  <TableHead className="text-center">Phone</TableHead>
                  <TableHead className="text-center">Email</TableHead>
                  <TableHead className="text-center">Address</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents &&
                  filteredStudents.length > 0 &&
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="text-center">
                        {student.student_name}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.age}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.phone_num}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.student_email}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.address}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/mentor/attendance/${student.id}`)
                          }
                          className="mr-4 bg-zinc-700 text-white hover:bg-zinc-900 hover:text-white"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Attendance
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/mentor/feedback/${student.id}`)
                          }
                        >
                          <MessageSquareShare className="mr-2 h-4 w-4" />
                          Give Feedback
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentsPage;
