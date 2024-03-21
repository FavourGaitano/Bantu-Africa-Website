import React from "react";
import Carousel from "../../components/shared/Carousel";
import "./home.scss";
import Carousel2 from "../../components/shared/Carousel2";
import Navbar from "../../components/shared/Navbar";
import MarketingCards from "../../components/shared/MarketingCards";
import SpecialOffers from "../../components/home/SpecialOffers";
import Footer from "../../components/shared/Footer";
import Map from "../../components/home/Map";

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Carousel />
      <MarketingCards />
      <SpecialOffers />
      <Map />
      <Footer />
    </div>
  );
};

export default Home;
