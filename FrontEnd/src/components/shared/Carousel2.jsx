import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import burger from "../../assets/burger.jpg";
import cocktails from "../../assets/cocktails.jpg";
import foodPlatter from "../../assets/foodPlatter.jpg";
import fruitPlater from "../../assets/fruitPlatter.jpg";
import room from "../../assets/roomWFlowers.jpg";
import prev from "../../assets/chevron-left.png";
import next from "../../assets/chevron-right.png";

import "swiper/css";

const Carousel2 = ({ slides }) => {
  const photoArray = [burger, cocktails, foodPlatter, fruitPlater, room];
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide-change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img src={burger} alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={cocktails} alt="" />
      </SwiperSlide>
      {/* <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      
      {photoArray &&
        photoArray.map((photo, index) => {
          <SwiperSlide key={index}>
            {console.log(photo)}
            <img src={photo} alt="" />
          </SwiperSlide>;
        })} */}
    </Swiper>
  );
};

export default Carousel2;
