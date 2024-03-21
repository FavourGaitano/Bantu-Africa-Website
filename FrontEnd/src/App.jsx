
import Home from "./pages/landing/Home";
import AdminSidebar from './components/AdminSidebar/AdminSidebar'
import ContactUsForm from './components/ContactUsForm/ContactUsForm';
import Event from './pages/event/Event';
import AboutUs from './pages/AboutUs/AboutUs';
import Gallery from './pages/Gallery/GalleryPage';
import Restaurant from './pages/restaurant/Restaurant';
import AdultsActivitiesPage from './pages/Activities/Adults/AdultsActivitiesPage';
import AdminLogin from "./components/AdminLogin/AdminLogin";

function App() {
  return (
    <div className="main-app">

      {/* <Home /> */}
      {/* <Room/> */}
      {/* <Restaurant /> */}
      {/* <Event/> */}
      {/* <AdminSidebar /> */}
      {/* <ContactUsForm/> */}
      {/* <AboutUs /> */}
      {/* <Gallery /> */}
      {/* <AdultsActivitiesPage /> */}
      <AdminLogin/>
    </div>
  );
}

export default App;
