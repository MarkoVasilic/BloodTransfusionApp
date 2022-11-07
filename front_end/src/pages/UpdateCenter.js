import UpdateCenterForm from "../components/UpdateCenterForm";
import AllowedUsers from "../components/AllowedUsers";

export default function UpdateCenter(){
    const listOfAllowedUsers = ["Admin", "TranfusionCenterStaff"];
    return(
        <div>
        <AllowedUsers userRole = {listOfAllowedUsers}/>
        <UpdateCenterForm></UpdateCenterForm>
        </div>
    );
}