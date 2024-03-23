import React, { useState } from 'react';
import Calender from '../Calender/Calender';
import './CreateBooking.scss'
const CreateBooking = () => {
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedGuest, setSelectedGuest] = useState('');

  console.log("selected room",selectedRoomType);
;

  const handleRoomTypeChange = (roomType) => {
    setSelectedRoomType(roomType);
  };

  const handleGuestChange = (guest) => {
    setSelectedGuest(guest);
  };

  const handleCalculateDays = () => {
    if (checkInDate && checkOutDate) {
      const oneDay = 24 * 60 * 60 * 1000; 
      const startDate = new Date(currentYear, currentMonth, checkInDate);
      const endDate = new Date(currentYear, currentMonth, checkOutDate);
      const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
      return diffDays;
    }
    return 0;
  };

 

  return (
   <>
    <form className="select">
      <ul className="select-navbar">
        <li className="list">
          Room Type
          <ul className="dropdown">
            <div className="dropdown-holder">
              <li onClick={() => handleRoomTypeChange('Standard')}>
                Standard
                <ul className="standard-dropdown">
                  <li onClick={() => handleRoomTypeChange('Single')}>Single</li>
                  <li onClick={() => handleRoomTypeChange('Double')}>Double</li>
                </ul>
              </li>
            </div>
            <li onClick={() => handleRoomTypeChange('Superior')}>Superior</li>
            <li onClick={() => handleRoomTypeChange('Deluxe')}>Deluxe</li>
          </ul>
        </li>
        <li className="list">
          Guest
          <ul className="dropdown">
            <li onClick={() => handleGuestChange('Adults')}>Adults</li>
            <li onClick={() => handleGuestChange('Kids')}>Kids</li>
          </ul>
        </li>
        <li className="list">
          <div className="calendar-dropdown">
            <button className="check-button">Check In/Out</button>
            <div className="btn-group">
              <button className="tag">Checkin</button>
              <button className="tag">Checkout</button>
              {/* <button className="tag">
                {checkInDate && checkOutDate
                  ? `${handleCalculateDays()} days`
                  : ""}
              </button> */}
            </div>
          </div>
        </li>
      </ul>
      {<Calender />}
    </form>
    

   </>
    
  );
};

export default CreateBooking;
