import Navbar from "../components/Navbar";
import AllowedUsers from "../components/AllowedUsers";
import PredefinedAppointmentForm from "../components/PredefinedAppointmentForm";
import { Typography } from '@mui/material';
import { green } from '@mui/material/colors';


export default function QuestionnaireViewPage() {
    var allowedUsers = ["TranfusionCenterStaff"]
    return (
        <div>
            <AllowedUsers userRole = {allowedUsers}/>
            <Navbar/>
            <Typography align="center" marginTop={"15px"}  marginBottom={"20px"}  component="h1" variant="h4" color={green[800]}>
                Make predefined appointment
            </Typography>
            <PredefinedAppointmentForm title={"Make predefined appointment"}></PredefinedAppointmentForm>

        </div>
    );
}