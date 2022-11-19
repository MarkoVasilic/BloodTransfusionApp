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
import ScheduledAppointments from "./pages/ScheduledAppointments";
import ComplaintReplyPage from "./pages/ComplaintReply";
import UserDetails from "./pages/UserDetails";
import AllCentersAdmin from "./pages/AllCentersAdmin";
import UserProfile from "./pages/UserProfile";
import CenterStaff from "./pages/CenterStaff";
import UpdateStaff from "./pages/UpdateStaff";
import ListCreatedAppointments from "./pages/ListCreatedAppointments"
import SelectCenterForReservation from "./pages/SelectCenterForReservation"
import CenterAdministratorProfile from "./pages/CenterAdministratorProfile";
import UpdateUser from "./pages/UpdateUser";
import SelectedCenter from "./pages/SelectedCenter";
import UserChangePassword from "./pages/UserChangePassword";
import UpdateCenterAdministrator from "./pages/UpdateCenterAdministrator";
import RegisterStaff from "./pages/RegisterStaff";
import CenterAdministratorChangePassword from "./pages/CenterAdministratorChangePassword";
import StaffDetails from "./pages/StaffDetails";
import AdminProfile from "./pages/AdminProfile";
import AdminProfileChangePassword from "./pages/AdminProfileChangePassword";
import UpdateAdminProfile from "./pages/UpdateAdminProfile";
import VerifyEmail from "./pages/VerifyEmail";
import AllCenterUsers from "./pages/AllCenterUsers";
import EmailVerificationDeclaration from "./pages/EmailVerificationDeclaration";




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
                        <Route path="/list-centers-update" element={<AllCentersAdmin />} />
                        <Route path="/calendar" element={<MyCalendar />} />
                        <Route path="/user-details/:id" element={<UserDetails />} />
                        <Route path="/user-profile" element={<UserProfile />} />
                        <Route path="/center-staff-list/:centar" element={<CenterStaff />} />
                        <Route path="/update-staff" element={<UpdateStaff />} />
                        <Route path="/staff-profile" element={<CenterAdministratorProfile />} />
                        <Route path="/user-profile/update/:user" element={<UpdateUser />} />
                        <Route path="/staff-profile/update/:user" element={<UpdateCenterAdministrator />} />
                        <Route path="/register-staff" element={<RegisterStaff />} />
                        <Route path="/change-password-staff" element={<CenterAdministratorChangePassword />} />
                        <Route path="/staff-details/:id" element={<StaffDetails/>} />                        
                        <Route path="/user-profile/password/" element={<UserChangePassword />} />
                        <Route path="/admin-profile" element={<AdminProfile />} />
                        <Route path="/admin-profile/password/" element={<AdminProfileChangePassword />} />
                        <Route path="/admin-profile/update/:admin" element={<UpdateAdminProfile />} />
                        <Route path="/verify-email/:token/:id" element={<VerifyEmail />} />
                        <Route path="/email-declaration/" element={<EmailVerificationDeclaration />} />
                        <Route path="/created-appointments/" element={<ListCreatedAppointments />} />
                        <Route path="/select-center/" element={<SelectCenterForReservation />} />
                        <Route path="/selected-center/" element={<SelectedCenter />} />
                        <Route path="/center/list-users" element={<AllCenterUsers />} />
                        <Route path="/user-scheduled/" element={<ScheduledAppointments />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
