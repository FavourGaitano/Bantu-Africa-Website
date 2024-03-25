import "./App.scss";


import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import AllActivitiesPage from "./pages/Activities/All/AllActivitiesPage";
import KidsActivitiesPage from "./pages/Activities/Kids/KidsActivities";
import AdultsActivitiesPage from "./pages/Activities/Adults/AdultsActivitiesPage";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";
import Main from "./layout/Main";
import AdminRoute from "./layout/AdminRoute";

function App() {
  return (
    <div className="main-app">
      <Routes>
        <Route path="/*" element={<Main/>} />
        <Route path='/admin/*' element={<AdminRoute/>} />
        <Route path="/menu" element={<Menu/>} />
      </Routes>
     
      <Footer />
     
    </div>
   
 
         
  );
}

export default App;
