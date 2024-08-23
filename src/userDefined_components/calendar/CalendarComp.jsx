import React from 'react'
import { Calendar } from '@/components/ui/calendar';
const CalendarComp = ({date, setDate}) => {

  const handleSelect = (newDate) => { 
    if (newDate && newDate.getTime() !== date.getTime()) {
      setDate(newDate);
    }
  };

  return (
    <>
      <div className="min-h-[37vh]">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-md border"
        />
      </div>
    </>
  );
}

export default CalendarComp