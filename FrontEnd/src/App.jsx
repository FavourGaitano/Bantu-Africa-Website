
import "./App.scss";
import Event from "./pages/event/Event";
// import Home from "./pages/landing/Home";
import Room from "./pages/rooms/Room";
// import Restaurant from './pages/restaurant/Restaurant'

import './App.scss'
import Restaurant from './pages/restaurant/Restaurant'
import Home from "./pages/landing/Home";
import AdminSidebar from './components/AdminSidebar/AdminSidebar'

function App() {
  return (
    <div className="main-app">

      {/* <Home /> */}
      {/* <Room/> */}
      {/* <Restaurant /> */}
  <Event/>

      {/* <AdminSidebar /> */}
    </div>
  );
}

export default App;
