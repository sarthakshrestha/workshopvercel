import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School, BookOpen, Users, Calendar } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import TeacherSidebar from '../teacherSidebar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TeachersDashboard = () => {
  // Dummy data for the cards
  const cardData = [
    { title: "Schools", value: 5, icon: School, description: "Total number of School Assigned" },
    { title: "Courses", value: 8, icon: BookOpen, description: "Total number of Courses to Teach"},
    { title: "Students", value: 150, icon: Users, description: "Total number of students to teach" },
  ];

  // Dummy data for the chart
  const chartData = {
    labels: ['School A', 'School B', 'School C', 'School D', 'School E'],
    datasets: [
      {
        label: 'Total Students',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Students in Different Schools',
      },
    },
  };

  // Dummy data for events
  const events = [
    { name: "Parent-Teacher Meeting", description: "Annual meeting with parents", date: "2023-06-15" },
    { name: "Science Fair", description: "Students showcase their projects", date: "2023-07-10" },
    { name: "Staff Development Day", description: "Professional development workshop", date: "2023-08-05" },
  ];

  return (
    <div className='flex'>
      <TeacherSidebar/>
      <div className="p-6 bg-gray-100 min-h-screen w-full">
        <h1 className="text-3xl font-bold mb-6">Teacher's Dashboard</h1>
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {cardData.map((card, index) => (
            <Card key={index} className="border border-gray-200 ">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium ">{card.title}</CardTitle>
                <card.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
                <div className="text-sm text-gray-600">{card.description}</div>
              </CardContent>
            </Card>


          ))}
        </div>

        {/* Chart and Events */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chart */}
          <Card className="border border-gray-200 lg:w-2/3">
            <CardHeader>
              <CardTitle>Students per School</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <Bar options={chartOptions} data={chartData} />
            </CardContent>
          </Card>

          {/* Events */}
          <Card className="border border-gray-200 lg:w-1/3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {events.map((event, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-semibold">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{event.name}</h3>
                      <p className="text-gray-600">{event.description}</p>
                      <p className="text-sm text-gray-500">{event.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeachersDashboard;
