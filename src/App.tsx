import { Routes, Route } from "react-router-dom";
import CurrentWeather from "./pages/CurrentWeather";
import Health from "./pages/Health";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Forecast from "./pages/Forecast";
import Storms from "./pages/Storms";

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/health" element={<Health />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/current" element={<CurrentWeather />} />
          <Route path="/storms" element={<Storms />} />
        </Routes >
      </div>
    </>
  );
}

export default App;
