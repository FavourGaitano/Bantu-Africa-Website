import React from "react";
import image2 from "../../assets/Images/Conference/Meetings.jpg";
import "./meeting.scss";

const Meeting = () => {
  return (
    <div>
      <div className="meetingsimage">
        <img src={image2} alt="Meetings" />
      </div>
      <div className="banner">
        <p className="name">Meetings</p>
        <p></p>
      </div>
      <div className="meetingCards">
        
      </div>
    </div>
  );
};

export default Meeting;
