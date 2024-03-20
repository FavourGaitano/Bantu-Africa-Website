
import "./App.scss";
import Home from "./pages/landing/Home";
import Room from "./pages/rooms/Room";
import Restaurant from './pages/restaurant/Restaurant'


function App() {
  return (
    <div className="main-app">

      <Home />
      <Room/>

     
      <Restaurant />
  

    </div>
  );
}

export default App;
