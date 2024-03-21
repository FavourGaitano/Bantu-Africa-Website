import React from 'react'

function EventImageCard({roomImg}) {
  return (
    <div className='room-image'>
      <img style={{width:"45rem",height:"27rem"}} src={roomImg} alt="" />
    </div>
  )
}

export default EventImageCard;
