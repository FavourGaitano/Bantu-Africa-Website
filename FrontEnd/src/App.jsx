import "./App.scss";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Main from "./layout/Main";
import { Route, Routes } from "react-router-dom";
import AllActivitiesPage from "./pages/Activities/All/AllActivitiesPage";
import KidsActivitiesPage from "./pages/Activities/Kids/KidsActivities";
import AdultsActivitiesPage from "./pages/Activities/Adults/AdultsActivitiesPage";

function App() {
  return (
    <div className="main-app">
      <Navbar />
      <Routes>
        <Route path="*" element={<Main />} />
      </Routes>
      {/* <AllActivitiesPage /> */}
      {/* <KidsActivitiesPage /> */}
      {/* <AdultsActivitiesPage /> */}
      <Footer />

      {/* <AdminLogin/>
      <AboutUs /> */}
    </div>
  );
}

export default App;
