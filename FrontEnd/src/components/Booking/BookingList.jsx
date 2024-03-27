import React, { useEffect, useState } from "react";
import "./BookingList.scss";
import { useGetPriceOfBookingMutation } from "../../features/bookings/bookingsApi";
import { ErrorToast } from "../shared/Toaster";

const BookingList = ({ data }) => {
  const [price, setPrice] = useState(0);
  const [getPriceOfBooking, { isLoading, isError }] =
    useGetPriceOfBookingMutation();

  const checkinDate = new Date(data.checkinDate);
  const checkoutDate = new Date(data.checkoutDate);

  const differenceInMs = checkoutDate - checkinDate;
  const daysStayed = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  // console.log("Days stayed: ", typeof daysStayed);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const bookingInfo = {
          Name: data.selectedRoomType,
          Size: data.selectedBedType,
          MealPlan: data.selectedMealPlan,
        };

        const price = await getPriceOfBooking(bookingInfo).unwrap();
        // console.log("Price is: ", typeof price);
        if (!price.message) {
          setPrice(price.price * daysStayed);
        } else {
          return ErrorToast(
            "Error fetching room details. Please try again later"
          );
        }
      } catch (error) {
        // console.log(error);
        return ErrorToast(
          "Sorry, our systems are under maintenance at the moment. Please try again later."
        );
      }
    };

    if (data) {
      fetchPrice();
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching price...</div>;
  }
  return (
    <div className="stay">
      {/* {console.log("Total cost: ", price)} */}
      <h2>Your Stay</h2>
      <div className="check">
        <div className="check-in">
          <h3>Check In</h3>
          <div className="checkin-date">{data ? data.checkinDate : "--"}</div>
        </div>
        <div className="check-out">
          <h3>Check Out</h3>
          <div className="checkout-date">{data ? data.checkoutDate : "--"}</div>
        </div>
      </div>
      <div className="details">
        <div className="people-no">
          <span>
            <h5>Guests:</h5>
            <p>{data ? `${data.adults} Adults, ${data.kids} Kids` : "--"}</p>
          </span>
        </div>

        <div className="total">
          <h3>Total:</h3>
          <div className="amount">{price ? `KES ${price}` : "--"}</div>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
