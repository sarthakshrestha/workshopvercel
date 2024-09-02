import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { Users, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import SchoolSidebar from "./schoolSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClassAttendancePage = () => {
  const { classId } = useParams();
  const [date, setDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState(null);

  const fetchAttendanceData = async (selectedDate) => {
    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const response = await axios.get(`http://127.0.0.1:8000/attendances/class/${classId}/date/${formattedDate}`);
      setAttendanceData(response.data.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  useEffect(() => {
    fetchAttendanceData(date);
  }, [classId, date]);

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    fetchAttendanceData(selectedDate);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SchoolSidebar />
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Class Attendance</h1>
          
          <div className="flex gap-6">
            {/* Left column (40% width) */}
            <div className="w-2/5 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Summary</CardTitle>
                  <CardDescription>
                    Date: {format(date, 'MMMM d, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                      <Users className="h-5 w-5" />
                      <span>Total Students: {attendanceData?.students.length}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Present: {attendanceData?.students.filter(s => s.status === 'present').length}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <span>Absent: {attendanceData?.students.filter(s => s.status === 'absent').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="w-3/5">
            <Card className="h-full"> 
                <CardHeader>
                  <CardTitle>Attendance List</CardTitle>
                </CardHeader>
                <CardContent className="overflow-auto h-[calc(80vh-10rem)]">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead>Student Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Remarks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceData?.students.map((student) => (
                        <TableRow key={student.student_id}>
                          <TableCell>{student.student_name}</TableCell>
                          <TableCell>
                            {student.status === 'present' ? (
                              <span className="flex items-center text-green-500">
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Present
                              </span>
                            ) : (
                              <span className="flex items-center text-red-500">
                                <XCircle className="mr-2 h-4 w-4" />
                                Absent
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{student.remarks || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassAttendancePage;
