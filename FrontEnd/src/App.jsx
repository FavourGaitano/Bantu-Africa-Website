import "./App.scss";


import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu/Menu";

import Main from "./layout/Main";
import AdminRoute from "./layout/AdminRoute";
import Offers from "./components/Offers/Offers";

function App() {
  return (
    <div className="main-app">
      {/* <Routes>
        <Route path="/*" element={<Main/>} />
        <Route path='/admin/*' element={<AdminRoute/>} />
        <Route path="/menu" element={<Menu/>} />
      </Routes> */}
      <Offers />
   
 
         </div>
  );
}

export default App;
