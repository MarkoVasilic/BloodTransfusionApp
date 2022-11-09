import PersonalInformationCard from "../components/PersonalInformationCard";
import { green } from '@mui/material/colors';
import { Typography, Paper, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/system';
import Navbar from "../components/Navbar";
import LoyaltyCardComponent from "../components/LoyaltyCard";
import AllowedUsers from "../components/AllowedUsers";
import axiosApi from "../api/axios";
import { useEffect, useState } from "react";

export default function UserProfile() {
    const listOfAllowedUsers = ["TranfusionCenterUser"];
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

    const routeChange = () =>{ 
        let path = `/user-profile/update/${id}/`; 
        navigate(path);
      }

    return (
        <div>
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <Navbar />
            <Stack marginTop={"10px"} justifyContent={"center"}>
            <Typography align="center"  marginBottom={"20px"}  component="h1" variant="h4" color={green[800]}>
                Profile
            </Typography>
            <Button
                        variant="contained"
                        onClick={routeChange}
                        style={{
                            width: 200,
                            marginLeft: 1300,
                            marginBottom: 0
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
            <Typography align="left" marginTop={"-10px"} marginLeft={"110px"} marginBottom={"5px"} component="h4" variant="h4" color={green[800]}>
                Personal information
            </Typography>
            <Paper elevation={10} sx={{ p: { sm: 2, xs: 2 } }}>
            <PersonalInformationCard></PersonalInformationCard>
            </Paper>
            <Typography align="left" marginLeft={"110px"} marginTop={"15px"} marginBottom={"5px"} component="h4" variant="h4" color={green[800]}>
                Loyalty program
            </Typography>
            <Paper elevation={15} sx={{ p: { sm: 2, xs: 2 } }}>
            <LoyaltyCardComponent></LoyaltyCardComponent>
            </Paper>
        </Stack>
        </div>
    );
}