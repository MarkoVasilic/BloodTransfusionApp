import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import axiosApi from "../api/axios";
import Grid from '@mui/material/Grid';

function PersonalInformationCardComponent() {
    const [profile, setProfile] = useState({});
    const [ userprofile, setUserprofile ] = useState({});

    let getData = async () => {
        axiosApi
            .get('/account/users/user-profile/')
            .then((response) => {
                setProfile(response.data);
                setUserprofile(response.data.userprofile);
                switch(response.data.userprofile.gender){
                    case 'M':
                        response.data.userprofile.gender = "MALE";
                        break;
                    case 'F':
                        response.data.userprofile.gender = "FEMALE"
                        break;
                    default:
                        response.data.userprofile.gender = "UNKNOWN";
                }
                switch(response.data.userprofile.blood_type){
                    case 'A_POS':
                        response.data.userprofile.blood_type = "A POSITIVE";
                        break;
                    case 'A_NEG':
                        response.data.userprofile.blood_type = "A NEGATIVE";
                        break;
                    case 'B_POS':
                        response.data.userprofile.blood_type = "B POSITIVE";
                        break;
                    case 'B_NEG':
                        response.data.userprofile.blood_type = "B NEGATIVE";
                        break;
                    case 'AB_POS':
                        response.data.userprofile.blood_type = "AB POSITIVE";
                        break;
                    case 'AB_NEG':
                        response.data.userprofile.blood_type = "AB NEGATIVE";
                        break;
                    case 'O_POS':
                        response.data.userprofile.blood_type = "O POSITIVE";
                        break;
                    case 'O_NEG':
                        response.data.userprofile.blood_type = "O NEGATIVE";
                        break;
                    default:
                        response.data.userprofile.blood_type = "UNKNOWN";
                }
                });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Grid container spacing={2} marginTop="-10px" marginBottom="0px" alignContent={"center"}>
            <Grid item xs={3}>
                <Typography variant="h5" align='left' marginLeft={"100px"} marginRight={"5px"}>First name: </Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{profile.first_name}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>Last name: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{profile.last_name}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>JMBG: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{userprofile.jmbg}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>Email: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{profile.email}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>Address: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{userprofile.address}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>City: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{userprofile.city}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>Country: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{userprofile.country}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>Phone number: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{userprofile.phone_number}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>Gender: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{userprofile.gender}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>Blood type: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{userprofile.blood_type}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>Profession: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{userprofile.profession}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>Workplace: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{userprofile.workplace}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>Penalty points: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{userprofile.penalty_points}</Typography>
            </Grid>
        </Grid>
    );
}

export default PersonalInformationCardComponent;
