import React from "react";
import accom from "../../assets/accommodation.jpg";
import helipad from "../../assets/helipad.jpg";
import ziplining from "../../assets/ziplining.jpg";
import drink from "../../assets/drink.jpg";
import coffee from "../../assets/coffee.jpg";
import swimming from "../../assets/swimming.jpg";
import "./specialOffers.scss";

const SpecialOffers = () => {
  const offers = [
    {
      title: "Presidential Suite",
      img: accom,
      caption: "Discover the opulence of royal living",
    },
    {
      title: "Helipad",
      img: helipad,
      caption: "The only helipad in the county",
    },
    {
      title: "Ziplining",
      img: ziplining,
      caption: "The adrenaline rush you've always craved",
    },
    {
      title: "Sports Bar",
      img: drink,
      caption: "Only the finest wining and dining",
    },
    {
      title: "Swimming Pool",
      img: swimming,
      caption: "Take a dip in our infinity pool",
    },
    {
      title: "Coffee",
      img: coffee,
      caption: "Savor fresh roasts from our barista",
    },
  ];
  return (
    <div className="special-offers">
      <h3>Special Offers</h3>
      <div className="offers">
        {offers &&
          offers.map((offer, index) => (
            <div className="offer" key={index}>
              <img src={offer.img} alt={offer.title} />
              <div className="text">
                <h5>{offer.title}</h5>
                <p>{offer.caption}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
