import React, { useState, useEffect, useMemo } from 'react';
import AdminSidebar from '../adminSidebar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import apiClient from 'config/apiClient';
import FileDisplay from '@/components/ui/fileDisplay';
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"


const initialSchoolState = {
  school_name: '',
  email: '',
  password: '',
  address: '',
  banner: null,
  logo: null,
  course_id: []
};


const SchoolsPage = () => {
    const { toast } = useToast();
    const [schoolData, setSchoolData] = useState([]);
    const [newSchool, setNewSchool] = useState(initialSchoolState);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    useEffect(() => {
        fetchSchools();
    }, []);

    const fetchSchools = async () => {
        try {
        const response = await apiClient.get('/school');
        console.log(response);
        setSchoolData(response.data.data);
        } catch (error) {
        console.error('Error fetching schools:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSchool(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        console.log(files);
        setNewSchool(prev => ({ ...prev, [name]: files[0] }));
    };

    const validateSchoolData = (schoolData) => {
        const requiredFields = ['school_name', 'email', 'password', 'address'];
        for (let field of requiredFields) {
        if (!schoolData[field]) {
            return `${field.replace('_', ' ')} is required`;
        }
        }
        return null; // No errors
    };
    

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        try {
        const response = await apiClient.post('/file/upload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response);
        if (response.data.status === "success") {
            return response.data.message.file_id;
        } else {
            console.error('Failed to upload file:', response.data.message.message);
            return null;
        }
        } catch (error) {
        console.error('Error uploading file:', error);
        return null;
        }
    };

    const uploadBannerAndLogo = async () => {
        let bannerId = null;
        let logoId = null;

        if (newSchool.banner) {
        bannerId = await uploadFile(newSchool.banner);
        }
        if (newSchool.logo) {
        logoId = await uploadFile(newSchool.logo);
        }

        return { bannerId, logoId };
    };

    const addSchool = async () => {
        const validationError = validateSchoolData(newSchool);
        if (validationError) {
        toast({
            title: "Validation Error",
            description: validationError,
            variant: "destructive",
        });
        return;
        }
    
        const { bannerId, logoId } = await uploadBannerAndLogo();
    
        const schoolData = {
        ...newSchool,
        banner: bannerId,
        logo: logoId,
        };
    
        try {
        const response = await apiClient.post('/school', schoolData);
        
        if (response.data.status === "success") {
            setSchoolData(prev => [...prev, response.data.data]);
            setNewSchool(initialSchoolState);
            setIsAddDialogOpen(false);
            fetchSchools(); // Refresh the school list
            toast({
            title: "Success",
            description: "School added successfully",
            });
        } else {
            console.error('Failed to add school:', response.data.message);
            toast({
            title: "Error",
            description: "Failed to add school. Please try again.",
            variant: "destructive",
            });
        }
        } catch (error) {
        console.error('Error adding school:', error);
        toast({
            title: "Error",
            description: "An error occurred while adding the school. Please try again.",
            variant: "destructive",
        });
        }
    };
    

    

    return (
        <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
            <main className="p-6 ml-56">
            <h1 className="text-2xl font-bold mb-6">School Management</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                <Button className="mb-4" onClick={() => setIsAddDialogOpen(true)}>
                    Add School
                </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New School</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="school_name" className="text-right">
                        School Name
                    </Label>
                    <Input
                        id="school_name"
                        name="school_name"
                        value={newSchool.school_name}
                        onChange={handleInputChange}
                        className="col-span-3"
                    />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={newSchool.email}
                        onChange={handleInputChange}
                        className="col-span-3"
                    />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                        Password
                    </Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={newSchool.password}
                        onChange={handleInputChange}
                        className="col-span-3"
                    />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                        Address
                    </Label>
                    <Input
                        id="address"
                        name="address"
                        value={newSchool.address}
                        onChange={handleInputChange}
                        className="col-span-3"
                    />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="banner" className="text-right">
                        Banner
                    </Label>
                    <Input
                        id="banner"
                        name="banner"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="col-span-3"
                    />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="logo" className="text-right">
                        Logo
                    </Label>
                    <Input
                        id="logo"
                        name="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="col-span-3"
                    />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={addSchool}>Save School</Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>

            
            {/* Display schools */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">School List</h2>
                {schoolData.map((school, index) => (
                <div key={index} className="bg-white shadow rounded-lg p-4 mb-4">
                    <h3 className="font-bold">{school.school_name}</h3>
                    <p>{school.email}</p>
                    <p>{school.address}</p>
                    <div className="mt-2">
                    <h4 className="font-semibold">Banner:</h4>
                    <FileDisplay 
                        fileId={school.banner} 
                        altText={`${school.school_name} banner`}
                    />
                    </div>
                    <div className="mt-2">
                    <h4 className="font-semibold">Logo:</h4>
                    <FileDisplay 
                        fileId={school.logo} 
                        altText={`${school.school_name} logo`}
                    />
                    </div>
                </div>
                ))}
            </div>
            </main>
        </div>
        <Toaster duration={1000}/>
        </div>
    );
};

export default SchoolsPage;