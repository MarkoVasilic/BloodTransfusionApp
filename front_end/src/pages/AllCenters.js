import ListTranfusionCenters from "../components/ListTranfusionCenters";
import Navbar from "../components/Navbar";

export default function AllCenters() {
    return (
        <div>
            <Navbar/>
            <ListTranfusionCenters title={"Transfusion Centers"} buttonName={"Details"} buttonUrl={"/center-details/"}/>
        </div>
    );
}