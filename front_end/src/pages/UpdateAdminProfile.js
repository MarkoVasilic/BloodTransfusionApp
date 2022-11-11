import Navbar from "../components/Navbar";
import UpdateUserForm from "../components/UpdateUserForm"
import AllowedUsers from "../components/AllowedUsers";




export default function UpdateUser(){
    const listOfAllowedUsers = ["Admin"];
    
    return(
        <div>
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <Navbar />
            <UpdateUserForm></UpdateUserForm>
        </div>

    );
}