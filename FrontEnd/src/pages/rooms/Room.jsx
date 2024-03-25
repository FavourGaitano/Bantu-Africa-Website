import React from "react";
import "./rooms.scss";
// import Navbar from "../../components/shared/Navbar";
// import Carousel from "../../components/shared/Carousel";
import RoomImageCard from "../../components/rooms/RoomImageCard";
import RoomCard from "../../components/rooms/RoomCard";
import Button from "../../components/shared/Button";
import SuperiorRoomImg from "../../assets/roomWFlowers.jpg";
import LazyLoad from "react-lazyload";
import Hero from "../../components/rooms/Hero";
import { useGetRoomsByNameQuery, useGetRoomsQuery } from "../../features/rooms/roomApi";
import { useParams } from "react-router-dom";

const Room = () => {
  const Name=useParams()
  const{data:rooms}=useGetRoomsQuery();
  const {data: categoryRooms}=useGetRoomsByNameQuery(Name)
  console.log("category rooms",categoryRooms);
  // console.log("rooms",rooms);
  return (
    <div className="room-container">
      {/* <Navbar /> */}
      <div className="room-hero">
      <Hero className="hero-img" msg="ROOMS & SUITES" heroImgUrl={SuperiorRoomImg} />
      </div>
     <main className="room-main-container">
     <section className="main-content">
      {
        rooms && rooms.map((room)=>(
          <div className="room-deluxe-content" key={room.RoomId}>
          
          <div className="room-items">
            <h2 style={{color:"var(--primary-color)"}}>{room.Name}</h2>
            <h2 style={{color:"var(--primary-color)"}}>Room Number{room.RoomNumber}</h2>
            <div className="room-desc">
              <RoomCard desc={room.Description}/>
            </div>
            <div className="room-find-more-btn">
              <Button msg="Find Out More" />
            </div>
          </div>
          <LazyLoad height={200} once>
          <div className="slide-from-left2">
            <RoomImageCard roomImg={room.RoomPhotoUrl} />
          </div>
          </LazyLoad>

        </div>
        ))
      }
        
        
      </section>
      {/* <section className="main-content">
        <div className="room-superior-content">
        <LazyLoad height={200} once>
          <div className="slide-from-left">
            <RoomImageCard roomImg={SuperiorRoomImg} />
          </div>
          </LazyLoad>
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
          <LazyLoad height={200} once>
          <div className="slide-from-left2">
            <RoomImageCard roomImg={SuperiorRoomImg} />
          </div>
          </LazyLoad>
        </div>
      </section> */}
     </main>
    
    </div>
  );
};

export default Room;
