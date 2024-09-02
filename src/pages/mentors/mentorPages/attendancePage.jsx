import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { Users } from "lucide-react";
import TeacherSidebar from "../mentorSidebar";
import { Toaster } from "@/components/ui/toaster";
import { format } from "date-fns";
import apiClient from "config/apiClient";

const AttendanceComponent = () => {
  const { classId } = useParams();
  const [attendanceData, setAttendanceData] = useState([]);
  const [className, setClassName] = useState("");
  const [isExistingAttendance, setIsExistingAttendance] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = format(new Date(), "yyyy-MM-dd");
        const attendanceResponse = await apiClient.get(
          `/attendances/class/${classId}/date/${today}`
        );

        if (
          attendanceResponse.data.status === "success" &&
          attendanceResponse.data.message !==
            "No attendance found for the given date"
        ) {
          setIsExistingAttendance(true);
          const existingAttendance = attendanceResponse.data.data.students.map(
            (student) => ({
              id: student.student_id,
              name: student.student_name,
              status: student.status,
              laptop: student.laptop,
              reason: student.remarks,
            })
          );
          setAttendanceData(existingAttendance);
        } else {
          await fetchClassData();
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch attendance data",
          variant: "destructive",
        });
        await fetchClassData();
      }
    };

    const fetchClassData = async () => {
      try {
        const response = await apiClient.get(`/class/${classId}`);
        const classData = response.data.data;
        setClassName(classData.class_name);

        const initialAttendance = classData.students.map((student) => ({
          id: student.id,
          name: student.student_name,
          status: "present",
          laptop: true,
          reason: "",
        }));
        setAttendanceData(initialAttendance);
      } catch (error) {
        console.error("Error fetching class data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch class data",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, [classId]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.id === studentId
          ? {
              ...student,
              status,
              reason: status === "present" ? "" : student.reason,
            }
          : student
      )
    );
  };

  const handleReasonChange = (studentId, reason) => {
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.id === studentId ? { ...student, reason } : student
      )
    );
  };

  const submitAttendance = async () => {
    try {
      const submitData = {
        class_id: classId,
        date: format(new Date(), "yyyy-MM-dd"),
        students: attendanceData.map((student) => ({
          student_id: student.id,
          student_name: student.name,
          status: student.status,
          remarks: student.reason,
          laptop: student.laptop,
        })),
      };

      await apiClient.post(`/attendances/class`, submitData);

      const presentCount = attendanceData.filter(
        (student) => student.status === "present"
      ).length;
      const absentCount = attendanceData.length - presentCount;

      toast({
        title: "Attendance Submitted Successfully",
        description: `Present: ${presentCount}, Absent: ${absentCount}`,
      });
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast({
        title: "Error",
        description: "Failed to submit attendance",
        variant: "destructive",
      });
    }
  };

  const handleCheckbox = (id) => {
    let toChangeData = attendanceData.find((attendance) => attendance.id == id);
    let notToChangeData = attendanceData.filter(
      (attendance) => attendance.id != id
    );
    let newChangedData = { ...toChangeData, laptop: !toChangeData.laptop };
    setAttendanceData([newChangedData, ...notToChangeData]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <TeacherSidebar />
      <div className="p-6 bg-gray-100 w-full flex flex-col overflow-hidden ml-56">
        <Card
          className="w-full max-w-4xl mx-auto flex flex-col bg-white"
          style={{ height: "95vh" }}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center text-2xl">
                  <Users className="mr-2 h-6 w-6" />
                  {className} Attendance
                </CardTitle>
              </div>
              <div className="text-lg font-semibold">
                {format(new Date(), "MMMM d, yyyy")}
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col flex-grow overflow-hidden">
            <div className="overflow-auto flex-grow">
              <table className="w-full">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="p-2 text-left">Name</th>
                    <th className="text-center p-2">Status</th>
                    <th className="text-center p-2">Reason (if Informed)</th>
                    <th className="text-center p-2">Laptop</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((student) => (
                    <tr key={student.id} className="border-t">
                      <td className="p-2">{student.name}</td>
                      <td className="p-2 flex justify-center items-center">
                        <Select
                          value={student.status}
                          onValueChange={(value) =>
                            handleStatusChange(student.id, value)
                          }
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-2">
                        {student.status !== "present" && (
                          <Input
                            type="text"
                            placeholder="Reason for absence/late"
                            value={student.reason}
                            onChange={(e) =>
                              handleReasonChange(student.id, e.target.value)
                            }
                            className="w-full placeholder-gray-200"
                            placeholderColor="text-gray-200"
                          />
                        )}
                      </td>
                      <td className="text-center">
                        <Checkbox
                          onClick={(e) => handleCheckbox(student.id)}
                          checked={student.laptop}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button className="w-full mt-6" onClick={submitAttendance}>
              {isExistingAttendance ? "Update Attendance" : "Submit Attendance"}
            </Button>
          </CardContent>
        </Card>
        <Toaster />
      </div>
    </div>
  );
};

export default AttendanceComponent;
