import React from "react";
import { Typography, Stack } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosApi from "../api/axios";


function UserDetailsComponent() {
    const params = useParams();
    const [user, setUser] = useState({});
    const [userprofile, setUserProfile] = useState({});

    let getUsers = async () => {
        try {
            axiosApi.get(`/account/users/${params.id}/`).then((response) => {
                setUser(response.data);
                setUserProfile(response.data.userprofile);
                console.log(response.data);
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);


    return (
        <div>
            <Stack spacing={2} p={5}>
                <Typography variant="h5" color={green[800]} align={"left"}>
                   First Name: {user.first_name}
                </Typography>
                <Typography variant="h5" color={green[800]} align={"left"}>
                    Last Name: {user.last_name}
                </Typography>
                <Typography variant="h5" color={green[800]} align={"left"}>
                    Email: {user.email}
                </Typography>
                <Typography variant="h5" color={green[800]} align={"left"}>
                    Address: {userprofile.address}
                </Typography>
                <Typography variant="h5" color={green[800]} align={"left"}>
                    City: {userprofile.city}, {userprofile.country}
                </Typography>
                <Typography variant="h5" color={green[800]} align={"left"}>
                    JMBG: {userprofile.jmbg}
                </Typography>
                <Typography variant="h5" color={green[800]} align={"left"}>
                    Phone number: {userprofile.phone_number}
                </Typography>
                <Typography variant="h5" color={green[800]} align={"left"}>
                    Profession: {userprofile.profession}
                </Typography>
                <Typography variant="h5" color={green[800]} align={"left"}>
                    Workplace: {userprofile.workplace}
                </Typography>
                <Typography variant="h5" color={green[800]} align={"left"}>
                    Blood Type: {userprofile.blood_type}
                </Typography>
            </Stack>
        </div>
    );
}

export default UserDetailsComponent;
