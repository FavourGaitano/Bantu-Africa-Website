
import './App.scss'
import Restaurant from './pages/restaurant/Restaurant'
import Home from "./pages/landing/Home";

function App() {
  return (
    <div className="main-app">
      {/* <h2>This is our main entry file</h2> */}
      <Restaurant />
      <Home />
    </div>
  );
}

export default App;
