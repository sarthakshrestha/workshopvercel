import React, { useEffect, useState } from 'react';
import AdminSidebar from '../adminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Trash, Plus, X, Check } from 'lucide-react';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table'; 

const MentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [newMentor, setNewMentor] = useState({
    name: '',
    address: '',
    username: '',
    password: '',
    phone_num: '',
    profile_pic: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [mentorToDelete, setMentorToDelete] = useState(null);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const response = await axios.get('http://localhost:8000/teacher');
      setMentors(response.data.data);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/teacher/${id}`);
      fetchMentors();
    } catch (error) {
      console.error('Error deleting mentor:', error);
    }
  };

  const handleCreate = async () => {
    const formData = new FormData();
    Object.entries(newMentor).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post('http://localhost:8000/teacher', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchMentors();
      setNewMentor({ name: '', address: '', username: '', password: '', phone_num: '', profile_pic: null });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating mentor:', error);
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
      <div className='ml-[220px]'>
        <h1 className='text-4xl pt-[40px] font-bold mb-4 text-center mr-[5%]'>Mentors</h1>
        <Button onClick={handleOpenDialog} className="mb-4 float-right mr-[4%] bg-homeText hover:bg-homeText-hover"><Plus /> Add Mentor</Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Mentor</DialogTitle>
            </DialogHeader>
            <div className="p-4 space-y-4">
              <Input placeholder="Name" value={newMentor.name} onChange={(e) => setNewMentor({ ...newMentor, name: e.target.value })} />
              <Input placeholder="Address" value={newMentor.address} onChange={(e) => setNewMentor({ ...newMentor, address: e.target.value })} />
              <Input placeholder="Username" value={newMentor.username} onChange={(e) => setNewMentor({ ...newMentor, username: e.target.value })} />
              <Input placeholder="Password" type="password" value={newMentor.password} onChange={(e) => setNewMentor({ ...newMentor, password: e.target.value })} />
              <Input placeholder="Phone Number" value={newMentor.phone_num} onChange={(e) => setNewMentor({ ...newMentor, phone_num: e.target.value })} />
              <Input type="file" onChange={(e) => setNewMentor({ ...newMentor, profile_pic: e.target.files[0] })} />
            </div>
            <DialogFooter>
              <Button className="bg-homeText hover:bg-homeText-hover" onClick={handleCreate}><Check /> Save</Button>
              <Button className="bg-homeText hover:bg-homeText-hover" onClick={handleCloseDialog}><X /> Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <DialogDescription>Are you sure you want to delete this mentor?</DialogDescription>
            <DialogFooter>
              <Button className="bg-green-800 hover:bg-green-700" onClick={confirmDelete}><Check /> Yes</Button>
              <Button className="bg-red-800 hover:bg-red-700" onClick={handleCloseDeleteDialog}><X /> No</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className='pr-4 pl-4'>
          {mentors.length > 0 ? (
            <Table className="min-w-full ">
              <TableHeader className='bg-gray-100'>
                <TableRow>
                  <TableHead className='text-center font-bold '>Name</TableHead>
                  <TableHead className='text-center font-bold'>Address</TableHead>
                  <TableHead className='text-center font-bold'>Username</TableHead>
                  <TableHead className='text-center font-bold'>Phone Number</TableHead>
                  <TableHead className='text-center font-bold'>Profile Pic</TableHead>
                  <TableHead className='text-center font-bold'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentors.map(mentor => (
                  <TableRow key={mentor.id} className='text-[#2d2c2c]'>
                    <TableCell className='text-center font-semibold '  >{mentor.name}</TableCell>
                    <TableCell className='text-center font-semibold'>{mentor.address}</TableCell>
                    <TableCell className='text-center font-semibold'>{mentor.username}</TableCell>
                    <TableCell className='text-center font-semibold'>{mentor.phone_num}</TableCell>
                    <TableCell className='text-center font-semibold'>
                      {mentor.profile_pic ? (
                        <img src={mentor.profile_pic} alt="Profile" className="w-10 h-10 rounded-full" />
                      ) : (
                        'No Image'
                      )}
                    </TableCell>
                    <TableCell className='text-center font-semibold'>
                      <Button className="bg-red-800 hover:bg-red-700" onClick={() => { handleOpenDeleteDialog(mentor.id); }}><Trash /> Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : <p>No mentors found</p>}
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;