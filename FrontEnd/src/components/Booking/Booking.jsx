import React, { useState } from "react";
import "./Booking.scss";
import BookingList from "./BookingList";
import CreateBooking from "./CreateBooking";
import Calender from "../Calender/Calender";

const Booking = () => {
  return (
    <div className="booking">
      <div className="booking-title">
        <h1>SELECT AND BOOK A ROOM</h1>
      </div>
      <div className="options">
        <div className="booking-form" >
          <CreateBooking />
        </div>
        <div className="booking-list" >
          <BookingList />
        </div>
      </div>
    </div>
  );
};

export default Booking;
