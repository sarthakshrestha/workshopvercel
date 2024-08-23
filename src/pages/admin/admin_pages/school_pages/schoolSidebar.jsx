import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, User, BookOpen, Calendar, ArrowLeft, GraduationCap } from 'lucide-react';
import logo from 'gallery/images/logo.png';
import { useNavigate } from 'react-router-dom';

const SchoolSidebar = () => {

    const navigate = useNavigate();

    const schools = () => {navigate('../admin/schools')}

    const schoolOverview = () => { navigate('/admin/schools/overview') };
    const classes = () => { navigate('/admin/schools/classes'); };
    const courses = () => { navigate('/admin/schools/courses'); };
    const academicCalendar = () => { navigate('/admin/schools/calendar'); };
    const profile = () => { navigate('/admin/schools/profile'); };
    return (
        <aside className="w-56 h-screen bg-homeText text-white shadow-lg font-archivo">
            <div className="p-4 flex items-center justify-center flex-col">
                <div className="mb-6">
                    <img src={logo} alt="Digital Horizon" className="h-full w-full rounded-lg cursor-pointer" />
                </div>

                <nav className="flex-grow overflow-y-auto w-full">
                    <Button
                        variant="ghost"
                        className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
                        onClick={(e) => (schools())}
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Return to Dashboard
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
                        onClick={(e) => (schoolOverview())}
                    >
                        <Home className="mr-2 h-5 w-5" />
                        Overview
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
                        onClick={(e) => (classes())}
                    >
                        <BookOpen className="mr-2 h-5 w-5" />
                        Classes
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
                        onClick={(e) => (courses())}
                    >
                        <GraduationCap className="mr-2 h-5 w-5" />
                        Courses
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
                        onClick={(e) => (academicCalendar())}                    
                    >
                        <Calendar className="mr-2 h-5 w-5" />
                        Academic Calendar
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start mb-2 text-sm hover:bg-homeText-hover hover:text-white transition-all duration-300 ease-in-out"
                        onClick={(e) => (profile())}                    
                    >
                        <User className="mr-2 h-5 w-5" />
                        Profile
                    </Button>
                </nav>
            </div>
        </aside>
    );
};

export default SchoolSidebar;
