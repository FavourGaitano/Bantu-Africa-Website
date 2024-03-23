import React from "react";
import tel from "../../assets/telephone.png";
import calendar from "../../assets/calendar.png";
import logo from "../../assets/logo-white.jpg";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import "./navbar.scss";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    {
      path: "/",
      text: "Home",
    },
    {
      path: "/room",
      text: "Rooms & Suites",
    },
    {
      path: "/restaurant",
      text: "Restaurant",
    },
    {
      path: "/activities/adult",
      text: "Activities",
    },
    {
      path: "/activities/kid",
      text: "kids",
    },
    {
      path: "/event",
      text: "Meetings & Events",
    },
    {
      path: "/meeting",
      text: "Meetings & Events",
    },
    {
      path: "/gallery",
      text: "Gallery",
    },
    {
      path: "/about",
      text: "About Us",
    },
    {
      path: "/contact",
      text: "Contact Us",
    },
  ];
  return (
    <div className="navbar">
      <div className="top-banner">
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
          {navItems &&
            navItems.map((item, index) => (
              <NavLink key={index} to={item.path}>
                <span>
                  <h6 style={{ listStyle: "none", textDecoration: "none" }}>
                    {item.text}
                  </h6>
                </span>
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
