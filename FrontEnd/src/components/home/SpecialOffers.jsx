import React from "react";
import "./specialOffers.scss";
import { useGetOffersQuery } from "../../features/offers/offerApi";

const SpecialOffers = () => {
  const { data: offers, error, isLoading } = useGetOffersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="special-offers">
      <h3>Special Offers</h3>
      <div className="offers">
        {offers &&
          offers.map((offer, index) => (
            <div className="offer" key={index}>
              <img src={offer.OfferImageUrl} alt={`Offer ${index + 1}`} loading="lazy" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
