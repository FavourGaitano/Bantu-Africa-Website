import React from 'react'
import './BookingList.scss'



const BookingList = () => {
  return (
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
  )
}

export default BookingList
