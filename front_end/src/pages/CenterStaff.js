import ListCenterStaff from "../components/ListCenterStaff";
import AllowedUsers from "../components/AllowedUsers";
import Navbar from "../components/Navbar";

export default function CenterStaff(){
    var listOfAllowedUsers = ["TranfusionCenterStaff","Admin"]
    return(
        <div>
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <Navbar></Navbar>
             <ListCenterStaff/>
        </div>
        
    );
}
