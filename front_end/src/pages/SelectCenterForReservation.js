import ListTranfusionCenters from "../components/ListTranfusionCenters";
import Navbar from "../components/Navbar";
import AllowedUsers from "../components/AllowedUsers";

export default function AllCenters() {
    const listOfAllowedUsers = ["TranfusionCenterUser"];
    return (
        <div>
            <Navbar/>
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <ListTranfusionCenters title={"Select Transfusion Center"} buttonName={"Select"} buttonUrl={"/selected-center/"}/>
        </div>
    );
}