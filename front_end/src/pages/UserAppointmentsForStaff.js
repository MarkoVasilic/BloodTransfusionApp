import DataGridListAppointmentUser from "../components/ListAppointmentUser";
import AllowedUsers from "../components/AllowedUsers";
import Navbar from "../components/Navbar";

export default function UserAppointmentsStaff(){
    var listOfAllowedUsers = ["TranfusionCenterStaff","Admin"]
    return(
        <div>
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <Navbar></Navbar>
             <DataGridListAppointmentUser/>
        </div>
        
    );
}
