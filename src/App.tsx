import { Routes, Route } from "react-router-dom";
import CurrentWeather from "./pages/CurrentWeather";
import Health from "./pages/Health";
import Dashboard from "./pages/Dashboard";
import AccuForecast from "./pages/AccuForecast";

function App() {

  return (
    <>
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Health />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forecast" element={<AccuForecast />} />
          <Route path="/current" element={<CurrentWeather />} />
        </Routes >
      </div>
    </>
  );
}

export default App;
