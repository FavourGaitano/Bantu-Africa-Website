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
import { useGetEventsQuery } from "../../features/events/eventApi";

const Event = () => {
  const { data: events } = useGetEventsQuery();
  // const eventDates = events & events.map((event) => {
  //   const eventDate = new Date(event.Date).toLocaleDateString();
  //   const currentDate = new Date().toLocaleDateString();
  //   if (eventDate > currentDate) {
  //     return event.Date; 
  //   }
  // });
  
  // console.log("event dates",eventDates);
  
  console.log("events", events);
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
                <EventCard desc="Bantu hosts and actively participates in a wide range of global meetings encompassing various topical themes. These gatherings serve as platforms to delve into key factors and trends reshaping the marketplace. Our goal is to foster the exchange of insights and connect like-minded business leaders and entrepreneurs." />
              </div>
            </div>
          </div>
          <h2 className="upcoming-event">UPCOMING EVENTS</h2>
          <Carousel
            autoPlay
            interval={1000}
            showArrows={true}
            showThumbs={false}
            className="upcoming-card"
          >
            {events ? (
              events.map((event) => (
                <div
                  className="event-deluxe-content"
                  key={event.upcommingEventId}
                >
                  <div className="event-items">
                    <div className="event-desc">
                      <EventCard desc={event.Description} />
                    </div>
                    <div className="event-find-more-btn">
                      <Button
                        msg={`DATE: ${new Date(
                          event.Date
                        ).toLocaleDateString()}`}
                      />
                    </div>
                  </div>
                  <div className="event-photo">
                    <EventImageCard roomImg={event.PosterUrl} />
                  </div>
                </div>
              ))
            ) : (
              <div className="event-deluxe-content">
                <div className="event-items">
                  <div className="event-desc">
                    <EventCard desc="Bantu hosts and actively participates in a wide range of global meetings encompassing various topical themes. These gatherings serve as platforms to delve into key factors and trends reshaping the marketplace. Our goal is to foster the exchange of insights and connect like-minded business leaders and entrepreneurs." />
                  </div>
                </div>
                <div className="event-photo">
                  <EventImageCard roomImg={SuperiorRoomImg} />
                </div>
              </div>
            )}
          </Carousel>

          <div className="participate-event">
            <h3>PARTICIPATE IN OUR EVENTS</h3>

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



