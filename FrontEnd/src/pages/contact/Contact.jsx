import React from "react";
import Hero from "../../components/rooms/Hero";
import Event3 from "../../assets/events.jpg";
import ContactUsForm from "../../components/ContactUsForm/ContactUsForm";
import EventImageCard from "../../components/event/EventImageCard";
import EventImage from "../../assets/event-image.png";
import contactImg from "../../assets/contact3.jpg";
import "./Contact.scss";
const Contact = () => {
  return (
    <div className="contact-container" >
      <Hero heroImgUrl={contactImg} msg="Contact Us" />
      <div className="contact-items">
        <div className="contact-form-items">
          <ContactUsForm />
        </div>
        <div className="contact-items-right">
          <EventImageCard roomImg={EventImage} />
        </div>
      </div>
      <div class="info-card">
        <h2>REACH US THROUGH:</h2>
        <div class="contact-method">
          <h4>PHONE</h4>
          <p>+254 768497841 / 0768497840</p>
        </div>
        <div class="contact-method">
          <h4>Email</h4>
          <p>reservations@bantuafrica.co.ke</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
