import React from "react";
import Carousel from "../../components/shared/Carousel";
import "./home.scss";
import Carousel2 from "../../components/shared/Carousel2";
import Navbar from "../../components/shared/Navbar";

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Carousel />
    </div>
  );
};

export default Home;
