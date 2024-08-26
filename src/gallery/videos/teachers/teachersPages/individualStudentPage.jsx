import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TeacherSidebar from '../teacherSidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Phone, Mail, MapPin, BookOpen, Clock, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StudentProfile = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [attendance, setAttendance] = useState([]);
    const [course, setCourse] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentResponse = await axios.get(`http://127.0.0.1:8000/student/${studentId}`);
                setStudent(studentResponse.data.data);
                let classid = studentResponse.data.data.class_id;

                if (classid && classid.length > 0) {
                    const attendanceResponse = await axios.get(`http://127.0.0.1:8000/attendances/student/${studentId}/class/${classid}/month/${selectedYear}/${selectedMonth.toString().padStart(2, '0')}`);
                    setAttendance(attendanceResponse.data.data.attendances);
                }

                if (studentResponse.data.data.course_id && studentResponse.data.data.course_id.length > 0) {
                    const courseResponse = await axios.get(`http://127.0.0.1:8000/course/${studentResponse.data.data.course_id[0]}`);
                    setCourse(courseResponse.data.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [studentId, selectedMonth, selectedYear]);

    if (!student) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    const generateMonthDates = (year, month) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        return Array.from({ length: daysInMonth }, (_, i) => {
            const date = new Date(year, month - 1, i + 1);
            return date.toISOString().split('T')[0];
        });
    };

    const monthDates = generateMonthDates(selectedYear, selectedMonth);

    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' }
    ];

    const years = Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i);

    return (
        <div className='flex'>
            <TeacherSidebar />
            <div className="flex-1 p-8 bg-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card >
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">Student Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 ">
                            <div className='flex space-x-4 justify-between items-center'>
                                <div>
                                    <h2 className="text-2xl mb-[20px] ">{student.student_name}</h2>
                                    <div className="flex items-center  space-x-2 mb-2">
                                        <User size={18} />
                                        <span><strong className='font-semibold'>Age:</strong> {student.age}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Phone size={18} />
                                        <span><strong className='font-semibold'>Phone:</strong> {student.phone_num}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Mail size={18} />
                                        <span><strong className='font-semibold'>Email:</strong> {student.student_email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <MapPin size={18} />
                                        <span><strong className='font-semibold'>Address:</strong> {student.address}</span>
                                    </div>
                                </div>
                                <div>
                                    <Avatar className="w-40 h-40">
                                        <AvatarImage src={student.avatar_url} alt={student.student_name} />
                                        <AvatarFallback>{student.student_name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {course && (
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl mb-4">Course Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <BookOpen size={20} className=" flex-shrink-0" />
                                    <div className='flex gap-2'>
                                        <span className="font-semibold">Course Name:</span>
                                        <p className="text-gray-700">{course.course_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FileText size={20} className=" flex-shrink-0" />
                                    <div className='flex gap-2'>
                                        <span className="font-semibold">Content:</span>
                                        <p className="text-gray-700">{course.course_content}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <Clock size={20} className=" flex-shrink-0" />
                                    </div>
                                    <div className='flex gap-2'>
                                        <span className="font-semibold">Duration:</span>
                                        <p className="text-gray-700">{course.course_duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <FileText size={20} className=" flex-shrink-0 mt-1" />
                                    <div className='flex gap-2'>
                                        <span className="font-semibold">Description:</span>
                                        <p className="text-gray-700">{course.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

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
                                        <SelectItem key={month.value} value={month.value.toString()}>
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
                                        <TableHead>Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Remarks</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {monthDates.map((date) => {
                                        const attendanceRecord = attendance.find(record => record.date === date);
                                        return (
                                            <TableRow key={date}>
                                                <TableCell>{date}</TableCell>
                                                <TableCell>{attendanceRecord ? attendanceRecord.status : 'No class in this day / Attendance was not Captured'}</TableCell>
                                                <TableCell>{attendanceRecord ? attendanceRecord.remarks : ''}</TableCell>
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
