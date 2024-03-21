import React from "react";
import "./Hero.scss";
const Hero = ({ heroImgUrl, msg }) => {
  return (
    
    <div >
       <div className="hero-container-img">
        <img src={heroImgUrl} alt="hero" />
      </div>

      <div className="hero-banner">
        <p className="name">{msg}</p>
      </div>
     
    </div>
  );
};

export default Hero;


