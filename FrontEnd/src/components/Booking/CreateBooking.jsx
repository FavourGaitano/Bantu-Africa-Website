import React, { useState } from "react";
import Calender from "../Calender/Calender";
import "./CreateBooking.scss";
import GuestSelector from "./GuestSelector";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BookingForm from "../BookingForm/BookingForm";
import { useCreateBookingMutation } from "../../features/bookings/bookingsApi";
import BookingList from "./BookingList";

const CreateBooking = () => {
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedBedType, setSelectedBedType] = useState("");
  const [selectedMealPlan, setSelectedMealPlan] = useState("");
  const [guestSelectorOpen, setGuestSelectorOpen] = useState(false);
  const [checkinDate, setCheckinDate] = useState(new Date());
  const [checkoutDate, setCheckoutDate] = useState(new Date());
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [bookingData, setBookingData] = useState("");

  const schema = yup.object().shape({
    Name: yup.string().required("Name is required"),
    Size: yup.string().required("size is required"),
    MealPlan: yup.string().required("meal plan is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRoomTypeChange = (roomType) => {
    setSelectedRoomType(roomType);
    setSelectedBedType("");
  };

  const handleMealPlanSelect = (e) => {
    setSelectedMealPlan(e.target.value);
    setGuestSelectorOpen(true);
  };

  const handleCheckinDateSelect = (date) => {
    // console.log("passedDate", date);
    const checkIn = date.toLocaleDateString();
    setCheckinDate(checkIn);

    // console.log("date is", checkIn);
  };
  const handleCheckoutDateSelect = (date) => {
    // console.log("passedDate2: ", date);
    const checkOut = date.toLocaleDateString();
    setCheckoutDate(checkOut);
    // console.log("Checkout date is", checkOut);
  };

  const handleBooking = () => {
    const bookingInfo = {
      selectedRoomType,
      selectedBedType,
      selectedMealPlan,
      checkinDate,
      checkoutDate,
      adults,
      kids,
    };
    setBookingData(bookingInfo);
    reset();
  };

  return (
    <div className="create-booking">
      <form className="select" onSubmit={handleSubmit(handleBooking)}>
        <div className="select-navbar">
          <div className="list">
            <select
              value={selectedRoomType}
              name="Name"
              {...register("Name")}
              onChange={(e) => handleRoomTypeChange(e.target.value)}
            >
              <option value="Standard">Room Type</option>
              <option value="Standard">Standard</option>
              <option value="Superior">Superior</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Presidential">Presidential</option>
            </select>
            <p className="errors">{errors.Name?.message}</p>

            {selectedRoomType && (
              <select
                value={selectedBedType}
                name="Size"
                {...register("Size")}
                onChange={(e) => setSelectedBedType(e.target.value)}
              >
                <option value="Standard">Bed Type</option>
                {selectedRoomType === "Standard" && (
                  <>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                  </>
                )}
                {selectedRoomType === "Superior" && (
                  <>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Twin">Twin</option>
                    <option value="Triple">Triple</option>
                  </>
                )}
                {selectedRoomType === "Deluxe" && (
                  <>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="HMoon">H/moon</option>
                    <option value="FRoom">F/Room</option>
                  </>
                )}
              </select>
            )}
            <p className="errors">{errors.Size?.message}</p>

            {selectedBedType && (
              <select
                value={selectedMealPlan}
                name="MealPlan"
                {...register("MealPlan")}
                onChange={handleMealPlanSelect}
              >
                <option value="BB">Meal Plan</option>
                {selectedBedType === "Double" && (
                  <>
                    <option value="BB">BB</option>
                    <option value="HB">HB</option>
                    <option value="FB">FB</option>
                  </>
                )}
                {selectedBedType === "Single" && (
                  <>
                    <option value="BB">BB</option>
                    <option value="HB">HB</option>
                    <option value="FB">FB</option>
                  </>
                )}
                {selectedBedType === "Twin" && (
                  <>
                    <option value="BB">BB</option>
                    <option value="HB">HB</option>
                    <option value="FB">FB</option>
                  </>
                )}
                {selectedBedType === "Triple" && (
                  <>
                    <option value="BB">BB</option>
                    <option value="HB">HB</option>
                    <option value="FB">FB</option>
                  </>
                )}
                {selectedBedType === "HMoon" && (
                  <>
                    <option value="BB">BB</option>
                    <option value="HB">HB</option>
                    <option value="FB">FB</option>
                  </>
                )}
                {selectedBedType === "FRoom" && (
                  <>
                    <option value="BB">BB</option>
                    <option value="HB">HB</option>
                    <option value="FB">FB</option>
                  </>
                )}
              </select>
            )}
            <p className="errors">{errors.MealPlan?.message}</p>
          </div>
          <div className="list">
            <div className="guest-selector-container">
              <button
                type="button"
                onClick={() => setGuestSelectorOpen(!guestSelectorOpen)}
              >
                Guest
              </button>
              {guestSelectorOpen && (
                <div className="guest-selector-modal">
                  <GuestSelector
                    adults={adults}
                    kids={kids}
                    setGuestSelectorOpen={setGuestSelectorOpen}
                    setAdults={setAdults}
                    setKids={setKids}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="list">
            <div className="calendar-dropdown">
              <label className="input-group" htmlFor="checkIn">
                Check In
                <input type="text" value={checkinDate} />
              </label>
              <label className="input-group" htmlFor="checkout">
                Check Out
                <input type="text" value={checkoutDate} readOnly />
              </label>
            </div>
          </div>
        </div>
        <Calender
          onDateSelect={handleCheckinDateSelect}
          onCheckoutDateSelect={handleCheckoutDateSelect}
        />
        {console.log("CheckIn: ", checkinDate)}
        {console.log("CheckIn: ", checkinDate)}

        {console.log(handleCheckoutDateSelect)}
        <div className="button-container">
          <button type="submit" className="confirm-button">
            Book
          </button>
        </div>
      </form>
      <div className="personal-details">
        {bookingData && <BookingForm data={bookingData} />}
        {bookingData && <BookingList data={bookingData} />}
      </div>
    </div>
  );
};

export default CreateBooking;
