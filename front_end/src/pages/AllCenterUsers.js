import Navbar from "../components/Navbar";
import AllowedUsers from "../components/AllowedUsers";
import ListCenterUsers from "../components/ListCenterUsers";

export default function SearchUsers(){
    const listOfAllowedUsers = ["Admin", "TranfusionCenterStaff"];
    return(
        <div>
            <Navbar/>
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <ListCenterUsers></ListCenterUsers>
        </div>
    );
}