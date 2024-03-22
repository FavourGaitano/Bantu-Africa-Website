import "./App.scss";
import BookingPage from "./pages/Booking/BookingPage";
import Restaurant from "./pages/restaurant/Restaurant";
import Home from "./pages/landing/Home";
import ContactUsForm from "./components/ContactUsForm/ContactUsForm";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";
import AboutUs from "./pages/AboutUs/AboutUs";
import Event from "./pages/event/Event";
import Room from "./pages/rooms/Room";
import Meeting from "./pages/Meetings/Meeting";
import AdminLogin from "./components/AdminLogin/AdminLogin";

function App() {
  return (
    <div className="main-app">
      <Home />
      {/* <Room/> */}
      {/* <Restaurant /> */}
      {/* <Event />
      <AdminSidebar /> */}
      {/* <ContactUsForm/> */}
      {/* <AboutUs /> */}
      {/* <Gallery /> */}
      {/* <AdultsActivitiesPage /> */}
      {/* <AdminLogin />
      <AboutUs /> */}
    </div>
  );
}

export default App;
