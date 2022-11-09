import ListComplaints from "../components/ListComplaints";
import Navbar from "../components/Navbar";
import AllowedUsers from "../components/AllowedUsers";

export default function AllComplaints() {
    var allowedUsers = ["Admin", "TranfusionCenterStaff"]
    return (
        <div>
            <AllowedUsers userRole = {allowedUsers}/>
            <Navbar/>
            <ListComplaints />
        </div>
    );
}