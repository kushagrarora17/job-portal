import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./Profile/Profile";
import Jobs from "./Jobs/Jobs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={} /> */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/create-job" element={} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
