import React from 'react';
import './EventCard.scss';
const EventCard = ({desc}) => {
  return (
    <div className='room-card-content'>
      <p>{desc}</p>
    </div>
  )
}

export default EventCard;
