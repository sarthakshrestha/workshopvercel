import React, { useEffect, useState } from "react";
import EventsCard from "userDefined_components/calendar/EventsCard";
import apiClient from "config/apiClient";

const getMonthName = (monthNumber) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[monthNumber];
};

const MonthlyEvent = ({ date, school_id, }) => {
  const selectedMonth = date.getMonth() + 1;
  const selectedYear = date.getFullYear();

  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await apiClient.get(
        `/calendar/${selectedYear}/${school_id}/${selectedMonth}`
      );
      // console.log(response.data.data)
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

 const monthEvents = data?.schools?.[0]?.events?.find(
   (eventMonth) => eventMonth.month === selectedMonth
 ) || { days: [] };


  return (
    <div className="w-96 h-full p-3 rounded-3xl bg-gray-200">
      <section className="text-2xl font-semibold">
        <span>
          Events in {getMonthName(selectedMonth - 1)} {selectedYear}
        </span>
      </section>
      <section className="mt-3">
        {monthEvents && monthEvents.days.length > 0 ? (
          monthEvents.days.flatMap((day) =>
            day.events.map((event) => (
              <div key={event.id} className="mb-2">
                <EventsCard
                  eventsData={event}
                  day={day.day}
                  month={getMonthName(selectedMonth - 1)}
                  monthInt={selectedMonth}
                  year={selectedYear}
                  onEventUpdate={updateEventInState}
                />
              </div>
            ))
          )
        ) : (
          <section className="text-sm font-medium ">
            No events for this month.
          </section>
        )}
      </section>
    </div>
  );
};

export default MonthlyEvent;


