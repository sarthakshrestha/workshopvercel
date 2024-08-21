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

const TodayEvent = ({ date, school_id,  }) => {
  // Extract the year, month, and day from the date
  const selectedYear =  date.getFullYear();
  const selectedMonth = date.getMonth() + 1;
  const selectedDay = date.getDate() ;

  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { register, handleSubmit, reset, setValue } = useForm();

  const currentDate = new Date();
  const isFutureDate = date > currentDate;

  const onSubmit = async (data) => {
    const newEvent = {
      id: "event_id",
      event_name: data.event_name,
      event_description: data.event_description,
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

      setData((prevData) => {
        if (!prevData) {
          // Initialize the state if it's null
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
          // Update the existing state
          const updatedData = { ...prevData };
          let monthData = updatedData.schools
            ?.find((school) => school.school_id === school_id)
            ?.events.find((eventMonth) => eventMonth.month === selectedMonth);

          if (!monthData) {
            // If the month doesn't exist, create it
            monthData = {
              month: selectedMonth,
              days: [],
            };
            updatedData.schools[0].events.push(monthData);
          }

          let dayData = monthData.days.find(
            (eventDay) => eventDay.day === selectedDay
          );

          if (!dayData) {
            // If the day doesn't exist, create it
            dayData = {
              day: selectedDay,
              events: [],
            };
            monthData.days.push(dayData);
          }

          // Add the new event to the day's events
          dayData.events.push(newEvent);

          return updatedData;
        }
      });
    } catch (error) {
      console.log(error);
    }

    reset();
    setIsOpen(false); // Close dialog
  };


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

  const fetchData = async () => {
    try {
      const response = await apiClient.get(
        `/calendar/${selectedYear}/${school_id}/${selectedMonth}/${selectedDay}`
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
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
    <div className="w-full h-full p-3 rounded-3xl bg-gray-200">
      <section className="text-2xl font-semibold">
        <span>{`Events for ${selectedDay} ${date.toLocaleString("default", {
          month: "short",
        })}`}</span>
      </section>
      <section className="mt-1 p-1 cursor-pointer bg-white rounded-lg">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="mb-2"
              onClick={() => handleEventClick(event)}
            >
              <section className="text-lg font-medium">
                &bull; {event.event_name}
              </section>
              <section className="text-sm font-normal">
                {event.event_description}
              </section>
            </div>
          ))
        ) : (
          <section className="text-sm font-normal flex justify-between items-center">
            <span className="p-1 font-medium">
              {`No events for ${selectedDay}, ${date.toLocaleString("default", {
                month: "short",
              })}`}
            </span>
            {isFutureDate && (
              <Button onClick={() => setIsOpen(true)}>Add Event</Button>
            )}
          </section>
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {selectedEvent ? "Update Event" : "Add Event"}
              </DialogTitle>
              <DialogDescription>
                {selectedEvent
                  ? "Make changes to the event. Click save when you're done."
                  : "Make changes to the Calendar. Click save when you're done."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(selectedEvent ? onUpdate : onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="gri grid-cols-4 items-center gap-4 hidden">
                  <Label htmlFor="year" className="text-right">
                    Year
                  </Label>
                  <Input
                    id="year"
                    {...register("year")}
                    className="col-span-3"
                  />
                </div>
                <div className="gri grid-cols-4 items-center gap-4 hidden">
                  <Label htmlFor="school_id" className="text-right">
                    School ID
                  </Label>
                  <Input
                    id="school_id"
                    {...register("school_id")}
                    className="col-span-3"
                  />
                </div>
                <div className="gri grid-cols-4 items-center gap-4 hidden">
                  <Label htmlFor="month" className="text-right">
                    Month
                  </Label>
                  <Input
                    id="month"
                    {...register("month")}
                    className="col-span-3"
                  />
                </div>
                <div className="gri grid-cols-4 items-center gap-4 hidden">
                  <Label htmlFor="day" className="text-right">
                    Day
                  </Label>
                  <Input id="day" {...register("day")} className="col-span-3" />
                </div>
                <div className="gri grid-cols-4 items-center gap-4 hidden">
                  <Label htmlFor="event_id" className="text-right">
                    Event ID
                  </Label>
                  <Input
                    id="event_id"
                    {...register("event_id")}
                    className="col-span-3"
                  />
                </div>
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
        {events.length > 0 && isFutureDate && (
          <Button onClick={() => setIsOpen(true)}>Add Event</Button>
        )}
      </section>
    </div>
  );
};

export default TodayEvent;



