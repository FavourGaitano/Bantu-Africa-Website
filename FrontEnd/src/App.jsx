import "./App.scss";
import AboutUs from "./pages/AboutUs/AboutUs";
import Restaurant from "./pages/restaurant/Restaurant";
import Home from "./pages/landing/Home";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";

function App() {
  return (
    <div className="main-app">
      {/* <h2>This is our main entry file</h2> */}
      {/* <Restaurant /> */}
      {/* <Home /> */}
      {/* <AdminSidebar /> */}
      <AboutUs />
    </div>
  );
}

export default App;
