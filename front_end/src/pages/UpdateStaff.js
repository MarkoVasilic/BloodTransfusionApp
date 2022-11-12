import UpdateStaffForm from "../components/UpdateStaffForm";
import AllowedUsers from "../components/AllowedUsers";
import Navbar from "../components/Navbar";

export default function UpdateStaff(){
    var listOfAllowedUsers = ["Admin","TranfusionCenterStaff"]
    return(
        <div>
        <AllowedUsers userRole = {listOfAllowedUsers}/>
        <Navbar></Navbar>
        <UpdateStaffForm></UpdateStaffForm>
        </div>
    );
}