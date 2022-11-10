import StaffDetailsCard from "../components/StaffDetailsCard";
import { green } from '@mui/material/colors';
import { Typography, Paper, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/system';
import Navbar from "../components/Navbar";
import AllowedUsers from "../components/AllowedUsers";
import axiosApi from "../api/axios";
import { useEffect, useState } from "react";

export default function StaffDetails() {

    return (
        <div>
            <Navbar />
            <Stack marginTop={"10px"} justifyContent={"center"}>
            <Typography align="center"  marginBottom={"20px"}  component="h1" variant="h4" color={green[800]}>
                Administrator Center Details
            </Typography>
            
            <Paper elevation={10} sx={{ p: { sm: 2, xs: 2 } }}>
            <StaffDetailsCard></StaffDetailsCard>
            </Paper>
        </Stack>
        </div>
    );
}
