import React from "react";
import "./RoomImageCard.scss"; 

function RoomImageCard({ roomImg }) {
  return (
    
      <div className="room-image">
        <div className="image-container">
          
            <img
              style={{ width: "50rem", height: "27rem" }}
              src={roomImg}
              alt=""
            />
            <div className="overlay"></div>
         
          

        </div>
      </div>
   
  );
}

export default RoomImageCard;
