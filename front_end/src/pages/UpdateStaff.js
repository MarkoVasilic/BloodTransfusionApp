import UpdateStaffForm from "../components/UpdateStaffForm";
import AllowedUsers from "../components/AllowedUsers";

export default function UpdateStaff(){
    const listOfAllowedUsers = ["Admin","TranfusionCenterStaff"];
    return(
        <div>
        <AllowedUsers userRole = {listOfAllowedUsers}/>
        <UpdateStaffForm></UpdateStaffForm>
        </div>
    );
}