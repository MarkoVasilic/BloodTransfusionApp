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
import AdminChangePassword from "./pages/AdminChangePassword";
import MyCalendar from "./pages/MyCalendar";
import AllComplaints from "./pages/AllComplaints";
import ComplaintReplyPage from "./pages/ComplaintReply";
import UserDetails from "./pages/UserDetails";


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
                        <Route path="/list-complaints/" element={<AllComplaints />} />
                        <Route path="/complaint-reply/:id" element={<ComplaintReplyPage />} />
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
                        <Route path="/list-centers-update" element={<AllCenters />} />
                        <Route path="/calendar" element={<MyCalendar />} />
                        <Route path="/user-details/:id" element={<UserDetails />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
