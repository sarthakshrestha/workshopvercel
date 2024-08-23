import React, { useEffect, useState } from "react";
import EventsCard from "userDefined_components/calendar/EventsCard";
import apiClient from "config/apiClient";
import { FaCalendarAlt } from "react-icons/fa";

const getMonthName = (monthNumber) => {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return monthNames[monthNumber];
};

const MonthlyEvent = ({ date, school_id }) => {
  const selectedMonth = date.getMonth() + 1;
  const selectedYear = date.getFullYear();

  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await apiClient.get(
        `/calendar/${selectedYear}/${school_id}/${selectedMonth}`
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const updateEventInState = (day, updatedEvent) => {
    setData((prevData) => {
      const updatedData = { ...prevData };
      const month = updatedData.schools?.[0]?.events?.find(
        (eventMonth) => eventMonth.month === selectedMonth
      );

      if (month) {
        const dayObj = month.days.find((d) => d.day === day);
        if (dayObj) {
          const eventIndex = dayObj.events.findIndex(
            (event) => event.id === updatedEvent.id
          );
          if (eventIndex !== -1) {
            dayObj.events[eventIndex] = updatedEvent;
          }
        }
      }
      return updatedData;
    });
  };

  const monthEvents =
    data?.schools?.[0]?.events?.find(
      (eventMonth) => eventMonth.month === selectedMonth
    ) || { days: [] };

  return (
    <div className="w-full p-6 rounded-lg bg-white shadow-lg h-[90vh] overflow-x-auto">
      <section className="text-2xl font-semibold flex items-center mb-4">
        Events in {getMonthName(selectedMonth - 1)} {selectedYear}
      </section>
      <section className="mt-4">
        {monthEvents && monthEvents.days.length > 0 ? (
          monthEvents.days.flatMap((day) =>
            day.events.map((event) => (
              <EventsCard
                eventsData={event}
                day={day.day}
                month={getMonthName(selectedMonth - 1)}
                monthInt={selectedMonth}
                year={selectedYear}
                onEventUpdate={updateEventInState}
                key={event.id}
              />
            ))
          )
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <p className="">No events for this month.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default MonthlyEvent;