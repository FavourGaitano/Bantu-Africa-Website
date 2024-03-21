import React from "react";
import "./Booking.scss";

const Booking = () => {
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
                <li>Deluxe</li>
                <li>Superior</li>
                <li>Standard</li>
                <li>Presidential</li>
              </ul>
            </li>
            <li className="list">Guest</li>
            <li className="list">Check In</li>
            <li className="list">Check Out</li>
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
