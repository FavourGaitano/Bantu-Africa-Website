import React from "react";
import image2 from "../../assets/Images/Rooms/Single.jpg";
import "./AboutUs.scss";
import Navbar from "../../components/shared/Navbar";

const AboutUs = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="aboutusimage">
        <img src={image2} alt="Single" />
      </div>

      <div className="banner">
        <p className="name">About Us</p>
      </div>

      <div className="aboutinfo">
        <div className="aboutBantu">
          <p className="header">Luxury Hotel in Nyeri Kenya, Bantu Hotel</p>
          <p className="text">
            Bantu Africa, nestled in the heart of Mount Kenya, embraces the
            essence of hospitality, harking back to a time when weary travelers
            sought refuge in the warmth of genuine care and comfort. Drawing
            inspiration from the rich tapestry of Bantu culture, our hotel
            echoes the spirit of traditional hospitality, where guests are
            welcomed with open arms, encouraged to share tales of their journey,
            and indulge in the delights of local cuisine
          </p>
        </div>
        <div className="virtues">
          <div className="mission">
            <p>THE MISSION:</p>
            <ul>
              <li>
                Continuously pursuing unparalleled excellence in service,
                design, and hospitality.
              </li>
              <li>
                Elevating Bantu's reputation through fostering an environment
                where both guests and staff consistently surpass expectations.
              </li>
            </ul>
          </div>
          <div className="vision">
            <p>THE VISION:</p>
            <ul>
              <li>
                Continuously pursuing unparalleled excellence in service,
                design, and hospitality.
              </li>
              <li>
                Elevating Bantu's reputation through fostering an environment
                where both guests and staff consistently surpass expectations.
              </li>
              <li>
                Continuously pursuing unparalleled excellence in service,
                design, and hospitality.
              </li>
              <li>
                Elevating Bantu's reputation through fostering an environment
                where both guests and staff consistently surpass expectations.
              </li>
            </ul>
          </div>
          <div className="values">
            <p>VALUES:</p>
            <ul>
              <li>
                Continuously pursuing unparalleled excellence in service,
                design, and hospitality.
              </li>
              <li>
                Elevating Bantu's reputation through fostering an environment
                where both guests and staff consistently surpass expectations.
              </li>
              <li>
                Continuously pursuing unparalleled excellence in service,
                design, and hospitality.
              </li>
              <li>
                Elevating Bantu's reputation through fostering an environment
                where both guests and staff consistently surpass expectations.
              </li>
              <li>
                Continuously pursuing unparalleled excellence in service,
                design, and hospitality.
              </li>
              <li>
                Elevating Bantu's reputation through fostering an environment
                where both guests and staff consistently surpass expectations.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
