import React from 'react'
import AllowedUsers from '../components/AllowedUsers'
import ChangePassword from '../components/ChangePassword'
import Navbar from '../components/Navbar'
import { Grid, Paper, Typography } from "@mui/material";
import { green } from "@mui/material/colors";



function UserChangePassword() {
    var allowedUsers = ["TranfusionCenterUser"]
  return (
    <div>
        <AllowedUsers userRole = {allowedUsers}></AllowedUsers>
        <Navbar></Navbar>
        <Typography variant="h4" color={green[800]} marginTop={10}>Change Password</Typography>
        <Typography variant="h7" color={green[900]} marginTop={10}>After your first log in, you must change your password</Typography>
        <Grid container spacing={{ sm: 3, xs: 2 }} p={{ sm: 3, xs: 2 }}>
        <Grid xs={12} md={4} item>

        </Grid>
        <Grid xs={12} md={4} item>
                        <Paper elevation={15} sx={{ p: { sm: 3, xs: 2 } }}>
                        <ChangePassword/>
                        </Paper> 
                        <Grid xs={12} md={4} item>
                            </Grid>
                        </Grid>
                    </Grid>

    </div>
  )
}

export default UserChangePassword