import "./App.css";
import Navbar from "./components/Navbar";
import DonorRegistration from "./pages/DonorRegistration";
import SearchUsers from "./pages/SearchUsers";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateCenter from "./pages/CreateCenter";
import Login from "./pages/Login";
import { setAuthToken } from "./helpers/sethAuthToken";
import UpdateCenter from "./pages/UpdateCenter";

function App() {
    const sideMenu = {'Inbox' : 'in', 'Starred' : 'st', 'Send email' : 'se', 'Users' : '/users', 'Create Center': '/create-center', 'Update Center': '/update-center'};
    const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }
    return (
        <div className="App">
            <Router>
                <Navbar sidemenu={sideMenu} title="Home"/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/donor-register" element={<DonorRegistration />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/users" element={<SearchUsers />} />
                        <Route path="/create-center" element={<CreateCenter />} />
                        <Route path="/update-center" element={<UpdateCenter />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
