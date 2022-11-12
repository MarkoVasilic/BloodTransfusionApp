import ListTransfusionCentersAdmin from "../components/ListTransfusionCentersAdmin";
import AllowedUsers from "../components/AllowedUsers";
import Navbar from "../components/Navbar";

export default function ListCentersAdmin(){
    var listOfAllowedUsers = ["TranfusionCenterStaff"]
    return( 
        <div>
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <Navbar></Navbar>
            <ListTransfusionCentersAdmin />
        </div>
        
    );
}
