import React from 'react'
import Navbar from '../../components/shared/Navbar'
import Carousel from '../../components/shared/Carousel'
import Booking from '../../components/Booking/Booking'

const BookingPage = () => {
  return (
    <div className='booking-page'>
        <Navbar />
        <Carousel />
        <Booking />
    </div>
  )
}

export default BookingPage