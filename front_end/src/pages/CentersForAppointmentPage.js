import ListTransfusionCentersForAppointment from "../components/ListTransfusionCentersForAppointment";
import Navbar from "../components/Navbar";
import { useLocation } from 'react-router-dom';




export default function CentersForAppointmentPage() {
    const { state } = useLocation();


    return (
        <div>
            <Navbar/>
            <ListTransfusionCentersForAppointment title={"Select Transfusion Center"} buttonName={"Select"} buttonUrl={"/user-scheduled/"}/>
        </div>
    );
}