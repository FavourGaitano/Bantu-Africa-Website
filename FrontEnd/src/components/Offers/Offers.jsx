import React, { useState } from "react";
import { useGetOffersQuery } from "../../features/offers/offerApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Offers.scss";

const Offers = () => {
  const { data: offers, error, isLoading } = useGetOffersQuery();
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20px",
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <div className="slide-offers">
      <button className="close-button" onClick={handleCloseModal}>
        x
      </button>

      <Slider {...settings}>
        {offers.map((offer) => (
          <div key={offer.id}>
            <div className="offer-card">
              <img src={offer.OfferImageUrl} alt={`Offer ${offer.id}`} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Offers;
