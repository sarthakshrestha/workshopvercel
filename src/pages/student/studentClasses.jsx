import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, Clock, Info } from "lucide-react"; // Importing the Info icon
import StudentSidebar from "./studentSidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const ClassesDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const classes = [
    {
      id: 1,
      name: "HTML/CSS",
      time: "Mon, Wed, Fri 10:00 AM",
      description: "Basics of HTML and CSS for web development.",
      room: "Room 101",
      mentor: "John Doe",
    },
    {
      id: 2,
      name: "Cybersecurity",
      time: "Tue, Thu 2:00 PM",
      description: "Introduction to network security and data protection.",
      room: "Room 202",
      mentor: "Jane Smith",
    },
    {
      id: 3,
      name: "Scratch",
      time: "Mon, Wed 3:00 PM",
      description: "Learn coding with Scratch, a visual programming language.",
      room: "Lab 303",
      mentor: "Alice Johnson",
    },
  ];

  const filteredClasses = classes.filter((classItem) =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 font-sans">
          Classes Dashboard
        </h1>
        <div className="mb-6 flex">
          <Input
            placeholder="Search classes..."
            className="max-w-sm mr-2 border-gray-300 focus:border-gray-500 focus:ring-gray-500 rounded-md font-sans"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="bg-emerald-800 hover:bg-gray-800 text-white rounded-md font-sans">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredClasses.map((classItem) => (
            <Card
              key={classItem.id}
              className="transition-shadow duration-300 border border-gray-200 rounded-3xl bg-white"
            >
              <CardHeader className="bg-emerald-600 text-white p-4 rounded-lg font-sans">
                <CardTitle className="text-lg font-sans">
                  {classItem.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 p-4 bg-white rounded-b-lg font-sans">
                <p className="flex items-center text-gray-800 mb-2 text-sm font-sans">
                  <Clock className="mr-2 h-3 w-3 text-gray-600" />
                  {classItem.time}
                </p>
                <p className="flex items-center text-gray-700 mb-2 text-sm font-sans">
                  <Info className="mr-2 h-3 w-3 text-gray-600" />
                  {classItem.description}
                </p>
                <p className="flex items-center text-gray-800 mb-2 text-sm font-sans">
                  <Calendar className="mr-2 h-3 w-3 text-gray-600" />
                  {classItem.room}
                </p>
                <Badge
                  variant="outline"
                  className="text-xs mb-4 block text-gray-700 border-gray-300 rounded font-sans"
                >
                  Mentor: {classItem.mentor}
                </Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-[55%] bg-emerald-700 hover:bg-black text-white text-sm rounded-xl mx-auto flex font-sans">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-white text-gray-900 border-gray-200 rounded-xl font-sans">
                    <DialogHeader className="rounded-xl">
                      <DialogTitle className="text-2xl font-bold text-gray-900 font-sans">
                        {classItem.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 rounded-xl font-sans">
                      <p className="text-gray-700">{classItem.description}</p>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="col-span-3 text-gray-800">
                          {classItem.mentor}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="col-span-3 text-gray-800">
                          {classItem.time}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="col-span-3 text-gray-800">
                          {classItem.room}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-semibold text-gray-600">
                          Mentor:
                        </span>
                        <span className="col-span-3 text-gray-800">
                          {classItem.mentor}
                        </span>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ClassesDashboard;
