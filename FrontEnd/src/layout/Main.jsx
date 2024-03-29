// Main.jsx

import React from "react";
import BookingPage from "../pages/Booking/BookingPage";
import Restaurant from "../pages/restaurant/Restaurant";
import Home from "../pages/landing/Home";
import Room from "../pages/rooms/Room";
import Event from "../pages/event/Event";
import AdultsActivitiesPage from "../pages/Activities/Adults/AdultsActivitiesPage";
import KidsActivitiesPage from "../pages/Activities/Kids/KidsActivities";
import GalleryPage from "../pages/Gallery/GalleryPage";
import AboutUs from "../pages/AboutUs/AboutUs";
import { Route, Routes } from "react-router-dom";
import Contact from "../pages/contact/Contact";
import Meeting from "../pages/Meetings/Meeting";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import AllActivitiesPage from "../pages/Activities/All/AllActivitiesPage";

const Main = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/room" element={<Room />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/activities/adult" element={<AdultsActivitiesPage />} />
        <Route path="/activities/kid" element={<KidsActivitiesPage />} />
        <Route path="/activities" element={<AllActivitiesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/meetings" element={<Meeting />} />
        <Route path="/event" element={<Event />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Main;
