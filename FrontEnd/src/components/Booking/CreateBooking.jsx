import React, { useState } from 'react';
import Calender from '../Calender/Calender';
import './CreateBooking.scss';
import GuestSelector from './GuestSelector'; 
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateBooking = () => {
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedBedType, setSelectedBedType] = useState('');
  const [selectedMealPlan, setSelectedMealPlan] = useState('');
  const [guestSelectorOpen, setGuestSelectorOpen] = useState(false);
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);

  const schema = yup.object().shape({
    Name: yup.string().required("Name is required"),
    size: yup.string().required("size is required"),
    MealPlan: yup.string().required("meal plan is required")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRoomTypeChange = (roomType) => {
    setSelectedRoomType(roomType);
    setSelectedBedType('');
  };

  const handleMealPlanSelect = (e) => {
    setSelectedMealPlan(e.target.value);
    setGuestSelectorOpen(true);
  };

  const handleCheckinDateSelect = (date) => {
    setCheckinDate(date);
    console.log("date is", date);
  };
  const handleCheckoutDateSelect = (date) => {
    setCheckoutDate(date);
    console.log("Checkout date is", date);
  };

  const bookRoom = () => {
    // console.log(Name:e.target[0].value);
  }

  return (
    <>
      <form className="select" onSubmit={handleSubmit(bookRoom)}>
        <div className="select-navbar">
          <div className="list">
            {/* Room Type */}
            <select value={selectedRoomType} {...register("Name")}  onChange={(e) => handleRoomTypeChange(e.target.value)}>
              <option value="">Room Type</option>
              <option  value="Standard">Standard</option>
              <option value="Superior">Superior</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Presidential">Presidential</option>
            </select>
            {selectedRoomType && (
              <select value={selectedBedType} {...register("Size")} onChange={(e) => setSelectedBedType(e.target.value)}>
                <option value="">Bed Type</option>
                {selectedRoomType === 'Standard' && (
                  <>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                  </>
                )}
                {selectedRoomType === 'Superior' && (
                  <>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="Twin">Twin</option>
                    <option value="Triple">Triple</option>
                  </>
                )}
                {selectedRoomType === 'Deluxe' && (
                  <>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                    <option value="HMoon">H/moon</option>
                    <option value="FRoom">F/Room</option>
                  </>
                )}
              </select>
            )}
             {selectedBedType && (
              <select value={selectedMealPlan} {...register("MealPlan")} onChange={handleMealPlanSelect}>
                <option value="">Meal Plan</option>
                {selectedBedType === 'Double' && (
                  <>
                  <option value="BB">BB</option>
                  <option value="HB">HB</option>
                  <option value="FB">FB</option>
                </>
                )}
                {selectedBedType === 'Single' && (
                    <>
                    <option value="BB">BB</option>
                    <option value="HB">HB</option>
                    <option value="FB">FB</option>
                  </>
                )}
                 {selectedBedType === 'Twin' && (
                    <>
                    <option value="BB">BB</option>
                    <option value="HB">HB</option>
                    <option value="FB">FB</option>
                  </>
                )}
                  {selectedBedType === 'Triple' && (
                  <>
                  <option value="BB">BB</option>
                  <option value="HB">HB</option>
                  <option value="FB">FB</option>
                </>
                )}
                   {selectedBedType === 'HMoon' && (
                    <>
                    <option value="BB">BB</option>
                    <option value="HB">HB</option>
                    <option value="FB">FB</option>
                  </>
                )}
                    {selectedBedType === 'FRoom' && (
                   <>
                   <option value="BB">BB</option>
                   <option value="HB">HB</option>
                   <option value="FB">FB</option>
                 </>
                )}
             
              </select>
            )}
          </div>
          <div className="list">
            <div className="guest-selector-container">
              <button type='button' onClick={() => setGuestSelectorOpen(!guestSelectorOpen)}>Guest</button>
              {guestSelectorOpen && <div className="guest-selector-modal"><GuestSelector  /></div>}
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
        <Calender onDateSelect={handleCheckinDateSelect} onCheckoutDateSelect={handleCheckoutDateSelect} />
        <div className="button-container">
            <button type='button'
              className="confirm-button"
              onClick={() => console.log("Confirmed")}
            >
              Book
            </button>
          </div>
      </form>
    </>
  );
};

export default CreateBooking;
