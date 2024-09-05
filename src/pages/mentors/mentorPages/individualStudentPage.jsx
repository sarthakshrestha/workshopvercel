import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MentorSidebar from "../mentorSidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, Phone, Mail, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "config/apiClient";
import ProfilePictureAvatar from "./profilePictureAvator";

const StudentProfile = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = await apiClient.get(`/student/${studentId}`);
        setStudent(studentResponse.data.data);
        let classid = studentResponse.data.data.class_id;

        if (classid && classid.length > 0) {
          const attendanceResponse = await apiClient.get(
            `/attendances/student/${studentId}/class/${classid}/month/${selectedYear}/${selectedMonth
              .toString()
              .padStart(2, "0")}`
          );
          setAttendance(attendanceResponse.data.data.attendances);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [studentId, selectedMonth, selectedYear]);

  const generateMonthDates = (year, month) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month - 1, i + 1);
      return date.toISOString().split("T")[0];
    });
  };

  const monthDates = generateMonthDates(selectedYear, selectedMonth);

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const years = Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i);

  return (
    <div className="flex">
      <MentorSidebar />
      <div className="w-full flex flex-col p-8 bg-gray-100 ml-56 ">
        <div className="flex w-full justify-center items-center ">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 ">
              <div className="flex space-x-4 justify-between items-center">
                <div>
                  <h2 className="text-2xl mb-[20px]">
                    {student?.student_name}
                  </h2>
                  <div className="flex items-center  space-x-2 mb-2">
                    <User size={18} />
                    <span>
                      <strong className="font-semibold">Age:</strong>{" "}
                      {student?.age}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone size={18} />
                    <span>
                      <strong className="font-semibold">Phone:</strong>{" "}
                      {student?.phone_num}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail size={18} />
                    <span>
                      <strong className="font-semibold">Email:</strong>{" "}
                      {student?.student_email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin size={18} />
                    <span>
                      <strong className="font-semibold">Address:</strong>{" "}
                      {student?.address}
                    </span>
                  </div>
                </div>
                <div>
                  <ProfilePictureAvatar
                    profilePicture={student?.profile_picture}
                    studentName={student?.student_name}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Attendance</CardTitle>
            <div className="flex space-x-4">
              <Select
                value={selectedMonth.toString()}
                onValueChange={(value) => setSelectedMonth(parseInt(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem
                      key={month.value}
                      value={month.value.toString()}
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => setSelectedYear(parseInt(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-[38vh] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className=" w-1/6 text-center">Date</TableHead>
                    <TableHead className="w-1/3 text-center">Status</TableHead>
                    <TableHead className="w-2/6">Remarks</TableHead>
                    <TableHead className="text-center w-1/12">Laptop</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthDates.map((date) => {
                    const attendanceRecord = attendance.find(
                      (record) => record.date === date
                    );
                    return (
                      <TableRow key={date}>
                        <TableCell className="text-center">{date}</TableCell>
                        <TableCell className="text-center">
                          {attendanceRecord
                            ? attendanceRecord.status
                            : "No class in this day / Attendance was not taken"}
                        </TableCell>
                        <TableCell>
                          <span className="w-[300px] truncate">
                            {attendanceRecord ? attendanceRecord.remarks : ""}
                          </span>
                        </TableCell>
                        <TableCell className="text-center w-1/4">
                          {attendanceRecord
                            ? attendanceRecord.laptop
                              ? "Yes"
                              : "No"
                            : "---"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;
