import React, {useState, useEffect} from 'react'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useForm } from "react-hook-form";
import apiClient from 'config/apiClient';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const EventsCard = ({month, day, eventsData, monthInt, year, onEventUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const schoolID = "641e36f0bc4d6b3b8e8eaf5e";

  // Set up the form using react-hook-form
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    // console.log(data)
    const id = eventsData.id
    // console.log(id)
    //  console.log(data)

    try {
      const response = await apiClient.put(
        `/calendar/${year}/${schoolID}/${monthInt}/${day}/${id}`, data)
      // console.log(response)
       const updatedEvent = { ...eventsData, ...data };

       // Call the callback function to update the state in MonthlyEvent
       onEventUpdate(day, updatedEvent);
    } catch (error) {
      console.log(error)
    }
    
    reset();
    setIsOpen(false); // Close dialog
  };

  // console.log(day)
  // console.log(eventsData)

  const onClick = ()=>{
    // console.log(id)
    setIsOpen(true)
  }

    


  return (
    <div
      className="flex mb-2 gap-1 items-center bg-white rounded-lg cursor-pointer"
      onClick={() => onClick()}
    >
      <section className="p-2 h-full bg-black text-white font-medium rounded-lg">
       
        <span>{month}</span>
        <br />
        <span>{day}</span>
      </section>
      <div>
        <section className="text-lg font-medium">
          {eventsData.event_name}
        </section>
        <section className="text-sm font-normal">
          {eventsData.event_description}
        </section>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Event</DialogTitle>
            <DialogDescription>
              Make changes to Event. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
             
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event_name" className="text-right">
                  Event Name
                </Label>
                <Input
                  id="event_name"
                  defaultValue={eventsData.event_name}
                  {...register("event_name")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event_description" className="text-right">
                  Description
                </Label>
                <Input
                  id="event_description"
                  defaultValue={eventsData.event_description}
                  {...register("event_description")}
                  className="col-span-3"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EventsCard
