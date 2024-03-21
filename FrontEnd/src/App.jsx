import "./App.scss";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Main from "./layout/Main";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="main-app">
      <Navbar />
      <Routes>
        <Route path="*" element={<Main />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
