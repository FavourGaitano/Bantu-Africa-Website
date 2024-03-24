import "./App.scss";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Main from "./layout/Main";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import AllActivitiesPage from "./pages/Activities/All/AllActivitiesPage";
import KidsActivitiesPage from "./pages/Activities/Kids/KidsActivities";
import AdultsActivitiesPage from "./pages/Activities/Adults/AdultsActivitiesPage";

function App() {
  return (
    <div className="main-app">
      <Navbar />
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="/menu" element={<Menu/>} />
      </Routes>
      {/* <AllActivitiesPage /> */}
      {/* <KidsActivitiesPage /> */}
      {/* <AdultsActivitiesPage /> */}
      <Footer />

    </div>
  );
}

export default App;
