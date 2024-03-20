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
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [photo, setPhoto] = useState(photoArray);

  const prevSlide = () => {
    setCurrentPhoto((oldPhoto) => {
      const result = (oldPhoto - 1 + photo.length) % photo.length;
      return result;
    });
  };

  const nextSlide = () => {
    setCurrentPhoto((oldPhoto) => {
      const result = (oldPhoto + 1) % photo.length;
      return result;
    });
  };

  //To make the carousel self-scrolling
  useEffect(() => {
    let carouselId = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(carouselId);
    };
  }, [currentPhoto]);

  return (
    <div className="carousel-container">
      {photoArray &&
        photoArray.map((photo, index) => (
          <div
            className="carousel-photo"
            style={{
              transform: `translateX(${100 * (index - currentPhoto)}%)`,
              opacity: index === currentPhoto ? 1 : 0,
              visibility: index === currentPhoto ? "visible" : "hidden",
            }}
            key={index}
          >
            <button onClick={prevSlide} className="left">
              <img src={prev} alt="prev-icon" />
            </button>
            <img src={photo} alt="slider-image" />
            <button onClick={nextSlide} className="right">
              <img src={next} alt="next-icon" />
            </button>
          </div>
        ))}
    </div>
  );
};

export default Carousel;
