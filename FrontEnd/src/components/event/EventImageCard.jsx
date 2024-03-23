import React from 'react'

function EventImageCard({roomImg,onClick}) {
  return (
    
    <div className='room-image'>
      <img style={{width:"45rem",height:"27rem"}} onClick={onClick} src={roomImg} alt="" />
    </div>
  )
}

export default EventImageCard;
