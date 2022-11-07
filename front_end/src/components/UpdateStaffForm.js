import React from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from "../api/axios";
import {useForm} from "react-hook-form";
import InputTextField from "./InputTextField";

function UpdateStaffForm() {


    let navigate = useNavigate();
    const params = useParams();
    const {control, handleSubmit, reset} = useForm();

    const handleUpdate = async (data) => {
        try {
            //const resp = await axiosApi.put(`/center/update-delete/${params.center}/` ,data);
           // console.log(resp.data);
            navigate('/center-staff-list');
        } catch (error) {
            console.log(error.response);
        }
    };

    const getStaff = async (e) => {
        try {
            //const res = await axiosApi.get(`/center/get/${params.center}/`);
           // console.log("Staff",res.data);
            //return res.data;
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getStaff().then(reset);
    },[]);



    return (
        <div>
            <Typography variant="h3" color={green[800]} marginTop={2}>
                Update the Center Administrator
            </Typography>
            <Grid
                container
                rowSpacing={2}
                sx={{ padding: "55px 550px 0px 550px" }}
            >
                <Grid item xs={12}>
                    <InputTextField
                        name="first_name"
                        control={control}
                        variant="filled"
                        label="first name"
                        autoFocus
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="last_name"
                        control={control}
                        variant="filled"
                        label="last name"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="phone_number"
                        control={control}
                        variant="filled"
                        label="phone number"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="address"
                        control={control}
                        variant="filled"
                        label="address"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="city"
                        control={control}
                        variant="filled"
                        label="city"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="country"
                        control={control}
                        variant="filled"
                        label="country"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit(handleUpdate)}
                        sx={{
                            mt: 3,
                            mb: 2,
                            background: "#6fbf73",
                            height: "30",
                            "&.MuiButtonBase-root": {
                                "&:hover": {
                                    backgroundColor: green[600],
                                },
                            },
                        }}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default UpdateStaffForm;
