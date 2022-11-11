import React from "react";
import Grid from "@mui/material/Grid";
import { Button, TextField, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from "../api/axios";
import { useForm } from "react-hook-form";
import InputTextField from "./InputTextField";

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
const schema = yup
  .object()
  .shape({
    first_name: yup.string().min(3, "please enter first name").required(),
    last_name: yup.string().min(3, "please enter last name").required(),
  }).required();


function UpdateCenterForm() {

    let navigate = useNavigate();
    const {control, handleSubmit, reset} = useForm({
        resolver: yupResolver(schema)
    });
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [successAlert, setSuccessAlert] = useState("hidden");
    const [errorAlert, setErrorAlert] = useState("hidden");
    const [alert, setAlert] = useState("");

    const handleUpdate = async (data) => {
        try {
            if(data.first_name === "" || data.last_name === ""){
                setError("Please enter first and last name");
                setError(error.resp.data.password[0]);
                    setAlert("error");
                    setSuccessAlert("hidden");
                    setErrorAlert("visible");
                    console.log("errr", error.resp.data);
            }else{
            const resp = await axiosApi.put(`/account/users/update/${user.id}/`, data);
            console.log(resp.data);
            setAlert("success");
                    setSuccessAlert("visible");
                    setErrorAlert("hidden");
                    setError("");
            navigate('/user-profile/');
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    const getUser = async (e) => {
        try {
            const res = await axiosApi.get('/account/users/user-profile/');
            console.log("User update",res.data);
            setUser(res.data);
            return res.data;
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getUser().then(reset);
    },[]);

    return (
        <div>
            <Typography variant="h4" color={green[800]} marginTop={2}>
                Update profile
            </Typography>
            <Grid
                container
                marginTop={"-40px"}
                rowSpacing={2}
                sx={{ padding: "55px 550px 0px 550px" }}
            >
                <Grid item xs={12}>
                    <InputTextField
                        name="first_name"
                        control={control}
                        variant="filled"
                        label="First name"
                        autoFocus
                        fullWidth
                        rules={{ required: "First name is required!"}}
                />
{alert === "success" ? (
                        <Typography
                            sx={{ visibility: successAlert, color: green[400], height:5 }}
                            
                        >
                            Password changed successfully!
                        </Typography>
                    ) : (
                        <Typography sx={{ visibility: errorAlert, color: red[400], height:5 }} >
                            {error}
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="last_name"
                        control={control}
                        variant="filled"
                        label="Last name"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="userprofile.address"
                        control={control}
                        variant="filled"
                        label="Address"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="userprofile.city"
                        control={control}
                        variant="filled"
                        label="City"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="userprofile.country"
                        control={control}
                        variant="filled"
                        label="Country"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="userprofile.phone_number"
                        control={control}
                        variant="filled"
                        label="Phone number"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="userprofile.profession"
                        control={control}
                        variant="filled"
                        label="Profession"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="userprofile.workplace"
                        control={control}
                        variant="filled"
                        label="Workplace"
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

export default UpdateCenterForm;
