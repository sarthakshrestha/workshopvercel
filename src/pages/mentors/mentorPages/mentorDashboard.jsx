import React, {useState, useEffect} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { School, BookOpen, Users, Calendar } from "lucide-react";
import profileicon from ".././../../gallery/profile/Profile.jpg";
import TeacherSidebar from "../mentorSidebar";
import DailyReflection from "./dailyReflection";
import Profile from "../../../gallery/Mentor.jpg";
import apiClient from "config/apiClient";

const MentorDashboard = () => {
  // Dummy data for the cards
  const [cardData, setCardData] = useState([
    {
      title: "Schools",
      value: 0,
      icon: School,
      description: "Schools currently teaching",
    },
    {
      title: "Classes",
      value: 0,
      icon: BookOpen,
      description: "Classes currently teaching",
    },
    {
      title: "Students",
      value: 0,
      icon: Users,
      description: "Students currently teaching",
    },
  ]);

  const mentorId = localStorage.getItem("teacher_id");

  useEffect(() => {
    // Fetch the data from an API
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/teacher/classes/${mentorId}`); // Replace with your API endpoint
        const schoolData = await response.data.data;

        setCardData([
          { ...cardData[0], value: schoolData.schoolCount },
          { ...cardData[1], value: schoolData.classCount },
          { ...cardData[2], value: schoolData.studentCount },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchData();
  }, []);


  // Dummy data for events
  const events = [
    {
      name: "Parent-Teacher Meeting",
      description: "Annual meeting with parents",
      date: "2023-06-15",
    },
    {
      name: "Science Fair",
      description: "Students showcase their projects",
      date: "2023-07-10",
    },
    {
      name: "Staff Development Day",
      description: "Professional development workshop",
      date: "2023-08-05",
    },
  ];

  return (
    <div className="flex">
      <TeacherSidebar />
      <div className="p-6 bg-gray-100 min-h-screen w-full ml-56">
        <h1 className="text-3xl font-bold mb-6">
          Hello, look through your Dashboard
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="flex flex-col items-center">
            <img
              src={Profile}
              alt="Profile Icon"
              className="w-36 h-36 rounded-full mb-2"
            />
          </div>
          {cardData.map((card, index) => (
            <Card key={index} className="border border-gray-200 mr-5">
              <div className="flex items-center p-5">
                <div className="flex-shrink-0 mr-4">
                  <card.icon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-grow text-center pb-4">
                  <div className="text-2xl font-bold mt-3">{card.value}</div>
                  <div className="text-sm text-gray-600">
                    {card.description}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Daily Reflection and Events */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Daily Reflection */}
          <div className="lg:w-1/2">
            <DailyReflection />
          </div>

          {/* Events */}
          <Card className="border border-gray-200 lg:w-1/2 py-4">
            <CardHeader>
              <CardTitle className="flex items-center text-3xl">
                Upcoming Events for this week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-10 mt-8">
                {events.map((event, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-[#658DCE]  flex items-center justify-center text-white font-semibold text-2xl">
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

export default MentorDashboard;
