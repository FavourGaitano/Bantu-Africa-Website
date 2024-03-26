import React, { useState } from "react";
import "./Calender.scss";
import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";
import { ErrorToast } from "../shared/Toaster";

const Calender = ({ onDateSelect, onCheckoutDateSelect }) => {
  const currentDate = new Date();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    console.log("Clicked date:", clickedDate);
    const today = new Date();
    if (new Date(clickedDate) < today) {
      ErrorToast("You cannot select a past date");
      return;
    }
    if (!checkInDate) {
      setCheckInDate(clickedDate);
      onDateSelect(clickedDate);
      console.log("Check-in date selected:", clickedDate);
    } else if (!checkOutDate && clickedDate > checkInDate) {
      setCheckOutDate(clickedDate);
      onCheckoutDateSelect(clickedDate);
      console.log("Check-out date selected:", clickedDate);
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

  const handleCheckinClick = () => {
    setCalendarOpen(true);
  };

  return (
    <>
      <button
        type="button"
        className="tag"
        onClick={handleCheckinClick}
        disabled={checkInDate !== null}
      >
        Pick Dates
      </button>
      <div style={{ width: "100%" }}>
        <div className={`datepicker ${calendarOpen ? "" : "disabled"}`}>
          <div className="datepicker-top">
            <div className="month-selector">
              <IoChevronBackCircleOutline
                className="arrow"
                onClick={handlePrevMonth}
              />
              <span className="month-name">
                {new Date(currentYear, currentMonth).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <IoChevronForwardCircleOutline
                className="arrow"
                onClick={handleNextMonth}
              />
            </div>
          </div>
          <div className="datepicker-calendar">
            <span className="day">Mon</span>
            <span className="day">Tue</span>
            <span className="day">Wed</span>
            <span className="day">Thu</span>
            <span className="day">Fri</span>
            <span className="day">Sat</span>
            <span className="day">Sun</span>
            {console.log("Current Year:", currentYear)}
            {console.log("Current Month:", currentMonth)}
            {console.log("Days in Month:", daysInMonth)}
            {console.log("First Day of Month:", firstDayOfMonth)}
            {[...Array(firstDayOfMonth).keys()].map((_, index) => (
              <button
                type="button"
                key={`empty-${index}`}
                className="date empty"
                onClick={() => handleDateClick(null)}
              >
                &nbsp;
              </button>
            ))}
            {[...Array(daysInMonth).keys()].map((day) => (
              <button
                type="button"
                key={`day-${day}`}
                className={`date ${
                  checkInDate &&
                  checkOutDate &&
                  day >= checkInDate.getDate() &&
                  day <= checkOutDate.getDate()
                    ? "selected-range"
                    : checkInDate && day === checkInDate.getDate()
                    ? "check-in"
                    : checkOutDate && day === checkOutDate.getDate()
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
