import CenterDetailsCard from "../components/CenterDetailsCard";
import { green } from '@mui/material/colors';
import { Typography, Paper, Button } from '@mui/material';
import { Stack } from '@mui/system';
import Navbar from "../components/Navbar";
import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateCenter(props) {
    let navigate = useNavigate();
    const { state } = useLocation();
    const onClick = (e) => {
        console.log(state)
        navigate("/created-appointments/", { state: state })
    };
    return (
        <div>
            <Navbar />
            <Stack marginTop={"10px"} justifyContent={"center"}>
                <Typography align="center" marginBottom={"30px"} component="h1" variant="h4" color={green[800]}>
                    Details
                </Typography>
                <Paper elevation={15} sx={{ p: { sm: 2, xs: 2 } }}>
                    <CenterDetailsCard props></CenterDetailsCard>
                </Paper>
            </Stack>
            <Stack margin={"30px 0px 0px 10px"} width={"250px"}>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={onClick}
                margin="1000px"
            >
                Make An Appointment
            </Button>
            </Stack>
        </div>
    );
}