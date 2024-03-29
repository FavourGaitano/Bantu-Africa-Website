import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminRoomPage from "../adminpages/rooms/AdminRoomPage";
import "./AdminDashboardRoutes.scss";
import AdminBookingPage from "../adminpages/booking/AdminBookingPage";
import AdminEventPage from "../adminpages/events/AdminEventPage";
import AdminMeetingPage from "../adminpages/meetings/AdminMeetingPage";
import AdminRestarauntPage from "../adminpages/restaraunt/AdminRestarauntPage";
import AdminGalleryPage from "../adminpages/gallery/AdminGalleryPage";
import AdminServicesPage from "../adminpages/services/AdminServicesPage";
import AdminOtherServicesPage from "../adminpages/otherservices/AdminOtherServicesPage";
import AdminInquriesPage from "../adminpages/inquery/AdminInquriesPage";
import AdminActivitiesPage from "../adminpages/activities/AdminActivitiesPage";
import AdminOffersPage from "../adminpages/offers/AdminOffersPage";
import AdminDashboardPage from "../adminpages/userdashboard/AdminDashboardPage";
import AddRoom from "../components/adminroom/AddRoom";
import ViewRoomPage from "../components/adminroom/ViewRoomCategory";
import AdminMenuPages from "../adminpages/menu/AdminMenuPages";
import AdminOffers from "../adminpages/RestaurantOffers/AdminOffers";
import AdminCreateBooking from "../adminpages/booking/AdminCreateBooking";

const AdminDashboardRoutes = () => {
  return (
    <div className="admin-navigation">
      <div className="admin-navbar-route">
        <AdminNavbar />
      </div>
      <div className="admin-main-bottom-content">
        <div className="admin-sidebar-routes">
          <AdminSidebar />
        </div>
        <div className="admin-main-pages-content">
          <Routes>
            <Route path="/dash" element={<AdminDashboardPage />} />
            <Route path="/room" element={<AdminRoomPage />} />
            <Route path="/booking" element={<AdminBookingPage />} />
            <Route path="/addbooking" element={<AdminCreateBooking />} />
            <Route path="/event" element={<AdminEventPage />} />
            <Route path="/meeting" element={<AdminMeetingPage />} />
            <Route path="/restaraunt" element={<AdminRestarauntPage />} />
            <Route path="/gallery" element={<AdminGalleryPage />} />
            <Route path="/services" element={<AdminServicesPage />} />
            <Route path="/otherservices" element={<AdminOtherServicesPage />} />
            <Route path="/inquery" element={<AdminInquriesPage />} />
            <Route path="/activities" element={<AdminActivitiesPage />} />
            <Route path="/offers" element={<AdminOffersPage />} />
            <Route path="/viewroom" element={<ViewRoomPage />} />
            <Route path="/addroom" element={<AddRoom />} />
            <Route path="/restaurant/menu" element={<AdminMenuPages />} />
            <Route
              path="/restaurant/restaurant-offers"
              element={<AdminOffers />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardRoutes;
