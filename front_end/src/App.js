import './App.css';
import Navbar from "./components/Navbar";
import DonorRegistration from "./pages/DonorRegistration";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/donor-register" element={<DonorRegistration/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

