import React from "react";
import copyright from "../../assets/copyright.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./footer.scss";
import { ErrorToast, LoadingToast, SuccessToast } from "./Toaster";
import { useAddInquiryMutation } from "../../features/inquiries/inquiryApi.js";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTopAndNavigate = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const [addInquiry, { isLoading }] = useAddInquiryMutation();
  const schema = yup.object().shape({
    Name: yup.string().required("Please provide your name"),
    Email: yup.string().required("Please provide your Email"),
    Description: yup.string().required("Please describe your request"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      LoadingToast(true);
      const response = await addInquiry(data).unwrap();
      console.log("Inquiry res:", response);
      if (!response.error) {
        LoadingToast(false);
        SuccessToast("Inquiry sent successfully");
        reset();
      } else {
        ErrorToast("Error sending inquiry. Please try again later.");
        reset();
      }
    } catch (error) {
      LoadingToast(false);
      ErrorToast("An error occurred. Please try again later.");
    }
  };

  if (isLoading) {
    return <div>{LoadingToast(true)}</div>;
  }
  return (
    <div className="footer">
      <div className="content">
        <div className="cards">
          <div className="card one">
            <h4>BANTU AFRICA</h4>
            <p>
              Lying quietly on the picturesque foothills of Mt. Kenya is the
              Bantu Africa Resort, a solution for entertainment, tantalizing
              cuisine, meeting and conference destination, and accommodation at
              the height of luxury. The resort features beautifully landscaped
              gardens, choice amenities, fun activities for all age groups, and
              jaw-dropping views of the lovely countryside flanked by Mounts
              Kenya and Aberdares.
            </p>
          </div>
          <div className="card two">
            <h4>QUICK LINKS</h4>
            <span onClick={() => scrollToTopAndNavigate("/room")}>
              Rooms & Suites
            </span>
            <span onClick={() => scrollToTopAndNavigate("/restaurant")}>
              Restaurants
            </span>
            <span onClick={() => scrollToTopAndNavigate("/activities/adult")}>
              Activities
            </span>
            <span onClick={() => scrollToTopAndNavigate("/event")}>
              Meetings & Events
            </span>
            <span onClick={() => scrollToTopAndNavigate("/gallery")}>
              Gallery
            </span>
            <span onClick={() => scrollToTopAndNavigate("/about")}>
              About Us
            </span>
          </div>
          <div className="card three">
            <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
              <h4>GET IN TOUCH</h4>
              <input
                type="text"
                name="Name"
                id="Name"
                placeholder="Enter your name..."
                {...register("Name")}
              />
              <p>{errors.Name?.message}</p>
              <input
                type="email"
                name="Email"
                id="Email"
                placeholder="Enter your email..."
                {...register("Email")}
              />
              <p>{errors.Email?.message}</p>
              <textarea
                type="text"
                name="Description"
                id="Description"
                placeholder="Enter your inquiry..."
                {...register("Description")}
              />
              <p>{errors.Description?.message}</p>
              <input type="submit" value="Send" className="submit" />
            </form>
          </div>
          <div className="card four">
            <h4>CONTACT US</h4>
            <p>Nyeri, Kenya</p>
            <p>Tel: +254 768 497 841/2</p>
            <p>WhatsApp: +254 768 497 840</p>
            <p>reservations@bantuafrica.co.ke</p>
          </div>
        </div>
        <div className="copyright">
          <p>
            Copyright{" "}
            <span>
              <img src={copyright} alt="" />
            </span>
            2024. Developed by Teach2Give.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
