import React from "react";
import "./rooms.scss";
import Navbar from "../../components/shared/Navbar";
import Carousel from "../../components/shared/Carousel";
import RoomImageCard from "../../components/rooms/RoomImageCard";
import RoomCard from "../../components/rooms/RoomCard";
import Button from "../../components/shared/Button";
import SuperiorRoomImg from "../../assets/roomWFlowers.jpg";

const Room = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
     <main className="room-main-container">
     <section className="main-content">
        <div className="room-superior-content">
          <div className="room-photo">
            <RoomImageCard roomImg={SuperiorRoomImg} />
          </div>
          <div className="room-items">
            <h2 style={{color:"var(--primary-color)"}}>SUPERIOR</h2>
            <div className="room-desc">
              <RoomCard />
            </div>
            <div className="room-find-more-btn">
              <Button msg="Find Out More" />
            </div>
          </div>
        </div>
        <div className="room-deluxe-content">
          
          <div className="room-items">
            <h2 style={{color:"var(--primary-color)"}}>DELUXE</h2>
            <div className="room-desc">
              <RoomCard />
            </div>
            <div className="room-find-more-btn">
              <Button msg="Find Out More" />
            </div>
          </div>
          <div className="room-photo">
            <RoomImageCard roomImg={SuperiorRoomImg} />
          </div>
        </div>
      </section>
      <section className="main-content">
        <div className="room-superior-content">
          <div className="room-photo">
            <RoomImageCard roomImg={SuperiorRoomImg} />
          </div>
          <div className="room-items">
            <h2 style={{color:"var(--primary-color)"}}>PRESIDENTIAL</h2>
            <div className="room-desc">
              <RoomCard />
            </div>
            <div className="room-find-more-btn">
              <Button msg="Find Out More" />
            </div>
          </div>
        </div>
        <div className="room-deluxe-content">
          
          <div className="room-items">
            <h2 style={{color:"var(--primary-color)"}}>STANDARD</h2>
            <div className="room-desc">
              <RoomCard />
            </div>
            <div className="room-find-more-btn">
              <Button msg="Find Out More" />
            </div>
          </div>
          <div className="room-photo">
            <RoomImageCard roomImg={SuperiorRoomImg} />
          </div>
        </div>
      </section>
     </main>
    
    </div>
  );
};

export default Room;
