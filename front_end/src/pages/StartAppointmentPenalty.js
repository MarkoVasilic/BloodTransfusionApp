import AppointmentToStart from "../components/StartAppointmentOrPenalty";
import AllowedUsers from "../components/AllowedUsers";
import Navbar from "../components/Navbar";

export default function StartAppointment(){
    var listOfAllowedUsers = ["Admin", "TranfusionCenterStaff"]
    return(
        <div>
        <AllowedUsers userRole = {listOfAllowedUsers}/>
        <Navbar></Navbar>
        <AppointmentToStart></AppointmentToStart>
        </div>
    );
}