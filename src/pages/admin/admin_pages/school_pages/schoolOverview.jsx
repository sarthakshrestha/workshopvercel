import React, { useEffect, useState } from 'react';
import { useSchoolContext } from 'context/SchoolContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Users, BookOpen, School } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import SchoolSidebar from './schoolSidebar';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SchoolDashboard = () => {
    const { schoolId } = useSchoolContext();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1;
            const response = await fetch(`http://127.0.0.1:8000/calendar/${currentYear}/${schoolId}/${currentMonth}`);
            const data = await response.json();
            if (data.status === "success") {
                const allEvents = data.data.schools[0].events.flatMap(monthEvents =>
                    monthEvents.days.flatMap(day =>
                        day.events.map(event => ({
                            ...event,
                            month: monthEvents.month,
                            day: day.day
                        }))
                    )
                );
                setEvents(allEvents);
            }
        };
        fetchEvents();
    }, [schoolId]);

    const studentPerCourseData = {
        labels: ['React', 'Node.js', 'Python', 'Java', 'JavaScript'],
        datasets: [
            {
                label: 'Students per Course',
                data: [65, 59, 80, 81, 56],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const popularCoursesData = {
        labels: ['React', 'Node.js', 'Python', 'Java', 'JavaScript'],
        datasets: [
            {
                label: 'Course Popularity',
                data: [300, 250, 400, 350, 280],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Course Statistics',
            },
        },
    };

    const getMonthAbbreviation = (monthNumber) => {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        let number = monthNumber - 1;
        return months[number]
    }

    return (
        <div className="flex h-screen bg-gray-100 ">
            <SchoolSidebar />
            <div className="flex-1 overflow-auto">
                <div className="p-8 bg-gray-50 min-h-screen">
                    <h1 className="text-4xl font-bold mb-8 text-gray-800 ">School Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Mentors</CardTitle>
                                <School className="h-6 w-6 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold ">10</div>
                                <div className="text-sm ">Mentors assigned to this school</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium ">Total Courses</CardTitle>
                                <BookOpen className="h-6 w-6 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">25</div>
                                <div className="text-sm">Courses assigned to this school</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                                <Users className="h-6 w-6 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1,234</div>
                                <div className="text-sm">Students Studying to this school</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>Students per Course</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Bar data={studentPerCourseData} options={options} />
                            </CardContent>
                        </Card>
                        <Card className="lg:row-span-2">
                            <CardHeader>
                                <CardTitle>Upcoming Events</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {events.map((event) => (
                                        <div key={event.id} className="flex">
                                            <div className="flex-shrink-0">
                                                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white text-xs flex-col">
                                                    <div className='font-bold' style={{letterSpacing: "1px"}}>{getMonthAbbreviation(event.month)}</div>
                                                    <div>{event.day}</div>
                                                </span>
                                            </div>
                                            <div className="ml-4 flex-1 space-y-2">
                                                <p className="text-sm font-medium leading-5">{event.event_name}</p>
                                                <p className="text-sm text-gray-500">{event.event_description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>Most Popular Courses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Bar data={popularCoursesData} options={options} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolDashboard;