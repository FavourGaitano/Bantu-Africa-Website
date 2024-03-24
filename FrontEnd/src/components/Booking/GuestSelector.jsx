import React, { useState } from "react";
import "./GuestSelector.scss";
import { IoClose } from "react-icons/io5";


function GuestSelector({ adults, kids, setAdults, setKids,setGuestSelectorOpen }) {



    const increment = (type) => {
      if (type === "adults") {
        setAdults(adults + 1);
      } else if (type === "kids") {
        setKids(kids + 1);
      }
    };
  
    const decrement = (type) => {
      if (type === "adults" && adults > 1) {
        setAdults(adults - 1);
      } else if (type === "kids" && kids > 0) {
        setKids(kids - 1);
      }
    };
  return (
    <div className="guest-container">
    <div className="guest-top">
      <p>Select Guests</p>
      <IoClose onClick={() => setGuestSelectorOpen(false)} />
    </div>
    <div className="adults-card">
      <label htmlFor="adults">Adults:</label>
      <div className="select-container">
        <button type="button" onClick={() => decrement("adults")}>-</button>
        <input type="text" value={adults} />

        <button type="button" onClick={() => increment("adults")}>+</button>
      </div>
    </div>
    <div className="adults-card">
      <label htmlFor="kids">Children:</label>
      <div className="select-container">
        <button type="button" onClick={() => decrement("kids")}>-</button>
        <input type="text" value={kids}  />
     
        <button type="button" onClick={() => increment("kids")}>+</button>
      </div>
    </div>

  </div>
  
  );
}



export default GuestSelector;
