import UserDetailsForm from "../components/UserDetailsForm";
import Navbar from "../components/Navbar";
import { green } from "@mui/material/colors";
import { Typography,Paper, Grid } from "@mui/material";
import AllowedUsers from "../components/AllowedUsers";
import ReportForm from "../components/ReportForm";

export default function ReportFormPage() {
    var allowedUsers = ["Admin", "TranfusionCenterStaff"]
    return (
        <div>
            <AllowedUsers userRole = {allowedUsers}/>
            <Navbar/>
            <Typography variant="h4" color={green[800]} marginTop={2}>
                Appointment Report
            </Typography>
            <Typography variant="h7" color={green[900]} marginTop={2}>
                Fill the appointment report for current patient
            </Typography>
            <Grid container spacing={{ sm: 3, xs: 2 }} p={{ sm: 3, xs: 2 }}>
        <Grid xs={12} md={3.5} item>

        </Grid>
        <Grid xs={12} md={5} item>
                        <Paper elevation={15} sx={{ p: { sm: 3, xs: 2 } }}>
                        <ReportForm />
                        </Paper> 
                        <Grid xs={12} md={3.5} item>
                            </Grid>
                        </Grid>
                    </Grid>
        </div>
    );
}