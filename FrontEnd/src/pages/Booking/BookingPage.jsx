import React from 'react'
import Carousel from '../../components/shared/Carousel'
import Booking from '../../components/Booking/Booking'

const BookingPage = () => {
  return (
    <div className='booking-page'>
        <Carousel />
        <Booking />
    </div>
  )
}

export default BookingPage