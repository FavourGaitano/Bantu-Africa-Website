import React from "react";
import image2 from "../../assets/Images/Conference/Meetings.jpg";
import "./meeting.scss";
import EventCard from "../../components/event/EventCard";
import EventImageCard from "../../components/event/EventImageCard";

import EventImage from "../../assets/Images/Conference/meetingrm.jpg";
import { useGetMeetingsQuery } from "../../features/meetings/meetingsApi";

const Meeting = () => {
  const { data: meetings, error, isLoading } = useGetMeetingsQuery();
  console.log(meetings);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading meetings.</div>;
  }
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

      {meetings &&
        Array.isArray(meetings) &&
        meetings.map((meeting, index) => (
          <div
            className={`event-superior-content ${
              index % 2 !== 0 ? "reversed" : ""
            }`}
            key={index}
          >
            <div className="event-photo">
              <EventImageCard roomImg={meeting.Image} />
            </div>
            <div className="event-items">
              <h2>
                {meeting.Quantity} {meeting.ConferenceRoomName}
              </h2>
              <div className="event-desc">
                <EventCard desc={meeting.Description} />
              </div>
            </div>
          </div>
        ))}

      <div class="desc-btn">
        <button>Get in Touch</button>
      </div>
    </div>
  );
};

export default Meeting;
