import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "config/apiClient";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import StudentSidebar from "./studentSidebar";

const StudentAttendance = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [course, setCourse] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedRemarks, setSelectedRemarks] = useState("");

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

        if (
          studentResponse.data.data.course_id &&
          studentResponse.data.data.course_id.length > 0
        ) {
          const courseResponse = await apiClient.get(
            `/course/${studentResponse.data.data.course_id[0]}`
          );
          setCourse(courseResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [studentId, selectedMonth, selectedYear]);

  if (!student) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

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
    <div className="flex h-screen">
      <StudentSidebar />
      <div className="flex-1 p-8 bg-gray-100 flex flex-col">
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="text-xl font-semibold">
              Attendance History
            </CardTitle>
            <div className="flex space-x-4 mt-4">
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
          <CardContent className="flex-1 overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="text-center w-1/4">Date</TableHead>
                      <TableHead className="text-center w-1/4">
                        Status
                      </TableHead>
                      <TableHead className="text-center w-1/4">
                        Remarks
                      </TableHead>
                      <TableHead className="text-center w-1/4">
                        Laptop
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
              </div>
              <div className="overflow-y-auto flex-1">
                <Table>
                  <TableBody>
                    {monthDates.map((date) => {
                      const attendanceRecord = attendance.find(
                        (record) => record.date === date
                      );
                      return (
                        <TableRow key={date}>
                          <TableCell className="text-center w-1/4">
                            {date}
                          </TableCell>
                          <TableCell className="text-center w-1/4">
                            {attendanceRecord
                              ? attendanceRecord.status
                              : "No Attendance was not Captured"}
                          </TableCell>
                          <TableCell className="text-center w-1/4">
                            <div className="w-[300px] mx-auto truncate">
                              {attendanceRecord?.remarks && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <button
                                      className="hover:underline focus:outline-none truncate w-full text-left"
                                      onClick={() =>
                                        setSelectedRemarks(
                                          attendanceRecord.remarks
                                        )
                                      }
                                    >
                                      {attendanceRecord.remarks}
                                    </button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogTitle>Full Remarks</DialogTitle>
                                    <p>{selectedRemarks}</p>
                                    <DialogClose />
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentAttendance;
