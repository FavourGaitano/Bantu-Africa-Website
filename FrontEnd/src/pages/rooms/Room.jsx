import React from "react";
import "./rooms.scss";
import RoomImageCard from "../../components/rooms/RoomImageCard";
import RoomCard from "../../components/rooms/RoomCard";
import Button from "../../components/shared/Button";
import SuperiorRoomImg from "../../assets/roomWFlowers.jpg";
import LazyLoad from "react-lazyload";
import Hero from "../../components/rooms/Hero";
import { useGetRoomsByNameQuery, useGetRoomsQuery } from "../../features/rooms/roomApi";

const Room = () => {

  const{data:rooms}=useGetRoomsQuery();
 
  const { data: deluxeCategory, isLoading: deluxeCategoryLoading, isError: deluxeCategoryError } = useGetRoomsByNameQuery("Deluxe");
  const { data: superiorCategory, isLoading:superiorCategoryLoading, isError:superiorCategoryError } = useGetRoomsByNameQuery("Superior");
  const { data: presidentialCategory, isLoading: presidentialCategoryLoading, isError: presidentialCategoryError } = useGetRoomsByNameQuery("Presidential");
  const { data: standardCategory, isLoading: standardCategoryLoading, isError: standardCategoryError } = useGetRoomsByNameQuery("Standard");
  // console.log("category rooms",categoryRooms);
  console.log("rooms",rooms);
  return (
    <div className="room-container">
      {/* <Navbar /> */}
      <div className="room-hero">
      <Hero className="hero-img" msg="ROOMS & SUITES" heroImgUrl={SuperiorRoomImg} />
      </div>
     <main className="room-main-container">
     <section className="main-content">
      {
        deluxeCategory && deluxeCategory.map((room)=>(
          <div className="room-deluxe-content" key={room.RoomId}>
          
          <div className="room-items">
            <h2 style={{color:"var(--primary-color)"}}>{room.Name}</h2>
            {/* <h2 style={{color:"var(--primary-color)"}}>Room Number{room.RoomNumber}</h2> */}
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
         {
  standardCategory && standardCategory.map((room)=>(
    <div className="room-superior-content" key={room.RoomId}>
    <LazyLoad height={200} once>
      <div className="slide-from-left">
        <RoomImageCard roomImg={room.RoomPhotoUrl} />
      </div>
      </LazyLoad>
      <div className="room-items">
        <h2 style={{color:"var(--primary-color)"}}>{room.Name}</h2>
        <div className="room-desc">
          <RoomCard  desc={room.Description}/>
        </div>
        <div className="room-find-more-btn">
          <Button msg="Find Out More" />
        </div>
      </div>
    </div>
  ))
 }
        
      </section>
      <section className="main-content">
 {
  superiorCategory && superiorCategory.map((room)=>(
    <div className="room-superior-content" key={room.RoomId}>
    <LazyLoad height={200} once>
      <div className="slide-from-left">
        <RoomImageCard roomImg={room.RoomPhotoUrl} />
      </div>
      </LazyLoad>
      <div className="room-items">
        <h2 style={{color:"var(--primary-color)"}}>{room.Name}</h2>
        <div className="room-desc">
          <RoomCard  desc={room.Description}/>
        </div>
        <div className="room-find-more-btn">
          <Button msg="Find Out More" />
        </div>
      </div>
    </div>
  ))
 }
    {
        presidentialCategory && presidentialCategory.map((room)=>(
          <div className="room-deluxe-content" key={room.RoomId}>
          
          <div className="room-items">
            <h2 style={{color:"var(--primary-color)"}}>{room.Name}</h2>
            {/* <h2 style={{color:"var(--primary-color)"}}>Room Number{room.RoomNumber}</h2> */}
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
     </main>
    
    </div>
  );
};

export default Room;
