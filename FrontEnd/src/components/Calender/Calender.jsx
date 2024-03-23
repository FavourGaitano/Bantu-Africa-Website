import React, { useState } from "react";
import "./Calender.scss";

const Calender = () => {
  // Get the current date
  const currentDate = new Date();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [calendarOpen, setCalendarOpen] = useState(true); 
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleDateClick = (date) => {
    if (!checkInDate) {
      setCheckInDate(date);
    } else if (!checkOutDate) {
      setCheckOutDate(date);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

 
  return (
    <div style={{width:"100%"}} >
      {calendarOpen && (
        <div className="datepicker">
          <div className="datepicker-top">
          
            <div className="month-selector">
              <button className="arrow" onClick={handlePrevMonth}>
                <i className="material-icons">Prev</i>
              </button>
              <span className="month-name">
                {new Date(currentYear, currentMonth).toLocaleString(
                  "default",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </span>
              <button className="arrow" onClick={handleNextMonth}>
                <i className="material-icons">Next</i>
              </button>
            </div>
          </div>
          <div className="datepicker-calendar">
            <span className="day">Mo</span>
            <span className="day">Tu</span>
            <span className="day">We</span>
            <span className="day">Th</span>
            <span className="day">Fr</span>
            <span className="day">Sa</span>
            <span className="day">Su</span>
            {[...Array(firstDayOfMonth).keys()].map((_, index) => (
              <button key={`empty-${index}`} className="date empty">
                &nbsp;
              </button>
            ))}
            {[...Array(daysInMonth).keys()].map((day) => (
              <button
                key={`day-${day}`}
                className={`date ${
                  day + 1 >= checkInDate && day + 1 <= checkOutDate
                    ? "selected-range"
                    : day + 1 === checkInDate
                    ? "check-in"
                    : day + 1 === checkOutDate
                    ? "check-out"
                    : ""
                }`}
                onClick={() => handleDateClick(day + 1)}
              >
                {day + 1}
              </button>
            ))}
          </div>
          <div className="button-container">
            <button
              className="confirm-button"
              onClick={() => console.log("Confirmed")}
            >
              Book
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calender;
