import React, { useState } from "react";
import "./Event.scss";
import SuperiorRoomImg from "../../assets/roomWFlowers.jpg";
import Button from "../../components/shared/Button";
import EventCard from "../../components/event/EventCard";
import ParticipateEvent from "../../components/event/ParticipateEvent";
import UpcomingEvent from "../../components/event/UpcomingEvent";
import EventImage from "../../assets/event-image.png";
import EventImageCard from "../../components/event/EventImageCard";
import Hero from "../../components/rooms/Hero";
import Event3 from "../../assets/events.jpg";
// import Event4 from '../../assets/event4.jpg'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Event = () => {
  const [showGallery, setShowGallery] = useState(false);
  const images = [
    {
      original: Event3,
    },
    {
      original: EventImage,
    },
  ];
  const handleEventImageClick = () => {
    setShowGallery(true);
  };

  const handleCloseGallery = () => {
    setShowGallery(false);
  };

  return (
    <div className="event-main-container">
      <Hero heroImgUrl={Event3} msg="EVENTS" />
      <main className="event-main-container">
        <section className="main-content">
          <div className="event-superior-content">
            <div className="event-photo">
              {/* <ImageGallery items={images} /> */}

              <EventImageCard
                onClick={handleEventImageClick}
                roomImg={EventImage}
              />
            </div>
            <div className="event-items">
              <h2>EVENTS</h2>
              <div className="event-desc">
                <EventCard />
              </div>
              <div className="event-find-more-btn">
                <Button msg="DATE: 26/04/2024" />
                <Button msg="PARTICIPANTS: 10" />
              </div>
            </div>
          </div>
          <h2 className="upcoming-event">UPCOMING EVENTS</h2>
          <Carousel autoPlay interval={1000 } showArrows={true}   className="upcoming-card">
          <div className="event-deluxe-content">
              <div className="event-items">
                <div className="event-desc">
                  <UpcomingEvent />
                </div>
                <div className="event-find-more-btn">
                  <Button msg="DATE: 26/04/2024" />
                  <Button style={{ color: "red" }} msg="PARTICIPANTS: 10" />
                </div>
              </div>
              <div className="event-photo">
                <EventImageCard roomImg={SuperiorRoomImg} />
              </div>
            </div>
            <div className="event-deluxe-content">
              <div className="event-items">
                <div className="event-desc">
                  <UpcomingEvent />
                </div>
                <div className="event-find-more-btn">
                  <Button msg="DATE: 26/04/2024" />
                  <Button style={{ color: "red" }} msg="PARTICIPANTS: 10" />
                </div>
              </div>
              <div className="event-photo">
                <EventImageCard roomImg={SuperiorRoomImg} />
              </div>
            </div>
            
           
          </Carousel>
        
          <div className="participate-event">
            <h2>PARTICIPATE IN OUR EVENTS</h2>

            <div>
              <ParticipateEvent />
            </div>
          </div>
          {showGallery && (
            <div className="modal-container">
              <div className="modal-gallery">
                <ImageGallery items={images} />
                <span className="close-button" onClick={handleCloseGallery}>
                  &times;
                </span>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Event;
