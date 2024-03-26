import React, { useState } from "react";
import tel from "../../assets/telephone.png";
import calendar from "../../assets/calendar.png";
import logo from "../../assets/logo-white.jpg";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import "./navbar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const scrollToTopAndNavigate = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const navItems = [
    {
      path: "/",
      text: "HOME",
    },
    {
      path: "/room",
      text: "ROOMS & SUITES",
    },
    {
      path: "/restaurant",
      text: "RESTAURANT",
    },
    {
      path: "/activities/adult",
      text: "ACTIVITIES",
    },
    {
      path: "/activities/kid",
      text: "KIDS",
    },
    {
      path: "/event",
      text: "MEETINGS & EVENTS",
    },
    {
      path: "/meetings",
      text: "MEETINGS & EVENTS",
    },
    {
      path: "/gallery",
      text: "GALLERY",
    },
    {
      path: "/about",
      text: "ABOUT US",
    },
    {
      path: "/contact",
      text: "CONTACT US",
    },
  ];
  return (
    <div className="navbar">
      <div className="top-banner">
        {showMenu ? (
          <FaTimes className="menu-toggle" onClick={toggleMenu} />
        ) : (
          <FaBars className="menu-toggle" onClick={toggleMenu} />
        )}
        <div className="call">
          <img src={tel} alt="no-icon" />
          <h4>CALL US</h4>
        </div>
        <button
          className="book"
          onClick={() => {
            scrollToTopAndNavigate("/booking");
          }}
        >
          <img src={calendar} alt="no-icon" />
          <h4>BOOK NOW</h4>
        </button>
        <div className="socials">
          <FaSquareXTwitter />
          <FaSquareFacebook />
          <BsInstagram />
        </div>
      </div>

      <div className={`nav ${showMenu ? "show-menu" : ""}`}>
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
              <div key={index}>
                <span
                  onClick={() => {
                    scrollToTopAndNavigate(item.path);
                  }}
                  style={{ listStyle: "none", textDecoration: "none" }}
                >
                  <h6 style={{ listStyle: "none", textDecoration: "none" }}>
                    {item.text}
                  </h6>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
