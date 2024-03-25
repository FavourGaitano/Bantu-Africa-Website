import React, { useEffect, useState } from "react";
import Carousel from "../../components/shared/Carousel";
import "./home.scss";
import Carousel2 from "../../components/shared/Carousel2";
import Navbar from "../../components/shared/Navbar";
import MarketingCards from "../../components/shared/MarketingCards";
import SpecialOffers from "../../components/home/SpecialOffers";
import Footer from "../../components/shared/Footer";
import Map from "../../components/home/Map";
import OtherServices from "../../components/OtherServices/OtherServices";
import Offers from "../../components/Offers/Offers";

const Home = () => {
  const [showOffersModal, setShowOffersModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOffersModal(true);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup function to clear the timeout if component unmounts
  }, []);

  const handleCloseModal = () => {
    setShowOffersModal(false);
  };

  return (
    <div className="home-page">
      <div className={`modal-background ${showOffersModal ? "show" : ""}`}>
        <button className="close-icon" onClick={handleCloseModal}>
          X
        </button>
        <div className="modal-content">{showOffersModal && <Offers />}</div>
      </div>
      <Carousel />
      <MarketingCards />
      <SpecialOffers />
      {/* <OtherServices /> */}
      <Map />
    </div>
  );
};

export default Home;
