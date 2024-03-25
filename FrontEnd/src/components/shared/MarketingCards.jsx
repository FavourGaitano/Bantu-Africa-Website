import React from "react";
import "./marketingCards.scss";
// import accom from "../../assets/accommodation.jpg";
import bed from "../../assets/bed.jpg";
import food from "../../assets/foodPlatter.jpg";
import { useGetServicesQuery } from "../../features/services/servicesApi";
import { ErrorToast, LoadingToast } from "./Toaster";
import { useNavigate } from "react-router-dom";

const MarketingCards = () => {
  const { data, error, isError, Loading, isLoading } = useGetServicesQuery();
  const links = ["/restaurant", "/room", "/activities/adult"];
  const navigate = useNavigate();

  const scrollToTopAndNavigate = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  if (Loading || isLoading) {
    return LoadingToast();
  }

  if (error || isError || !data) {
    LoadingToast(false);
    return ErrorToast("No Services Available");
  }

  return (
    <div className="cards">
      {LoadingToast(false)}
      {data &&
        data.map((item, index) => (
          <div
            className="card"
            key={index}
            style={{
              display: "flex",
              flexDirection: index % 2 == 0 ? "row" : "row-reverse",
            }}
          >
            <div className="image">
              <img src={item.ImageUrl} alt="no-img" loading="lazy" />
            </div>
            <div className="desc">
              <h4>{item.ServiceName}</h4>
              <p>{item.Description}</p>
              <button onClick={() => scrollToTopAndNavigate(`${links[index]}`)}>
                FIND OUT MORE
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MarketingCards;
