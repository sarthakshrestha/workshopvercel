import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "config/apiClient";
import { FaUserGraduate, FaBook, FaChalkboardTeacher } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const DisplayClassCard = ({ classes }) => {
  const navigate = useNavigate();
  const [classData, setClassData] = useState([]);
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalCourse, setTotalCourse] = useState(0);
  const [totalTeacher, setTotalTeacher] = useState(0);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await apiClient.get(`/class/${classes.id}`);
        if (response.data.status === "success") {
          setClassData(response.data.data);
          setTotalStudent(response.data.data.students?.length || 0);
          setTotalCourse(response.data.data.courses?.length || 0);
          setTotalTeacher(response.data.data.teachers?.length || 0);
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchClassData();
  }, [classes.id]);

  const handleNavigateToClass = () => {
    navigate(`/admin/schools/classes/${classes.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105">
      <h3 className="text-2xl font-bold mb-4 text-indigo-600">
        {classData.class_name}
      </h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center space-x-2 bg-blue-100 p-3 rounded-md">
          <FaUserGraduate className="text-blue-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-600">Students</p>
            <p className="text-lg font-semibold">{totalStudent}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-green-100 p-3 rounded-md">
          <FaBook className="text-green-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-600">Courses</p>
            <p className="text-lg font-semibold">{totalCourse}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-zinc-100 p-3 rounded-md">
          <FaChalkboardTeacher className="text-zinc-500 text-2xl" />
          <div>
            <p className="text-sm text-gray-600">Mentors</p>
            <p className="text-lg font-semibold">{totalTeacher}</p>
          </div>
        </div>
      </div>
      <Button
        onClick={handleNavigateToClass}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
      >
        View Class Details
      </Button>
    </div>
  );
};

export default DisplayClassCard;
