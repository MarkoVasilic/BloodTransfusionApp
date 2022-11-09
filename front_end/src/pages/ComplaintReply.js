import ComplaintReply from "../components/ComplaintReply";
import Navbar from "../components/Navbar";
import { green } from "@mui/material/colors";
import { Typography,Paper, Grid } from "@mui/material";
import AllowedUsers from "../components/AllowedUsers";

export default function ComplaintReplyPage() {
    var allowedUsers = ["Admin", "TranfusionCenterStaff"]
    return (
        <div>
            <AllowedUsers userRole = {allowedUsers}/>
            <Navbar/>
            <Typography variant="h4" color={green[800]} marginTop={2}>
                Reply to a Complaint
            </Typography>
            <Grid container spacing={{ sm: 3, xs: 2 }} p={{ sm: 3, xs: 2 }}>
        <Grid xs={12} md={2} item>

        </Grid>
        <Grid xs={12} md={8} item>
                        <Paper elevation={15} sx={{ p: { sm: 3, xs: 2 } }}>
                        <ComplaintReply />
                        </Paper> 
                        <Grid xs={12} md={2} item>
                            </Grid>
                        </Grid>
                    </Grid>
        </div>
    );
}