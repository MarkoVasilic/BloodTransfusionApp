import React from 'react'
import AllowedUsers from '../components/AllowedUsers'
import ChangePassword from '../components/ChangePassword'
import Navbar from '../components/Navbar'
import { Grid, Paper, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import CheckQRCode from '../components/CheckQRCode';



function AdminCheckQRCode() {
    var allowedUsers = ["TranfusionCenterStaff"]
  return (
    <div>
        <AllowedUsers userRole = {allowedUsers}></AllowedUsers>
        <Navbar></Navbar>
        <Typography variant="h4" color={green[800]} marginTop={10}>Check QR Code</Typography>
        <Typography variant="h7" color={green[900]} marginTop={10}>Upload patients QR Code and validate that the appointment is scheduled correctly</Typography>
        <Grid container spacing={{ sm: 3, xs: 2 }} p={{ sm: 3, xs: 2 }}>
        <Grid xs={12} md={4} item>

        </Grid>
        <Grid xs={12} md={4} item>
                        <Paper elevation={15} sx={{ p: { sm: 3, xs: 2 } }}>
                        <CheckQRCode/>
                        </Paper> 
                        <Grid xs={12} md={4} item>
                            </Grid>
                        </Grid>
                    </Grid>

    </div>
  )
}

export default AdminCheckQRCode