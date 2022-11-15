import ListTranfusionCenters from "../components/ListTranfusionCenters";
import Navbar from "../components/Navbar";

export default function AllCenters() {
    return (
        <div>
            <Navbar/>
            <ListTranfusionCenters title={"Select Transfusion Center"} buttonName={"Select"} buttonUrl={"/selected-center/"}/>
        </div>
    );
}