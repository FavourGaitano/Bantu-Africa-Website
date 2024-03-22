import React from 'react';
import './RoomCard.scss';
const RoomCard = ({desc}) => {
  return (
    <div className='room-card-content'>
      <p>{desc}</p>
    </div>
  )
}

export default RoomCard
