import UserSearchDataGrid from "../components/UserSearchDataGrid";
import Navbar from "../components/Navbar";
import AllowedUsers from "../components/AllowedUsers";

export default function SearchUsers(){
    const listOfAllowedUsers = ["Admin"];
    return(
        <div>
            <Navbar/>
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <UserSearchDataGrid></UserSearchDataGrid>
        </div>
    );
}