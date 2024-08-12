import React, { useState, useEffect } from 'react';
import AdminSidebar from '../adminSidebar';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import apiClient from 'config/apiClient';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalSchools, setTotalSchools] = useState(0);
  const [schoolCourseData, setSchoolCourseData] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="label font-bold">{`${label}`}</p>
          {payload.map((pld) => (
            <p key={pld.name} style={{ color: pld.color }} className="font-bold">
              {`${pld.name}: ${pld.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={14} 
          dx={-7}
          textAnchor="middle" 
          // fill="#666"
          fontSize="16px"
          fontWeight="bold"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsResponse = await apiClient.get('/student');
        const schoolsResponse = await apiClient.get('/school');
        const schoolCourseDataResponse = await apiClient.get('/student_per_course');
        const popularCourseResponse = await apiClient.get('/popular_courses');


        if (studentsResponse.data.status === 'success' 
          && schoolsResponse.data.status === 'success'
          && schoolCourseDataResponse.data.status === 'success'
          
        ) {
          setTotalStudents(studentsResponse.data.data ? studentsResponse.data.data.length : 0);
          setTotalSchools(schoolsResponse.data.data ? schoolsResponse.data.data.length : 0);
          // setSchoolCourseData(schoolCourseDataResponse.data.data);

          // const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
          // const coloredPopularCourses = popularCourseResponse.data.data.map((course, index) => ({
          //             ...course,
          //             color: colors[index % colors.length]
          //           }));
          //           setPopularCourses(coloredPopularCourses);

                  } else {
                    console.error('Error fetching data');
                  }
          
        // Static data for school course registration

        setSchoolCourseData([
          { "schoolName": "School A", "Python": 50, "Java": 30, "HTML": 20, "React": 15, "Node": 10 },
          { "schoolName": "School B", "Python": 40, "Java": 35, "HTML": 25, "React": 20, "Node": 15 },
          { "schoolName": "School C", "Python": 60, "Java": 25, "HTML": 15, "React": 30, "Node": 20 },
          { "schoolName": "School D", "Python": 45, "Java": 40, "HTML": 30, "React": 25, "Node": 15 },
        ]);

        // Static data for popular courses
        setPopularCourses([
          { "courseName": 'Python', "students": 250, color: '#3B82F6' },
          { "courseName": 'Java', "students": 150, color: '#10B981' },
          { "courseName": 'HTML', "students": 125, color: '#F59E0B' },
          { "courseName": 'React', "students": 100, color: '#6366F1' },
          { "courseName": 'Node.js', "students": 75, color: '#14B8A6' },
        ]);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  // Dynamic color generation for line chart
  const generateColor = (index) => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#14B8A6'];
    return colors[index % colors.length];
  };

  // Get unique course names from schoolCourseData
  const courseNames = schoolCourseData.length > 0
    ? Object.keys(schoolCourseData[0]).filter(key => key !== 'schoolName')
    : [];

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6 ml-56">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              {...chartAnimation}
            >
              <h2 className="text-2xl font-semibold mb-3 text-gray-700">Total Students Enrolled</h2>
              <p className="text-5xl font-bold text-blue-600">{totalStudents}</p>
            </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                {...chartAnimation}
              >
                <h2 className="text-2xl font-semibold mb-3 text-gray-700">Total Partnered Schools</h2>
                <p className="text-5xl font-bold text-green-600">{totalSchools}</p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg"
              {...chartAnimation}
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">Students Registered per Course in Schools</h2>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={schoolCourseData}>
                  <XAxis 
              dataKey="schoolName" 
              tick={<CustomXAxisTick />}
              height={60}
              interval={0}
            />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {courseNames.map((course, index) => (
                      <Line
                        key={course}
                        type="monotone" 
                        dataKey={course} 
                        stroke={generateColor(index)} 
                        strokeWidth={2}
                        dot={{ r: 4 }} 
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg"
              {...chartAnimation}
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-700">Most Popular Courses</h2>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={popularCourses}
                      dataKey="students"
                      nameKey="courseName"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      innerRadius={60}
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {popularCourses.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 flex flex-wrap justify-center">
                {popularCourses.map((course, index) => (
                  <div key={index} className="flex items-center mr-4 mb-2">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: course.color }}></div>
                    <span className="text-sm">{course.courseName}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
