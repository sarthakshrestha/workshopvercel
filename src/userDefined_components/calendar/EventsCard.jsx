import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import apiClient from "config/apiClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Edit3 } from "lucide-react";

const EventsCard = ({
  month,
  day,
  eventsData,
  monthInt,
  year,
  onEventUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const schoolID = "641e36f0bc4d6b3b8e8eaf5e";

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const id = eventsData.id;

    try {
      const response = await apiClient.put(
        `/calendar/${year}/${schoolID}/${monthInt}/${day}/${id}`,
        data
      );

      const updatedEvent = { ...eventsData, ...data };
      onEventUpdate(day, updatedEvent);
    } catch (error) {
      console.log(error);
    }

    reset();
    setIsOpen(false);
  };

  const onClick = () => {
    setIsOpen(true);
  };

  const formatDate = (year, month, day) => {
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="flex mb-2 gap-4 items-center rounded-lg cursor-pointer bg-white"
      onClick={() => onClick()}
    >
      <div className="flex-1 rounded-lg p-2 px-4 hover:bg-gray-50 border border-gray-300 transition-all duration-300">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            <section className="text-lg font-semibold text-blue-800">
              {eventsData.event_name}
            </section>
          </div>
          <div className="flex items-center justify-center">
            <Clock className="h-4 w-4 text-gray-500 mr-2 mt-1.5" />
            <section className="text-xs text-gray-500 mt-2">
              {formatDate(year, monthInt, day)}
            </section>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <section className="text-sm font-semi-bold text-gray-700">
            {eventsData.event_description}
          </section>
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Edit3 className="h-5 w-5 text-gray-500 mr-2" /> {/* Edit icon */}
              Update Event
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Make changes to Event. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="event_name"
                  className="text-right text-gray-600"
                >
                  Event Name
                </Label>
                <Input
                  id="event_name"
                  defaultValue={eventsData.event_name}
                  {...register("event_name")}
                  className="col-span-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="event_description"
                  className="text-right text-gray-600"
                >
                  Description
                </Label>
                <Input
                  id="event_description"
                  defaultValue={eventsData.event_description}
                  {...register("event_description")}
                  className="col-span-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="event_date"
                  className="text-right text-gray-600"
                >
                  Date
                </Label>
                <Input
                  id="event_date"
                  type="date"
                  defaultValue={`${year}-${monthInt
                    .toString()
                    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`}
                  {...register("event_date")}
                  className="col-span-3 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="text-white">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsCard;
