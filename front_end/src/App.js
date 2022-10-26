import './App.css';
import Navbar from "./components/Navbar";
import DonorRegistration from "./pages/DonorRegistration";
import Dashboard from "./pages/Dashboard";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <DonorRegistration />
    </div>
  );
}

export default App;

//<Dashboard />
