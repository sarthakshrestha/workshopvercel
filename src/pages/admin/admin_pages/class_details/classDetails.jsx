import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import SchoolSidebar from "../school_pages/schoolSidebar";
import apiClient from "config/apiClient";
import LoadingSpinner from "userDefined_components/loading_spinner/loadingSpinner";
import StudentList from "./displayStudent";
import AddStudentButton from "./addStudentButton";
import AssignCoursesButton from "./assignCoursesButton";
import AssignTeacherButton from "./assignTeacherButton";
import { Users, GraduationCap, BookOpen } from "lucide-react";

const ClassDetails = () => {
  const { classId } = useParams();
  const { toast } = useToast();
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCourse, setTotalCourse] = useState(0);
  const [totalTeacher, setTotalTeacher] = useState(0);
  const [totalStudent, setTotalStudent] = useState(0);

  const fetchClassData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/class/${classId}`);
      // console.log(response);
      // if (!response.ok) throw new Error('Failed to fetch class data');
      setClassData(response.data.data);
      setTotalStudent(response.data.data.students?.length || 0);
      setTotalCourse(response.data.data.courses?.length || 0);
      setTotalTeacher(response.data.data.teachers?.length || 0);
    } catch (error) {
      console.error("Error fetching class data:", error);
      // Handle error (e.g., show error message to user)                              
    } finally {
      setIsLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    fetchClassData();
  }, [fetchClassData]);

  const handleAddStudent = async (newStudent) => {
    try {
      const courseId = classData.courses &&
        classData.courses.length > 0 ?
        classData.courses.map((course) => course.id) : [];
      const addStudent = {
        ...newStudent,
        school_id: classData.school_id,
        class_id: classId,
        course_id: courseId && courseId.length > 0
          ? courseId.join(",")
          : ""
      };
      console.log(classData.courses);
      console.log(addStudent);
      const response = await apiClient.post("/student", addStudent, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status === "success") {
        toast({
          title: "Success",
          description: "Student added successfully",
        });

        // Update the class data after adding the student
        const updatedClassData = {
          ...classData,
          courses: [
            ...(classData.courses && classData.courses.length > 0
              ? classData.courses.map((course) => course.id)
              : ""),
          ],
          teachers: [
            ...(classData.teachers && classData.teachers.length > 0
              ? classData.teachers.map((teacher) => teacher.id)
              : ""),
          ],
          students: [
            ...(classData.students && classData.students.length > 0
              ? classData.students.map((student) => student.id)
              : ""),
            response.data.message,
          ],
        };
        console.log(updatedClassData);

        setClassData(updatedClassData);
        setTotalStudent(updatedClassData.students?.length || 0);
        // Optionally, you can also send a PUT request to the class endpoint to update the class data on the server
        await apiClient.put(`/class/${classId}`, updatedClassData);
        fetchClassData(); // Re-fetch class data to update the student list
      } else {
        toast({
          title: "Error",
          description: "Failed to add student. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding student:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while adding the student. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteStudent = async (studentId) => {
    // Implement your deletion logic here
    try {
      const response = await apiClient.delete(`/student/${studentId}`);
      console.log(response);
      if (response.data.status === "success") {
        toast({
          title: "Success",
          description: "Student deleted successfully",
        });
        // Update the class data after deleting the student
        const updatedClassData = {
          ...classData,
          courses: [
            ...(classData.courses && classData.courses.length > 0
              ? classData.courses.map((course) => course.id)
              : ""),
          ],
          teachers: [
            ...(classData.teachers && classData.teachers.length > 0
              ? classData.teachers.map((teacher) => teacher.id)
              : ""),
          ],

          students: classData.students.filter(
            (student) => student.id !== studentId
          ),
        };
        console.log(updatedClassData);
        await apiClient.put(`/class/${classId}`, updatedClassData);
        setClassData(updatedClassData);
        setTotalStudent(updatedClassData.students?.length || 0);
      } else {
        toast({
          title: "Error",
          description: "Failed to delete student. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while deleting the student. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditStudent = () => {
    fetchClassData();
  };

  function assignSchoolInfo(schoolId, classIds, courseIds) {
    return {
      school_id: schoolId,
      classes: classIds,
      courses: courseIds,
    };
  }

  const getUpdatedCourseIds = (existingCourse) => {
    const existingCourseIds =
      existingCourse && existingCourse.length > 0 ? existingCourse : [];

    const newCourseIds =
      classData.courses && classData.courses.length > 0
        ? classData.courses.map((course) => course.id)
        : [];

    // Combine existing and new course IDs and remove duplicates using a Set
    const updatedCourseIds = [
      ...new Set([...existingCourseIds, ...newCourseIds]),
    ];

    // Return the updated course IDs
    return updatedCourseIds && updatedCourseIds.length > 0 ? updatedCourseIds : [];
  };

  // const updateStudentPromises = classData.students && classData.students.length > 0
  // ? classData.students.map(async (student) => {
  //     return apiClient.put(`/student/${student.id}`, 
  //       {course_id: selectedCourses})
  //     }): [];

  const handleTeacherAPI = async (teacher, schoolInfo) => {
    await apiClient.put(`/teacher/${teacher.id}`, {
      schools: schoolInfo,
    });
  };

  const handleAssignTeacher = async (
    newlySelectedTeacher,
    newlyRemovedTeacher
  ) => {
    try {
      if (classData.id) {
        const updatedTeacherIds = classData.teachers.filter(
          (teacher) => !newlyRemovedTeacher.includes(teacher.id)
        );

        // Add the newly selected teachers' IDs if they exist
        if (newlySelectedTeacher && newlySelectedTeacher.length > 0) {
          updatedTeacherIds.push(...newlySelectedTeacher); // Spread operator to add all newly selected IDs
        }
        const updatedClassData = {
          ...classData,
          courses: [
            ...(classData.courses && classData.courses.length > 0
              ? classData.courses.map((course) => course.id)
              : ""),
          ],
          teachers: updatedTeacherIds,
          students: [
            ...(classData.students && classData.students.length > 0
              ? classData.students.map((student) => student.id)
              : ""),
          ],
        };

        const classUpdateResponse = await apiClient.put(
          `/class/${classData.id}`,
          updatedClassData
        );
        // setClassData(updatedClassData)

        if (classUpdateResponse.data.status !== "success") {
          throw new Error("Failed to update class data");
        }

        await fetchClassData();

        const updateAddedTeacher = newlySelectedTeacher && newlySelectedTeacher.length > 0 ? newlySelectedTeacher.map(
          async (teacherId) => {
            const teacherResponse = await apiClient.get(
              `/teacher/${teacherId}`
            );
            const teacher = teacherResponse.data.data;
            let updatedCourse = [];
            let totalSchoolInfo = [];

            console.log("Teacher School Info:", teacher.schools); // Debug log

            if (
              teacher.schools &&
              Array.isArray(teacher.schools) &&
              teacher.schools.length > 0
            ) {
              console.log("Entering schoolInfo condition"); // Debug log
              totalSchoolInfo = [...teacher.schools];

              let schoolInfoUpdated = false;

              for (const school_info of totalSchoolInfo) {
                if (school_info.school_id === classData.school_id) {
                  console.log("Matching school found:", school_info); // Debug log
                  const new_class = [
                    ...(school_info.classes || []),
                    classData.id,
                  ];
                  updatedCourse = getUpdatedCourseIds(school_info.courses);
                  const perSchoolInfo = assignSchoolInfo(
                    school_info.school_id,
                    new_class,
                    updatedCourse
                  );

                  console.log(perSchoolInfo);

                  // Update the existing school info instead of filtering and pushing
                  Object.assign(school_info, perSchoolInfo);
                  schoolInfoUpdated = true;
                  break; // Exit the loop once we've updated the matching school
                }
              }

              // If no matching school was found, add a new school info
              if (!schoolInfoUpdated) {
                const newSchoolInfo = assignSchoolInfo(
                  classData.school_id,
                  [classData.id],
                  classData.courses && classData.courses.length > 0
                    ? classData.courses.map((course) => course.id)
                    : []
                );
                totalSchoolInfo.push(newSchoolInfo);
              }

              console.log("Updated totalSchoolInfo:", totalSchoolInfo); // Debug log
            } else {
              console.log("Entering else condition"); // Debug log
              totalSchoolInfo = [
                assignSchoolInfo(
                  classData.school_id,
                  [classData.id],
                  classData.courses && classData.courses.length > 0
                    ? classData.courses.map((course) => course.id)
                    : []
                ),
              ];
            }

            await handleTeacherAPI(teacher, totalSchoolInfo);
          }
        ) : [];

        const updateRemovedTeacher = newlyRemovedTeacher && newlyRemovedTeacher.length > 0 ? newlyRemovedTeacher.map(
          async (teacherId) => {
            const teacherResponse = await apiClient.get(
              `/teacher/${teacherId}`
            );
            const teacher = teacherResponse.data.data;
            let updatedCourse = [];
            let totalSchoolInfo = [];

            console.log("Teacher School Info:", teacher.schools); // Debug log

            if (
              teacher.schools &&
              Array.isArray(teacher.schools) &&
              teacher.schools.length > 0
            ) {
              console.log("Entering schools condition for removal"); // Debug log
              totalSchoolInfo = [...teacher.schools];

              totalSchoolInfo = totalSchoolInfo.filter((school_info) => {
                if (school_info.school_id === classData.school_id) {
                  console.log(
                    "Matching school found for removal:",
                    school_info
                  ); // Debug log

                  // Remove the class from the school's classes
                  school_info.classes = school_info.classes.filter(
                    (classId) => classId !== classData.id
                  );

                  // Update courses if necessary
                  updatedCourse = getUpdatedCourseIds(school_info.courses);

                  // If classes become empty, return false to remove this school
                  if (school_info.classes.length === 0) {
                    console.log("Removing school as it has no more classes"); // Debug log
                    return false;
                  }

                  // Update the school info
                  const perSchoolInfo = assignSchoolInfo(
                    school_info.school_id,
                    school_info.classes,
                    updatedCourse
                  );
                  console.log(perSchoolInfo);
                  Object.assign(school_info, perSchoolInfo);
                }
                return true; // Keep this school in the array
              });

              console.log(
                "Updated totalSchoolInfo after removal:",
                totalSchoolInfo
              ); // Debug log
            } else {
              console.log("No schools to remove from"); // Debug log
              totalSchoolInfo = []; // No schools to update
            }

            await handleTeacherAPI(teacher, totalSchoolInfo);
          }
        ) : [];

        await Promise.all(updateAddedTeacher);
        await Promise.all(updateRemovedTeacher);
        await fetchClassData();
      }
    } catch (error) {
      console.error("Error Assigning Teacher:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while assigning the teacher. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAssignCourse = async (selectedCourses) => {
    try {
      if (classData.id) {
        const updatedClassData = {
          ...classData,
          courses: selectedCourses,
          teachers: [
            ...(classData.teachers && classData.teachers.length > 0
              ? classData.teachers.map((teacher) => teacher.id)
              : ""),
          ],
          students: [
            ...(classData.students && classData.students.length > 0
              ? classData.students.map((student) => student.id)
              : ""),
          ],
        };
        const classUpdateResponse = await apiClient.put(
          `/class/${classData.id}`,
          updatedClassData
        );

        if (classUpdateResponse.data.status !== "success") {
          throw new Error("Failed to update class data");
        }


        // const courseId = selectedCourses && selectedCourses.length > 0
        // ? selectedCourses.join(",")
        // : "";
        // console.log(courseId);


        const updateStudentPromises = classData.students && classData.students.length > 0
          ? classData.students.map(async (student) => {
            return apiClient.put(`/student/${student.id}`,
              { course_id: selectedCourses })
          }) : [];


        // const updateTeacherPromises = classData.teachers.map(teacher =>
        //     apiClient.put(`/teacher/${teacher.id}`, {
        //         ...teacher,
        //         course_id: [...selectedCourses]
        //     })
        // )

        fetchClassData();
        await Promise.all(updateStudentPromises);
        // await Promise.all(updateTeacherPromises);

        await fetchClassData();

        toast({
          title: "Success",
          description: "Courses assigned successfully",
        });
      }
    } catch (error) {
      console.error("Error assigning courses:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while assigning courses. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SchoolSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          {isLoading ? (
            <LoadingSpinner />
          ) : classData ? (
            <>
              <h1 className="text-3xl font-bold mb-6">
                {classData.class_name}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between ">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Students
                    </h2>
                    <Users className="text-gray-600" size={28} />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalStudent}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between ">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Mentors
                    </h2>
                    <GraduationCap className="text-gray-600" size={28} />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalTeacher}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center justify-between ">
                    <h2 className="text-lg font-semibold text-gray-700">
                      Courses
                    </h2>
                    <BookOpen className="text-gray-600" size={28} />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {totalCourse}
                  </p>
                </div>
              </div>

              <div className="flex space-x-4 mb-8">
                <AssignTeacherButton
                  onAssignTeacher={handleAssignTeacher}
                  class_data={classData}
                />
                <AssignCoursesButton
                  onAssignCourse={handleAssignCourse}
                  class_data={classData}
                />
                <AddStudentButton onAddStudent={handleAddStudent} />
              </div>

              <StudentList
                students={classData.students}
                onEditStudent={handleEditStudent}
                onDeleteStudent={handleDeleteStudent}
              />
            </>
          ) : (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md text-center">
              <p className="font-bold">No Class Data Found</p>
              <p>
                There was an issue retrieving the class data. Please try again
                later.
              </p>
            </div>
          )}
        </main>
      </div>
      <Toaster duration="1000" />
    </div>
  );
};

export default ClassDetails;
