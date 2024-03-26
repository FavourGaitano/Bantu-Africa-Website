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
