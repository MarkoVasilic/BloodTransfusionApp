import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { useState, useEffect } from "react";
import axiosApi from '../api/axios';
import RegistrationForm from "../components/RegistrationForm";
import Navbar from "../components/Navbar";
import AllowedUsers from "../components/AllowedUsers";


export default function AdminRegistration() {
    const [user, setUser] = useState("");
    const listOfAllowedUsers = ["Admin"];
    const getData = async () => (
        axiosApi.get(`account/users/logged/`).then((response) => {
            setUser(response.data);
        }).catch(function (error) {
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
              console.log('Error', error.message);
            }
        
          })
    )

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Navbar/>
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <Stack height={"170vh"} justifyContent={"center"}>
                <Typography component="h1" variant="h4" color={green[800]}>
                    Register Center Admin
                </Typography>
                <RegistrationForm  userRole={user.groups === undefined ? "" : user.groups[0]} />
            </Stack>
        </div>
    );
}