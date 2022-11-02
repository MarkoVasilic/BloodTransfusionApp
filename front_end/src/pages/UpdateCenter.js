import UpdateCenterForm from "../components/UpdateCenterForm";
import AllowedUsers from "../components/AllowedUsers";

export default function UpdateCenter(){
    const listOfAllowedUsers = ["Admin"];
    return(
        <div>
        <AllowedUsers userRole = {listOfAllowedUsers}/>
        <UpdateCenterForm></UpdateCenterForm>
        </div>
    );
}