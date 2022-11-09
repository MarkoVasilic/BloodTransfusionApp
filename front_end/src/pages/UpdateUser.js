import Navbar from "../components/Navbar";
import UpdateUserForm from "../components/UpdateUserForm"
import AllowedUsers from "../components/AllowedUsers";



export default function UpdateUser(){
    const listOfAllowedUsers = ["TranfusionCenterUser"];
    
    return(
        <div>
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <Navbar />
            <UpdateUserForm></UpdateUserForm>
        </div>

    );
}