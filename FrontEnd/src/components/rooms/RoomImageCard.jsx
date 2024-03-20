import React from 'react'

function RoomImageCard({roomImg}) {
  return (
    <div className='room-image'>
      <img style={{width:"100%"}} src={roomImg} alt="" />
    </div>
  )
}

export default RoomImageCard
