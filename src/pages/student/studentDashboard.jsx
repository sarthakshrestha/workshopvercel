import React from "react";
import StudentSidebar from "./studentSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Book, Calendar, MessageSquare } from "lucide-react";

const staticData = {
  courses: [
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Physics" },
    { id: 3, name: "Computer Science" },
  ],
  upcomingClasses: [
    { name: "Advanced Calculus", date: "2024-08-25", time: "10:00 AM" },
    { name: "Quantum Mechanics", date: "2024-08-26", time: "2:00 PM" },
    { name: "Data Structures", date: "2024-08-27", time: "11:30 AM" },
  ],
  upcomingEvents: [
    { name: "Science Fair", date: "2024-09-15" },
    { name: "Guest Lecture: AI in Healthcare", date: "2024-09-20" },
    { name: "Career Workshop", date: "2024-09-25" },
  ],
  upcomingQuizzes: [
    { name: "Math Quiz: Differential Equations", date: "2024-09-01" },
    { name: "Physics Quiz: Thermodynamics", date: "2024-09-05" },
    { name: "CS Quiz: Algorithms", date: "2024-09-10" },
  ],
  postsInDiscussionBoard: [
    {
      id: 1,
      title: "Question about Vector Calculus",
      author: "Alice",
      replies: 5,
    },
    { id: 2, title: "Programming Project Ideas", author: "Bob", replies: 8 },
    {
      id: 3,
      title: "Study Group for Quantum Physics",
      author: "Charlie",
      replies: 3,
    },
  ],
};

const StudentDashboard = () => {
  const totalEnrolledCourses = staticData.courses.length;
  const upcomingClasses = staticData.upcomingClasses;
  const upcomingEvents = staticData.upcomingEvents;
  const upcomingQuizzes = staticData.upcomingQuizzes;

  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Student Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  Enrolled Courses
                </CardTitle>
                <Book className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEnrolledCourses}</div>
                <div className="text-sm text-gray-600">
                  Total Courses Enrolled
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  Upcoming Events
                </CardTitle>
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {upcomingEvents.length}
                </div>
                <div className="text-sm text-gray-600">Events Coming Up</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  Upcoming Quizzes
                </CardTitle>
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {upcomingQuizzes.length}
                </div>
                <div className="text-sm text-gray-600">Quizzes Scheduled</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-6 w-6" />
                  Upcoming Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-2 mb-2 last:border-b-0"
                    >
                      <div className="text-lg font-bold">{classItem.name}</div>
                      <div className="text-sm text-gray-600">
                        {classItem.date}
                      </div>
                      <div className="text-sm text-gray-600">
                        {classItem.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-6 w-6" />
                  Discussion Board
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staticData.postsInDiscussionBoard.map((post) => (
                    <div
                      key={post.id}
                      className="border-b border-gray-200 pb-2 mb-2 last:border-b-0"
                    >
                      <div className="text-lg font-bold">{post.title}</div>
                      <div className="text-sm text-gray-600">
                        By: {post.author}
                      </div>
                      <div className="text-sm text-gray-600">
                        {post.replies} replies
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
