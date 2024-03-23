import React from "react";
import copyright from "../../assets/copyright.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./footer.scss";

const Footer = () => {
  const schema = yup.object().shape({
    Name: yup.string().required("Please provide your name"),
    Email: yup.string().required("Please provide your Email"),
    Description: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
            <span>Rooms & Suites</span>
            <span>Restaurants</span>
            <span>Activities</span>
            <span>Meetings & Events</span>
            <span>Gallery</span>
            <span>About Us</span>
          </div>
          <div className="card three">
            <h4>STAY IN TOUCH</h4>
            <input type="text" />
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
