import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiClient from "config/apiClient";
import {Calendar} from 'lucide-react';

const TodayEvent = ({ date, school_id }) => {
  const selectedYear = date.getFullYear();
  const selectedMonth = date.getMonth() + 1;
  const selectedDay = date.getDate();

  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  const currentDate = new Date();
  const isFutureDate = date > currentDate;

  const onUpdate = async (data) => {
    const updateData = {
      event_name: data.event_name,
      event_description: data.event_description,
    };

    try {
      const res = await apiClient.put(
        `/calendar/${data.year}/${data.school_id}/${data.month}/${data.day}/${data.event_id}`,
        updateData
      );
      // console.log(res);
      setData((prevData) => {
        const updatedData = { ...prevData };
        const dayData = updatedData?.schools?.[0]?.events
          ?.find((eventMonth) => eventMonth.month === selectedMonth)
          ?.days?.find((eventDay) => eventDay.day === selectedDay);

        if (dayData) {
          const eventIndex = dayData.events.findIndex(
            (e) => e.id === data.event_id
          );
          if (eventIndex !== -1) {
            dayData.events[eventIndex] = {
              ...dayData.events[eventIndex],
              ...updateData,
            };
          }
        }
        return updatedData;
      });
    } catch (error) {
      console.log(error);
    }
    reset();
    setIsOpen(false); // Close dialog
  };

  const onSubmit = async (formData) => {
    const newEvent = {
      id: "event_id",
      event_name: formData.event_name,
      event_description: formData.event_description,
    };

    const calendarData = {
      year: selectedYear,
      schools: [
        {
          school_id: school_id,
          months: [
            {
              month: selectedMonth,
              days: [
                {
                  day: selectedDay,
                  events: [newEvent],
                },
              ],
            },
          ],
        },
      ],
    };

    try {
      const response = await apiClient.post("/calendar", calendarData);
      setData((prevData) => updateCalendarData(prevData, newEvent));
    } catch (error) {
      console.error(error);
    }

    reset();
    setIsOpen(false);
  };

  const updateCalendarData = (prevData, newEvent) => {
    if (!prevData) {
      return {
        year: selectedYear,
        schools: [
          {
            school_id: school_id,
            events: [
              {
                month: selectedMonth,
                days: [
                  {
                    day: selectedDay,
                    events: [newEvent],
                  },
                ],
              },
            ],
          },
        ],
      };
    } else {
      const updatedData = { ...prevData };
      let monthData = updatedData.schools
        ?.find((school) => school.school_id === school_id)
        ?.events.find((eventMonth) => eventMonth.month === selectedMonth);

      if (!monthData) {
        monthData = {
          month: selectedMonth,
          days: [],
        };
        updatedData.schools[0].events.push(monthData);
      }

      let dayData = monthData.days.find((eventDay) => eventDay.day === selectedDay);

      if (!dayData) {
        dayData = {
          day: selectedDay,
          events: [],
        };
        monthData.days.push(dayData);
      }

      dayData.events.push(newEvent);

      return updatedData;
    }
  };

  const fetchData = async () => {
    try {
      const response = await apiClient.get(
        `/calendar/${selectedYear}/${school_id}/${selectedMonth}/${selectedDay}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDay]);

  const events =
    data?.schools?.[0]?.events
      ?.find((eventMonth) => eventMonth.month === selectedMonth)
      ?.days?.find((eventDay) => eventDay.day === selectedDay)?.events || [];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  };

  useEffect(() => {
    if (selectedEvent) {
      setValue("year", selectedYear);
      setValue("school_id", school_id);
      setValue("month", selectedMonth);
      setValue("day", selectedDay);
      setValue("event_id", selectedEvent.id);
      setValue("event_name", selectedEvent.event_name);
      setValue("event_description", selectedEvent.event_description);
    }
  }, [selectedEvent, setValue]);

  return (
    <div className="w-full p-6 rounded-lg h-[51.2vh] bg-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <section className="text-2xl font-semibold">
          {`Events for ${selectedDay} ${date.toLocaleString("default", {
            month: "short",
          })}`}
        </section>
        {isFutureDate && (
          <Button className="ml-auto" onClick={() => setIsOpen(true)}>
            Add Event
          </Button>
        )}
      </div>
      <div className=" overflow-y-scroll">
        <section className="p-4 space-y-4 h-[40vh]">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="p-2 px-4 rounded-lg hover:bg-gray-50 cursor-pointer transition border border-gray-300"
                onClick={() => handleEventClick(event)}
              >
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <section className="text-lg font-medium">{event.event_name}</section>
                </div>
                <section className="text-sm text-gray-600">
                  {event.event_description}
                </section>
              </div>
            ))
          ) : (
            <section className="text-center text-gray-600">
              No events for {selectedDay}, {date.toLocaleString("default", { month: "short" })}
            </section>
          )}
        </section>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? "Update Event" : "Add Event"}</DialogTitle>
            <DialogDescription>
              {selectedEvent
                ? "Make changes to the event. Click save when you're done."
                : "Fill out the event details. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(selectedEvent ? onUpdate : onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event_name" className="text-right">
                  Event Name
                </Label>
                <Input
                  id="event_name"
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
};

export default TodayEvent;