import React from "react";
import accom from "../../assets/accommodation.jpg";
import helipad from "../../assets/helipad.jpg";
import ziplining from "../../assets/ziplining.jpg";
import drink from "../../assets/drink.jpg";
import coffee from "../../assets/coffee.jpg";
import swimming from "../../assets/swimming.jpg";
import "./specialOffers.scss";
import { useGetOtherServicesQuery } from "../../features/otherServices/otherServices";

const SpecialOffers = () => {
  // const offers = [
  //   {
  //     title: "Presidential Suite",
  //     img: accom,
  //     caption: "Discover the opulence of royal living",
  //   },
  //   {
  //     title: "Helipad",
  //     img: helipad,
  //     caption: "The only helipad in the county",
  //   },
  //   {
  //     title: "Ziplining",
  //     img: ziplining,
  //     caption: "The adrenaline rush you've always craved",
  //   },
  //   {
  //     title: "Sports Bar",
  //     img: drink,
  //     caption: "Only the finest wining and dining",
  //   },
  //   {
  //     title: "Swimming Pool",
  //     img: swimming,
  //     caption: "Take a dip in our infinity pool",
  //   },
  //   {
  //     title: "Coffee",
  //     img: coffee,
  //     caption: "Savor fresh roasts from our barista",
  //   },
  // ];
  const { data: otherServices } = useGetOtherServicesQuery();
  console.log(otherServices);

  return (
    <div className="special-offers">
      <h3>Other Services</h3>
      <div className="offers">
        {otherServices &&
          Array.isArray(otherServices) &&
          otherServices.map((otherService, index) => (
            <div className="offer" key={index}>
              <img
                src={otherService.ImageUrl}
                alt={otherService.OtherServiceName}
                loading="lazy"
              />
              <div className="text">
                <h5>{otherService.OtherServiceName}</h5>
                <p>{otherService.Description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
