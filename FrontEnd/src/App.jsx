import "./App.scss";
import AdultsActivitiesPage from "./pages/Activities/Adults/AdultsActivitiesPage";
import KidsActivitiesPage from "./pages/Activities/Kids/KidsActivities";
// import Home from "./pages/landing/Home";

function App() {
  return (
    <div className="main-app">
      {/* <Home /> */}
      {/* <AdultsActivitiesPage /> */}
      <KidsActivitiesPage />
    </div>
  );
}

export default App;
