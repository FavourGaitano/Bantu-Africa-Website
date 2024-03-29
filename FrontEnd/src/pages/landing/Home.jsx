import React, { useEffect, useState } from "react";
import Carousel from "../../components/shared/Carousel";
import "./home.scss";
import Carousel2 from "../../components/shared/Carousel2";
import Navbar from "../../components/shared/Navbar";
import MarketingCards from "../../components/shared/MarketingCards";
import Footer from "../../components/shared/Footer";
import Map from "../../components/home/Map";
import OtherServices from "../../components/OtherServices/OtherServices";
import Offers from "../../components/Offers/Offers";
import SpecialOffers from "../../components/home/SpecialOffers";

const Home = () => {
  const [showOffersModal, setShowOffersModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOffersModal(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseOffersModal = () => {
    setShowOffersModal(false);
  };

  return (
    <div className="home-page">
      <Carousel />
      <MarketingCards />
      <SpecialOffers />
      <Map />
      {/* {showOffersModal && (
        <div key="offers-modal" className="offers-modal-background">
          <div className="offers-modal-content">
            <Offers onClose={handleCloseOffersModal} />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Home;
