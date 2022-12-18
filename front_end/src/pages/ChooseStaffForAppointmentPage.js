import ListStaffForAppointment from "../components/ListStaffForAppointment";
import Navbar from "../components/Navbar";

export default function ChooseStaffForAppointmentPage() {
    return (
        <div>
            <Navbar/>
            <ListStaffForAppointment title={"Transfusion Centers"} buttonName={"Details"} buttonUrl={"/center-details/"}/>
        </div>
    );
}