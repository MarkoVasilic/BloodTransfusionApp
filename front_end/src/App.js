import "./App.css";
import DonorRegistration from "./pages/DonorRegistration";
import SearchUsers from "./pages/SearchUsers";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateCenter from "./pages/CreateCenter";
import Login from "./pages/Login";
import { setAuthToken } from "./helpers/sethAuthToken";
import AdminRegistration from "./pages/AdminRegistration";
import AllCenters from "./pages/AllCenters";
import CreateQuestionnaire from "./pages/CreateQuestionnaire";
import CenterDetails from "./pages/CenterDetails";
import UpdateCenter from "./pages/UpdateCenter";
import AllCentersAdmin from "./pages/AllCentersAdmin";
import AdminChangePassword from "./pages/AdminChangePassword";
import UserProfile from "./pages/UserProfile";
import CenterStaff from "./pages/CenterStaff";
import UpdateStaff from "./pages/UpdateStaff";
import UpdateUser from "./pages/UpdateUser";

function App() {
    const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }
    
    return (
        <div className="App">
            <Router>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/register-donor" element={<DonorRegistration />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/users" element={<SearchUsers />} />
                        <Route path="/register-admin" element={<AdminRegistration />} />
                        <Route path="/create-center" element={<CreateCenter />} />
                        <Route path="/list-centers" element={<AllCenters />} />
                        <Route path="/fill-questionnaire" element={<CreateQuestionnaire />} />
                        <Route path="/center-details" element={<CenterDetails />} />
                        <Route path="/change-password" element={<AdminChangePassword />} />
                        <Route path="/update-center/:center" element={<UpdateCenter />} />
                        <Route path="/list-centers-update" element={<AllCentersAdmin />} />
                        <Route path="/user-profile" element={<UserProfile />} />

                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
