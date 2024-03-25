import React from "react";
import "./EventImageCard.scss";

function EventImageCard({ roomImg, onClick }) {
  return (
    <div className="room-image">
      <img onClick={onClick} src={roomImg} alt="" className="meetingimage" />
    </div>
  );
}

export default EventImageCard;
