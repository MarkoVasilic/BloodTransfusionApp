import "./App.css";
import Navbar from "./components/Navbar";
import DonorRegistration from "./pages/DonorRegistration";
import SearchUsers from "./pages/SearchUsers";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateCenter from "./pages/CreateCenter";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route
                            path="/donor-register"
                            element={<DonorRegistration />}
                        />
                        <Route path="/users" element={<SearchUsers />} />
                        <Route path="/create-center" element={<CreateCenter />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
