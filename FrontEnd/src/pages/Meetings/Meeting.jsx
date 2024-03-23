import React from "react";
import image2 from "../../assets/Images/Conference/Meetings.jpg";
import "./meeting.scss";
import EventCard from "../../components/event/EventCard";
// import EventImage from "../../assets/event-image.png";
import EventImageCard from "../../components/event/EventImageCard";

import EventImage from "../../assets/Images/Conference/meetingrm.jpg";

const Meeting = () => {
  return (
    <div>
      <div className="meetingsimage">
        <img src={image2} alt="Meetings" />
      </div>
      <div className="banner">
        <p className="name">MEETINGS</p>
        <p className="meetingheaderinfo">
          Bantu Resort holds the belief that individuals exhibit heightened
          productivity when they are nurtured and inspired by their environment.
        </p>
      </div>

      <div className="event-superior-content">
        <div className="event-photo">
          <EventImageCard roomImg={EventImage} />
        </div>
        <div className="event-items">
          <h2>Conferences $ Meetings</h2>
          <div className="event-desc">
            <EventCard desc="Our expansive and elegantly appointed meeting rooms render the hotel a perfect venue for a variety of business conferences and gatherings of all sizes. Whether it's corporate seminars, training sessions, chama get-togethers, product launches, exhibitions, and more, we have ample capacity to accommodate your needs." />
          </div>
        </div>
      </div>

      <div className="event-deluxe-content">
        <div className="event-items">
          <div className="event-desc">
            <EventCard desc="We provide competitive rates for both Full Day and Half Day meeting packages compared to other options in the area. Our poolside 'Thingira' roundtable offers a private setting suitable for lunch, dinner, medium-sized chama meetings, or business discussions." />
          </div>
        </div>
        <div className="event-photo">
          <EventImageCard roomImg={EventImage} />
        </div>
      </div>
    </div>
  );
};

export default Meeting;
