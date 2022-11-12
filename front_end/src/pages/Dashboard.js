import Typography from '@mui/material/Typography';
import Image from 'mui-image'
import { Stack } from '@mui/system';
import Navbar from "../components/Navbar";
import axiosApi from "../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    let navigate = useNavigate();
    const [user, setUser] = useState({});
    const getData = async () =>
    axiosApi
        .get(`account/users/logged/`)
        .then((response) => {
            setUser(response.data);
            if((response.data.groups[0] === "Admin") && (response.data.userprofile.is_activated === false)){
                navigate("/change-password");

            }
        })
        .catch(function (error) {
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
        });
useEffect(() => {
    getData();
}, []);
    return (
        <div>
            <Navbar />
            <Stack height={"80vh"} justifyContent={"center"}>
                <Typography variant="h4" component="h2">
                    Be the reason for someone's heartbeat.
                </Typography>
                <Stack alignItems={"center"}>
                    <Image src="blood_drop.png" width={200} height={150} />
                </Stack>
            </Stack>
        </div>
    );
}