import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import axios from 'axios';
import AdminSidebar from '../adminSidebar';
import { Camera, Calendar, School, Image, Film, Trash2 } from 'lucide-react';
import art1 from '../../../gallery/images/art1.jpg';
import art2 from '../../../gallery/images/art2.jpg';
import art3 from '../../../gallery/images/art3.jpg';
import art4 from '../../../gallery/images/art4.jpg';
import farewell from '../../../gallery/images/graduation.jpg';
import science1 from '../../../gallery/images/science1.jpg';
import science2 from '../../../gallery/images/science2.jpg';
import video from '../../../gallery/images/215475.mp4';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        school_name: '',
        description: '',
        organized_date: '',
        photos: [],
        videos: []
    });
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [deleteEventId, setDeleteEventId] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

    const handlePhotoUpload = (e) => {
        setSelectedPhotos([...selectedPhotos, ...e.target.files]);
    };

    const handleVideoUpload = (e) => {
        setSelectedVideos([...selectedVideos, ...e.target.files]);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('school_name', newEvent.school_name);
        formData.append('description', newEvent.description);
        formData.append('organized_date', newEvent.organized_date);

        selectedPhotos.forEach((photo, index) => formData.append(`photos[${index}]`, photo));
        selectedVideos.forEach((video, index) => formData.append(`videos[${index}]`, video));

        axios.post('http://localhost:8080/event', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            setNewEvent({
                school_name: '',
                description: '',
                organized_date: '',
                photos: [],
                videos: []
            });
            setSelectedPhotos([]);
            setSelectedVideos([]);
        }).catch(error => console.error('Error adding event:', error));
    };

    const handleDeleteEvent = (eventId) => {
        axios.delete(`http://localhost:8000/event/${eventId}`)
            .then(() => {
                setEvents(events.filter(event => event.id !== eventId)); // Remove deleted event from state
                setShowDeleteDialog(false); // Close the dialog
            })
            .catch(error => console.error('Error deleting event:', error));
    };

    return (
        <div className='flex'>
            <AdminSidebar />
            <div className="ml-[220px] flex w-full bg-white min-h-screen justify-center">
                <div className=" p-8 justify-center">
                    <div className='flex justify-between items-center'>
                        <h3 className='text-3xl font-bold mt-[-15px] mb-[20px] flex items-center'>
                            Events
                        </h3>
                        {/* Add Event Button */}
                        <div className='mt-[-30px]'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="bg-homeText hover:bg-homeText-hover">Add Event</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>Add New Event</DialogHeader>
                                    <div className="flex flex-col space-y-4">
                                        <Input
                                            placeholder="School Name"
                                            value={newEvent.school_name}
                                            onChange={(e) => setNewEvent({ ...newEvent, school_name: e.target.value })}
                                        />
                                        <Textarea
                                            placeholder="Description"
                                            value={newEvent.description}
                                            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                        />
                                        <Input
                                            type="date"
                                            value={newEvent.organized_date}
                                            onChange={(e) => setNewEvent({ ...newEvent, organized_date: e.target.value })}
                                        />
                                        <Input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                        />
                                        <Input
                                            type="file"
                                            multiple
                                            accept="video/*"
                                            onChange={handleVideoUpload}
                                        />
                                        <p>{selectedPhotos.length} photos selected</p>
                                        <p>{selectedVideos.length} videos selected</p>
                                    </div>
                                    <DialogFooter>
                                        <Button className="bg-homeText hover:bg-homeText-hover" onClick={handleSubmit}>Submit</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>



                    </div>
                    {events.map(event => (
                        <Card key={event.id} className="mb-8 rounded-lg shadow-lg bg-gray-100">
                            <CardHeader>
                                <div className='flex justify-between'>
                                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                    <School className="mr-2" /> {event.school_name}
                                </h2>
                                <Button variant="ghost" onClick={() => {
                                    setDeleteEventId(event.id);
                                    setShowDeleteDialog(true);
                                }}>
                                    <Trash2 className="text-red-500" />
                                </Button>
                                </div>
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

               

                {/* Delete Confirmation Dialog */}
                {showDeleteDialog && (
                    <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <DialogContent>
                            <DialogHeader>Delete Event</DialogHeader>
                            <p>Are you sure you want to delete this event?</p>
                            <DialogFooter>
                                <Button className="bg-homeText hover:bg-homeText-hover" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
                                <Button variant="destructive" onClick={() => handleDeleteEvent(deleteEventId)}>Delete</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
};

export default EventPage;