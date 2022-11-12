import UpdateCenterForm from "../components/UpdateCenterForm";
import AllowedUsers from "../components/AllowedUsers";
import Navbar from "../components/Navbar";

export default function UpdateCenter(){
    var listOfAllowedUsers = ["Admin", "TranfusionCenterStaff"]
    return(
        <div>
        <AllowedUsers userRole = {listOfAllowedUsers}/>
        <Navbar></Navbar>
        <UpdateCenterForm></UpdateCenterForm>
        </div>
    );
}