import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import axios from 'axios';
import AdminSidebar from '../adminSidebar';
import { Camera, Calendar, School, Image, Film } from 'lucide-react';  
import art1 from '../../../gallery/images/art1.jpg';
import art2 from '../../../gallery/images/art2.jpg';
import art3 from '../../../gallery/images/art3.jpg';
import art4 from '../../../gallery/images/art4.jpg';
import farewell from '../../../gallery/images/graduation.jpg';
import science1 from '../../../gallery/images/science1.jpg';
import science2 from '../../../gallery/images/science2.jpg';
import video from '../../../gallery/images/215475.mp4';

const EventPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/event')
            .then(response => setEvents(response.data.data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const getEventImages = (schoolName) => {
        switch (schoolName) {
            case 'Sunnyvale Elementary':
                return [art1, art2, art3, art4];
            case 'Greenwood High School':
                return [science1, science2];
            default:
                return [farewell];
        }
    };

    const allGalleryImages = [art1, art2, art3, art4, farewell, science1, science2, art1, art2, art3, art4, farewell, science1, science2];

    const allVideos = [video, video, video];  

    return (
        <div className='flex'>
            <AdminSidebar />
            <div className="ml-[220px] flex flex-row bg-white min-h-screen">
                <div className="flex-3 p-8">
                    <h3 className='text-3xl font-bold mt-[-15px] mb-[20px] flex items-center'>
                         Events
                    </h3>
                    {events.map(event => (
                        <Card key={event.id} className="mb-8 rounded-lg shadow-lg bg-gray-100">
                            <CardHeader>
                                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                    <School className="mr-2" /> {event.school_name}
                                </h2>
                                <p className="text-sm text-gray-600 flex items-center">
                                    <Calendar className="mr-2" /> {event.organized_date}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg text-gray-700 flex items-center">
                                    <Camera className="mr-2" /> {event.description}
                                </p>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {getEventImages(event.organized_date === "2023-08-15" ? "farewell" : event.school_name).map((image, index) => (
                                        <img key={index} src={image} alt={`Event Image ${index + 1}`} className="w-44 h-44 rounded-lg object-cover" />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex-1 p-4 border-l border-gray-200 fixed right-0 top-0 bottom-0 w-[41%]">
                    <h2 className="text-3xl font-bold mb-2 flex items-center">
                     Gallery
                    </h2>
                    <h3 className="text-lg font-semibold mb-2 mt-4 flex items-center">
                        <Image className="mr-2" /> Photos
                    </h3>
                    <div className="grid grid-cols-3 gap-4 h-[53%] overflow-y-scroll">
                        {allGalleryImages.map((image, index) => (
                            <img key={index} src={image} alt={`Gallery Image ${index + 1}`} className="w-full h-32 rounded-lg object-cover" />
                        ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-6 mb-2 flex items-center">
                        <Film className="mr-2" /> Videos
                    </h3>
                    <div className="flex gap-4 overflow-x-scroll">
                        {allVideos.map((video, index) => (
                            <video key={index} src={video} controls className="w-1/2 h-48 rounded-lg object-cover" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventPage;
