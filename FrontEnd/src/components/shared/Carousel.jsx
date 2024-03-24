import React, { useState, useEffect } from "react";
import burger from "../../assets/burger.jpg";
import cocktails from "../../assets/cocktails.jpg";
import foodPlatter from "../../assets/foodPlatter.jpg";
import fruitPlater from "../../assets/fruitPlatter.jpg";
import room from "../../assets/roomWFlowers.jpg";
import prev from "../../assets/chevron-left.png";
import next from "../../assets/chevron-right.png";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "./carousel.scss";

const Carousel = () => {
  const photoArray = [burger, cocktails, foodPlatter, fruitPlater, room];
  const photoArray2 = [
    {
      link: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      link: "https://images.unsplash.com/photo-1438029071396-1e831a7fa6d8?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      link: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      link: "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      link: "https://plus.unsplash.com/premium_photo-1661810803959-f91f5195138e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [photo, setPhoto] = useState(photoArray2);

  const prevSlide = () => {
    setCurrentPhoto((oldPhoto) => {
      const result = (oldPhoto - 1 + photo.length) % photo.length;
      return result;
    });
  };

  const nextSlide = () => {
    // console.log("Clicked!");
    setCurrentPhoto((oldPhoto) => {
      const result = (oldPhoto + 1) % photo.length;
      return result;
    });
  };

  //To make the carousel self-scrolling
  useEffect(() => {
    let carouselId = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => {
      clearInterval(carouselId);
    };
  }, [currentPhoto]);

  return (
    <div className="carousel-container">
      {photoArray2 &&
        photoArray2.map((photo, index) => (
          <div
            className={`carousel-photo ${
              index === currentPhoto ? "active" : ""
            }`}
            key={index}
          >
            <img src={photo.link} alt="slider-image" loading="lazy" />
            {/* <div className="buttons">
              <button onClick={prevSlide} className="left">
                <img src={prev} alt="prev-icon" />
              </button>
              <button onClick={nextSlide} className="right">
                <img src={next} alt="next-icon" />
              </button>
            </div> */}
          </div>
        ))}
    </div>
  );
};

export default Carousel;
