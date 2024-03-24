import React from 'react'
import './BookingForm.scss'

const BookingForm = () => {
  return (
    <div>

        <form className="form">
            <p className="title">Book Now</p>
            <p className="message">Book Now for a memorable and luxurious stay at Bantu Africa Resort. </p>
                <div className="flex">
                <label>
                    <input required="" placeholder="" type="text" className="input" id="input0"/>
                    <span>Firstname</span>
                </label>

                <label className="label">
                    <input required="" placeholder="" type="text" className="input" id="input0"/>
                    <span>Lastname</span>
                </label>
            </div>  
                    
            <label>
                <input required="" placeholder="" type="email" className="input"/>
                <span>Email</span>
            </label> 
            <button className="submit">Confirm Booking</button>
           
        </form>
    </div>
  )
}

export default BookingForm