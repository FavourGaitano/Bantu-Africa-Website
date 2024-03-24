import React, { useState } from "react";
import "./Calender.scss";
<<<<<<< HEAD
import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5";
=======
import BookingForm from "../BookingForm/BookingForm";
>>>>>>> 2fbd0f3fcdaa799a3a07daf991d395c958e52774

const Calender = ({ onDateSelect,onCheckoutDateSelect }) => {
  const currentDate = new Date();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [calendarOpen, setCalendarOpen] = useState(false); 
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const [formVisible, setFormVisible] = useState(false);

  const handleDateClick = (date) => {
    if (!checkInDate) {
      setCheckInDate(date);
      onDateSelect(date);
    } else if (!checkOutDate) {
      if (date > checkInDate) {
        setCheckOutDate(date);
        onCheckoutDateSelect(date); 
      } else {
        
        setCheckOutDate(checkInDate);
        setCheckInDate(date);
        onDateSelect(date); 
      }
    }
  }

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

  const handleCheckinClick = () => {
    setCalendarOpen(true); 
  };

  return (
    <>
    <button type="button"
    className="tag"
    onClick={handleCheckinClick}
    disabled={checkInDate !== null} 
  >
    Checkin
  </button>
    <div style={{ width: "100%" }}>
      <div className={`datepicker ${calendarOpen ? "" : "disabled"}`}>
        <div className="datepicker-top">
          <div className="month-selector">
          <IoChevronBackCircleOutline className="arrow" onClick={handlePrevMonth} />
           
            <span className="month-name">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <IoChevronForwardCircleOutline className="arrow"  onClick={handleNextMonth} />

          
          </div>
          
         
            
        </div>
        <div className="datepicker-calendar">
          <span className="day">Mon</span>
          <span className="day">Tue</span>
          <span className="day">Wen</span>
          <span className="day">Thu</span>
          <span className="day">Fri</span>
          <span className="day">Sat</span>
          <span className="day">Sun</span>
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <button type="button"
              key={`empty-${index}`}
              className="date empty"
              onClick={() => handleDateClick(null)}
            >
              &nbsp;
            </button>
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <button type="button"
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
              disabled={!calendarOpen}
            >
              {day + 1}
            </button>
          ))}
        </div>
      </div>
     
    </div>
    </>
  );
};

export default Calender;
