
import './App.scss'
import BookingPage from './pages/Booking/BookingPage';
import Restaurant from './pages/restaurant/Restaurant'
// import Home from "./pages/landing/Home";
import ContactUsForm from './components/ContactUsForm/ContactUsForm';
import Home from "./pages/landing/Home";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";
import AboutUs from "./pages/AboutUs/AboutUs";
import Event from "./pages/event/Event";
import Room from "./pages/rooms/Room";
import Meeting from "./pages/Meetings/Meeting";

function App() {
  return (
    <div className="main-app">

      {/* <Home /> */}
      {/* <Room/> */}
      {/* <Restaurant /> */}
  <Event/>

      {/* <AdminSidebar /> */}
      <AboutUs />
    </div>
  );
}

export default App;
