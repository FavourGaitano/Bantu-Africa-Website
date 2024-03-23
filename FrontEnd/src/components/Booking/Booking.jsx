import React, { useState } from "react";
import "./Booking.scss";
import Calender from "../Calender/Calender";

const Booking = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  return (
    <div className="booking">
      <div className="booking-title">
        <h1>SELECT AND BOOK A ROOM</h1>
      </div>
      <div className="options">
        <div className="select">
          <ul className="select-navbar">
            <li className="list">
              Room Type
              <ul className="dropdown">
                <div className="dropdown-holder">
                  <li>
                    Standard Rooms
                    <ul className="standard-dropdown">
                      <li>
                        Single
                        {/* <ul className="standard-single-dropdown">
                          <li>BB</li>
                          <li>HB</li>
                        </ul> */}
                      </li>
                      <li>Double</li>
                    </ul>
                  </li>
                </div>
                <li>Superior Rooms</li>
                <li>Deluxe</li>
              </ul>
            </li>
            <li className="list">
              Guest
              <ul className="dropdown">
                <li>Adults</li>
                <li>Kids</li>
              </ul>
            </li>
            <li className="list">
              
              <div className="calendar-dropdown">
                <button className="check-button" onClick={toggleCalendar}>Check In/Out</button>
                <div className="cal">
                  {showCalendar && <Calender />}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="stay">
          <h2>Your Stay</h2>
          <div className="check">
            <div className="check-in">
              <h3>Check In</h3>
              <div className="checkin-date">Mon 8 April,2024</div>
            </div>
            <div className="check-out">
              <h3>Check Out</h3>
              <div className="checkout-date">Tue 9 April,2024</div>
            </div>
          </div>
          <div className="details">
            <div className="people-no">
              <span>1 Adult</span>
            </div>

            <div className="total">
              <h3>Total:</h3>
              <div className="amount">KESH 40, 209</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
