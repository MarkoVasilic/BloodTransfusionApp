import CreateCenterForm from "../components/CreateCenterForm";
import Navbar from "../components/Navbar";
import AllowedUsers from "../components/AllowedUsers";

export default function CreateCenter(){
    const listOfAllowedUsers = ["Admin"];
    return(
        <div>
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <Navbar/>
            <CreateCenterForm />
        </div>
    );
}