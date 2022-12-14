import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from "../api/axios";
import {useForm} from "react-hook-form";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { ButtonGroup } from '@mui/material';

function AppointmentToStart(){
    const [appointment, setAppointment] = useState({});
    const params = useParams();
    let navigate = useNavigate();
    
    let getData = async () => {
        axiosApi
            .get(`/appointment/${params.id}/`) 
            .then((response) => {
                setAppointment(response.data);
            });
  
    };

    useEffect(() => {
        getData();
    }, []);


    return (
        <div>
            <Stack direction={"row"} sx={{ justifyContent: "center" }}>
                <Typography
                    component="h1"
                    variant="h4" 
                    color={green[800]}
                    marginBottom={3}
                    marginTop={1}
                >
                    Start appointment
                </Typography>
            </Stack>
            <Stack direction={"row"} sx={{ justifyContent: "start"}} p={2}>
            </Stack>
    
                <ButtonGroup size="large" aria-label="large button group">
                   <Button 
                        variant="contained"
                        size="large"
                        style={{marginLeft: 30}}
                        onClick={() => {
                            navigate('/questionnaire/'+appointment.id);
                        }}
                        >START APPOINTMENT
                    </Button>
                    <Button 
                        variant="contained"
                        size="large"
                        style={{marginLeft: 30}}
                        onClick={() => {
                            axiosApi.put(`/account/users/increase-penalty-points/${appointment.user_profile}`).then(axiosApi.delete(`/appointment/delete-appointment/${appointment.id}`));
                            navigate('/calendar');
                        }}
                        >USER DID NOT COME
                    </Button>
                </ButtonGroup>
            
        </div>
    );
}

export default AppointmentToStart;





