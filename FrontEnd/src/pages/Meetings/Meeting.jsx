import React from "react";
import image2 from "../../assets/Images/Conference/Meetings.jpg";
import "./meeting.scss";
import EventCard from "../../components/event/EventCard";
import EventImage from "../../assets/event-image.png";
import EventImageCard from "../../components/event/EventImageCard";
import UpcomingEvent from "../../components/event/UpcomingEvent";

const Meeting = () => {
  return (
    <div>
      <div className="meetingsimage">
        <img src={image2} alt="Meetings" />
      </div>
      <div className="banner">
        <p className="name">Meetings</p>
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
            <EventCard />
          </div>
        </div>
      </div>

      <div className="event-deluxe-content">
        <div className="event-items">
          <div className="event-desc">
            <UpcomingEvent />
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
