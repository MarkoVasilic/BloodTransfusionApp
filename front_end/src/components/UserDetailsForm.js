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
                setTimeout(3000);
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
            {!user && <div>Loading...</div> }
            {user && <div>
            <Typography variant="h5" align={"left"} color={"text.secondary"}>
               ID: {user.id}
            </Typography>
            <Stack spacing={2} p={5}>
                <Stack direction={"row"} spacing={2}>
                    <Typography variant="h5" align={"left"}>
                        First Name:
                    </Typography>
                    <Typography
                        variant="h5"
                        color={"text.secondary"}
                        align={"left"}
                    >
                        {user.first_name}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <Typography variant="h5" align={"left"}>
                        Last Name:
                    </Typography>
                    <Typography
                        variant="h5"
                        color={"text.secondary"}
                        align={"left"}
                    >
                        {user.last_name}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <Typography variant="h5" align={"left"}>
                        Email:
                    </Typography>
                    <Typography
                        variant="h5"
                        color={"text.secondary"}
                        align={"left"}
                    >
                        {user.email}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <Typography variant="h5" align={"left"}>
                        Address:
                    </Typography>
                    <Typography
                        variant="h5"
                        color={"text.secondary"}
                        align={"left"}
                    >
                        {userprofile.address}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <Typography variant="h5" align={"left"}>
                        City/Country:
                    </Typography>
                    <Typography
                        variant="h5"
                        color={"text.secondary"}
                        align={"left"}
                    >
                        {userprofile.city}, {userprofile.country}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <Typography variant="h5" align={"left"}>
                        JMBG:
                    </Typography>
                    <Typography
                        variant="h5"
                        color={"text.secondary"}
                        align={"left"}
                    >
                        {userprofile.jmbg}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <Typography variant="h5" align={"left"}>
                        Phone number:
                    </Typography>
                    <Typography
                        variant="h5"
                        color={"text.secondary"}
                        align={"left"}
                    >
                        {userprofile.phone_number}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <Typography variant="h5" align={"left"}>
                        Profession:
                    </Typography>
                    <Typography
                        variant="h5"
                        color={"text.secondary"}
                        align={"left"}
                    >
                        {userprofile.profession}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <Typography variant="h5" align={"left"}>
                        Workplace
                    </Typography>
                    <Typography
                        variant="h5"
                        color={"text.secondary"}
                        align={"left"}
                    >
                        {userprofile.workplace}
                    </Typography>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <Typography variant="h5" align={"left"}>
                        Blood Type:
                    </Typography>
                    <Typography
                        variant="h5"
                        color={"text.secondary"}
                        align={"left"}
                    >
                        {userprofile.blood_type}
                    </Typography>
                </Stack>
            </Stack>
            </div>
        }
        </div>
    
    );
}

export default UserDetailsComponent;
