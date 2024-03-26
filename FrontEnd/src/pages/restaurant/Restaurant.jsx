import React from "react";
import "./Restaurant.scss";
import RestaurantContent from "../../components/restaurant/RestaurantContent";
import image from "../../assets/Restaurant/image 8.png";
import Navbar from "../../components/shared/Navbar";
import { useNavigate } from "react-router-dom";

const Restaurant = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/Menu");
  };

  return (
    <div className="mainRestaurant">
      <div className="restaurant-image">
        <img src={image} alt="ola" />
      </div>

      <div className="restaurant-descr">
        <div className="restaurant-words">
          <p>
            Savour the spirit of Africa at Bantu Africa's restaurant, where
            local, organic ingredients meet the art of open flame grilling,
            creating a dining experience that's a journey through Kenya's
            vibrant culture and traditions, all against the serene backdrop of
            Mount Kenya.
          </p>
        </div>
        <div className="restaurant-buttons">
          <button className="btn1">Offers</button>
          <button className="btn2" onClick={handleMenuClick}>
            Our Menu
          </button>
          <button className="btn1">Enquiries</button>
        </div>
      </div>

      <div className="restaurant-openhours">
        <p className="restaurant-name">BANTU AFRICA RESTAURANT</p>
        <p className="restaurant-time">Opening Hours: 6:00am to 1:00am</p>
      </div>
      <RestaurantContent />
    </div>
  );
};

export default Restaurant;
