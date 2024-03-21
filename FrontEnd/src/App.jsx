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
      {/* <Room /> */}
      {/* <Restaurant /> */}
      {/* <Event /> */}
      {/* <AdminSidebar /> */}
      {/* <AboutUs /> */}
      <Meeting />
    </div>
  );
}

export default App;
