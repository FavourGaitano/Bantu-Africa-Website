import React from "react";
import "./marketingCards.scss";
// import accom from "../../assets/accommodation.jpg";
import bed from "../../assets/bed.jpg";
import food from "../../assets/foodPlatter.jpg";

const MarketingCards = () => {
  const accommodationDesc =
    "Named after the vibrant community in which it is situated, Bantu Africa offers a unique blend of rich culture and sophisticated elegance. Each of its 88 rooms maintains a benchmark of excellence in every detail. The natural stone and wood soothe the soul and suit every occasion. The resort’s unique design proves welcoming to everyone from the weary traveler to the besotted lovebirds.";
  const cuisineDesc =
    "Bantu Africa’s signature restaurant boasts organic farm-to-table cuisine, aptly paying homage to the local farming community. The celebrated chefs deliver a wide variety of local and international dishes across the resort’s four themed restaurants, offering the perfect fusion of European luxury and Kenyan cuisine.";
  return (
    <div className="cards">
      <div className="accom-card">
        <div className="image">
          <img src={bed} alt="no-img" loading="lazy" />
        </div>
        <div className="desc">
          <h4>Accommodation</h4>
          <p>{accommodationDesc}</p>
          <button>FIND OUT MORE</button>
        </div>
      </div>
      <div className="cuisine-card">
        <div className="image">
          <img src={food} alt="no-img" loading="lazy" />
        </div>
        <div className="desc">
          <h4>Cuisine</h4>
          <p>{cuisineDesc}</p>
          <button>FIND OUT MORE</button>
        </div>
      </div>
    </div>
  );
};

export default MarketingCards;
