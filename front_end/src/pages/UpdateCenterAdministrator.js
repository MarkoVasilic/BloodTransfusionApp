import Navbar from "../components/Navbar";
import UpdateCenterAdministratorForm from "../components/UpdateCenterAdministratorForm"
import AllowedUsers from "../components/AllowedUsers";



export default function UpdateCenterAdministrator(){
    const listOfAllowedUsers = ["TranfusionCenterStaff"]
    
    return(
        <div>
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <Navbar />
            <UpdateCenterAdministratorForm></UpdateCenterAdministratorForm>
        </div>

    );
}