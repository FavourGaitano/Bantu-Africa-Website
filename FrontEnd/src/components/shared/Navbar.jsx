import React from "react";
import tel from "../../assets/telephone.png";
import calendar from "../../assets/calendar.png";
import logo from "../../assets/logo-white.jpg";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="banner">
        <div className="call">
          <img src={tel} alt="no-icon" />
          <h4>CALL US</h4>
        </div>
        <button className="book">
          <img src={calendar} alt="no-icon" />
          <h4>BOOK NOW</h4>
        </button>
        <div className="socials">
          <FaSquareXTwitter />
          <FaSquareFacebook />
          <BsInstagram />
        </div>
      </div>
      <div className="nav">
        <div className="logo">
          <div className="image">
            <img src={logo} alt="no-logo" />
          </div>
          <div className="name">
            <h1>
              BANTU AFRICA <br /> RESORT{" "}
            </h1>
          </div>
        </div>
        <div className="menu-items">
          <span>
            <h6>Home</h6>
          </span>
          <span>
            <h6>Rooms & Suites</h6>
          </span>
          <span>
            <h6>Restaurant</h6>
          </span>
          <span>
            <h6>Activities</h6>
          </span>
          <span>
            <h6>Meetings & Events</h6>
          </span>
          <span>
            <h6>Gallery</h6>
          </span>
          <span>
            <h6>About Us</h6>
          </span>
          <span>
            <h6>Contact Us</h6>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
