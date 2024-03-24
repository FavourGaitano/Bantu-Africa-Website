import "./App.scss";


import { Route, Routes } from "react-router-dom";

import Main from "./layout/Main";
import AdminRoute from "./layout/AdminRoute";

function App() {
  return (
    <div className="main-app">
      <Routes>
        <Route path="/*" element={<Main/>} />
        <Route path='/admin/*' element={<AdminRoute/>} />

      </Routes>
 
         </div>
  );
}

export default App;
