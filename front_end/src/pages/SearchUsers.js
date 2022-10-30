import UserSearchDataGrid from "../components/UserSearchDataGrid";
import Navbar from "../components/Navbar";

export default function SearchUsers(){
    return(
        <div>
            <Navbar/>
            <UserSearchDataGrid></UserSearchDataGrid>
        </div>
    );
}