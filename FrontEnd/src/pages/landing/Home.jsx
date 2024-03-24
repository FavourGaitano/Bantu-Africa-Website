import React from "react";
import Carousel from "../../components/shared/Carousel";
import "./home.scss";
import Carousel2 from "../../components/shared/Carousel2";
import Navbar from "../../components/shared/Navbar";
import MarketingCards from "../../components/shared/MarketingCards";
import SpecialOffers from "../../components/home/SpecialOffers";
import Footer from "../../components/shared/Footer";
import Map from "../../components/home/Map";
import OtherServices from "../../components/OtherServices/OtherServices";

const Home = () => {
  return (
    <div className="home-page">

      <Carousel />
      <MarketingCards />
      {/* <SpecialOffers /> */}
      <OtherServices />
      <Map />
     
    </div>
  );
};

export default Home;
