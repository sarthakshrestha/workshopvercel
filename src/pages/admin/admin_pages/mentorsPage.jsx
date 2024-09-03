import React, { useEffect, useState } from "react";
import AdminSidebar from "../adminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash, Plus, X, Check } from "lucide-react";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import apiClient from "config/apiClient";

const MentorsPage = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [newMentor, setNewMentor] = useState({
    name: "",
    address: "",
    username: "",
    password: "",
    phone_num: "",
    profile_picture: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [mentorToDelete, setMentorToDelete] = useState(null);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await apiClient.get("/teacher");
      setMentors(response.data.data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/teacher/${id}`);
      fetchMentors();
    } catch (error) {
      console.error("Error deleting mentor:", error);
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    const requiredFields = ["name", "username", "password", "phone_num", "address"];
    for (const field of requiredFields) {
      if (!newMentor[field].trim()) {
        formIsValid = false;
        errors[field] = `${field.replace("_", " ")} is required`;
      }
    }

    return formIsValid;
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setNewMentor((prev) => ({ ...prev, profile_picture: files[0] }));
    } else {
      setNewMentor((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCreate = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
        Object.keys(newMentor).forEach(key => {
          if (key === 'profile_picture') {
            if (newMentor[key]) {
              formData.append(key, newMentor[key]);
            }
          } else {
            formData.append(key, newMentor[key]);
          }
        });
        await apiClient.post("/teacher", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        fetchMentors();
        setNewMentor({
          name: "",
          address: "",
          username: "",
          password: "",
          phone_num: "",
          profile_picture: null,
        });
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error creating mentor:", error);
      }
    }
  };

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleOpenDeleteDialog = (id) => {
    setMentorToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  const handleCloseDeleteDialog = () => setIsDeleteDialogOpen(false);

  const confirmDelete = async () => {
    await handleDelete(mentorToDelete);
    handleCloseDeleteDialog();
  };

  return (
    <div>
      <AdminSidebar />
      <div className="ml-[220px]">
        <h1 className="text-4xl pt-[40px] font-bold mb-4 text-center mr-[5%]">
          Mentors
        </h1>
        <Button
          onClick={handleOpenDialog}
          className="mb-4 float-right mr-[4%] bg-[#34496C] hover:bg-[#223960] "
        >
          <Plus /> Add Mentor
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Mentor</DialogTitle>
            </DialogHeader>
            <div className="p-4 space-y-4">
              <Input
                name="name"
                placeholder="Name"
                value={newMentor.name}
                onChange={handleInputChange}
              />
              <Input
                name="address"
                placeholder="Address"
                value={newMentor.address}
                onChange={handleInputChange}
              />
              <Input
                name="username"
                placeholder="Email"
                value={newMentor.username}
                onChange={handleInputChange}
              />
              <Input
                name="password"
                placeholder="Password"
                type="password"
                value={newMentor.password}
                onChange={handleInputChange}
              />
              <Input
                name="phone_num"
                placeholder="Phone Number"
                value={newMentor.phone_num}
                onChange={handleInputChange}
              />
              <Input
                name="profile_picture"
                type="file"
                onChange={handleInputChange}
              />
            </div>
            <DialogFooter>
              <Button
                className="bg-homeText hover:bg-homeText-hover"
                onClick={handleCreate}
              >
                <Check /> Save
              </Button>
              <Button
                className="bg-homeText hover:bg-homeText-hover"
                onClick={handleCloseDialog}
              >
                <X /> Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to delete this mentor?
            </DialogDescription>
            <DialogFooter>
              <Button
                className="bg-green-800 hover:bg-green-700"
                onClick={confirmDelete}
              >
                <Check /> Yes
              </Button>
              <Button
                className="bg-red-800 hover:bg-red-700"
                onClick={handleCloseDeleteDialog}
              >
                <X /> No
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="pr-4 pl-4">
          {mentors.length > 0 ? (
            <Table className="min-w-full ">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="text-center font-bold ">Name</TableHead>
                  <TableHead className="text-center font-bold">
                    Address
                  </TableHead>
                  <TableHead className="text-center font-bold">
                    Email
                  </TableHead>
                  <TableHead className="text-center font-bold">
                    Phone Number
                  </TableHead>
                  <TableHead className="text-center font-bold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentors.map((mentor) => (
                  <TableRow key={mentor.id} className="text-[#2d2c2c]">
                    <TableCell className="text-center font-semibold ">
                      {mentor.name}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {mentor.address}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {mentor.username}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {mentor.phone_num}
                    </TableCell>
                    <TableCell className="text-center font-semibold space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => 
                          navigate("/admin/mentor_profile/" + mentor.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleOpenDeleteDialog(mentor.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No mentors found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;
