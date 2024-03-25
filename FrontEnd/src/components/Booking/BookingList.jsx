import React from "react";
import "./BookingList.scss";

const BookingList = (data) => {
  console.log("Data passed is: ", data);
  return (
    <div className="stay">
      <h2>Your Stay</h2>
      <div className="check">
        <div className="check-in">
          <h3>Check In</h3>
          <div className="checkin-date">
            {data.data ? data.data.checkinDate : "--"}
          </div>
        </div>
        <div className="check-out">
          <h3>Check Out</h3>
          <div className="checkout-date">
            {data.data ? data.data.checkoutDate : "--"}
          </div>
        </div>
      </div>
      <div className="details">
        <div className="people-no">
          <span>
            <h5>Guests:</h5>
            <p>
              {data.data
                ? `${data.data.adults} Adults, ${data.data.kids} Kids`
                : "--"}
            </p>
          </span>
        </div>

        <div className="total">
          <h3>Total:</h3>
          <div className="amount">KESH 40, 209</div>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
