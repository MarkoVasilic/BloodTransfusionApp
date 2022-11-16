import PersonalInformationCard from "../components/PersonalInformationCard";
import { green } from '@mui/material/colors';
import { Typography, Paper, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/system';
import Navbar from "../components/Navbar";
import AllowedUsers from "../components/AllowedUsers";
import axiosApi from "../api/axios";
import { useEffect, useState } from "react";

export default function CenterAdministratorProfile() {

   
        const listOfAllowedUsers = ["TranfusionCenterStaff"];
        let navigate = useNavigate();
        const [id, setId] = useState(0);
        let getData = async () => {
            axiosApi
            .get('/account/users/user-profile/')
            .then((response) => {
                setId(response.data.id);
            })
        }
    
        useEffect(() => {
            getData();
        }, []);
    
        const routeChange1 = () =>{ 
            let path = `/staff-profile/update/${id}/`; 
            navigate(path);
          }

        const routeChange2 = () =>{ 
            let path = `/change-password-staff/`; 
            navigate(path);
          }


    return (
        <div>
            <Navbar />
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <Stack marginTop={"10px"} justifyContent={"center"}>
            <Typography align="center"  marginBottom={"20px"}  component="h1" variant="h4" color={green[800]}>
                Profile
            </Typography>
            <Typography align="left" marginLeft={"110px"} marginBottom={"5px"} component="h4" variant="h4" color={green[800]}>
                Personal information
            </Typography>
            <Button
                        variant="contained"
                        onClick={routeChange1}
                        style={{
                            width: 200,
                            marginLeft: 1300,
                            marginBottom: 10,
                            marginTop: -45
                        }}
                        sx={{
                            background: "#6fbf73",
                            height: "100",
                            "&.MuiButtonBase-root": {
                                "&:hover": {
                                    backgroundColor: green[600],
                                },
                            },
                        }}
                    >
                        Update profile
                    </Button>
                    <Button
                        variant="contained"
                        onClick={routeChange2}
                        style={{
                            width: 200,
                            marginLeft: 1300,
                            marginBottom: -10   
                        }}
                        sx={{
                            background: "#6fbf73",
                            height: "100",
                            "&.MuiButtonBase-root": {
                                "&:hover": {
                                    backgroundColor: green[600],
                                },
                            },
                        }}
                    >
                        Change password
                    </Button>
            <Paper elevation={10} sx={{ p: { sm: 2, xs: 2 } }}>
            <PersonalInformationCard></PersonalInformationCard>
            </Paper>
        </Stack>
        </div>
    );
}
