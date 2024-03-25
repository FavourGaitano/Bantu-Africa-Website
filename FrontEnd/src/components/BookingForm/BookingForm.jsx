import React from "react";
import "./BookingForm.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateBookingMutation } from "../../features/bookings/bookingsApi";
import { ErrorToast, LoadingToast, SuccessToast } from "../shared/Toaster";
import { useNavigate } from "react-router-dom";

const BookingForm = (roomBookedData) => {
  const navigate = useNavigate();
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const schema = yup.object().shape({
    FirstName: yup.string().required("FirstName is required"),
    LastName: yup.string().required("LastName is required"),
    Email: yup.string().email().required("Email is required"),
    SpecialRequirements: yup.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      SpecialRequirements: "None",
    },
  });

  const onSubmit = async (data) => {
    const {
      adults: AdultsNo,
      checkinDate: StartDate,
      checkoutDate: EndDate,
      kids: KidsNo,
      selectedBedType: Size,
      selectedMealPlan: MealPlan,
      selectedRoomType: Name,
    } = roomBookedData.data;
    console.log("Booking data received: ", roomBookedData.data);

    try {
      LoadingToast();

      const newBooking = {
        ...data,
        AdultsNo,
        StartDate,
        EndDate,
        KidsNo,
        Size,
        MealPlan,
        Name,
      };
      //   console.log("Form data is: ", newBooking);
      const response = await createBooking(newBooking).unwrap();
      console.log("Response ni: ", response);
      LoadingToast(false);
      SuccessToast(response.message);
      reset();
    } catch (error) {
      ErrorToast(error?.data?.message);
      console.log("Creation Error: ", error);
      return (
        <div>
          <h4>Oops, an error occured!</h4>
        </div>
      );
    }
  };

  if (isLoading) {
    return LoadingToast();
  }
  return (
    <div className="BookingForm">
      {LoadingToast(false)}
      <form className="form client-details" onSubmit={handleSubmit(onSubmit)}>
        <p className="title">Book Now</p>
        <p className="message">
          Book Now for a memorable and luxurious stay at Bantu Africa Resort.{" "}
        </p>
        <div className="flex">
          <label>
            <input
              required=""
              placeholder=""
              type="text"
              className="input"
              id="input0"
              {...register("FirstName")}
            />
            <span>Firstname</span>
          </label>
          <p className="errors">{errors.FirstName?.message}</p>

          <label className="label">
            <input
              required=""
              placeholder=""
              type="text"
              className="input"
              id="input0"
              {...register("LastName")}
            />
            <span>Lastname</span>
          </label>
          <p className="errors">{errors.LastName?.message}</p>
        </div>

        <label>
          <input
            required=""
            placeholder=""
            type="email"
            className="input"
            {...register("Email")}
          />
          <span>Email</span>
        </label>
        <p className="errors">{errors.Email?.message}</p>
        <label htmlFor="SpecialRequirements">
          <textarea
            name="special-reqs"
            id="special-reqs"
            className="input"
            cols="30"
            rows="10"
            {...register("SpecialRequirements")}
          ></textarea>
          <span>Special Requests</span>
        </label>
        <p>{errors.SpecialRequirements?.message}</p>
        <button className="submit" type="submit">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
