import React from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography, IconButton } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from "../api/axios";
import {useForm} from "react-hook-form";
import InputTextField from "./InputTextField";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

function UpdateCenterForm() {


    let navigate = useNavigate();
    const params = useParams();
    const {control, handleSubmit, reset} = useForm();
    const [alert, setAlert] = React.useState(false);
    const [failed, setFailed] = React.useState(false);
    const [err, setErr] = React.useState("");

    const handleUpdate = async (data) => {
        try {
            await axiosApi.put(`/center/update-delete/${params.center}/` ,data).then(res => {
                console.log(res)
                setAlert(true)
            }).catch(err => {
                console.log(err.response);
                setFailed(true)
                setErr(err.response.data.message)
            });

        }
        catch (error) {
            console.log(error)
            setFailed(true)
        }
    };

    const getCenter = async (e) => {
        try {
            const res = await axiosApi.get(`/center/get/${params.center}/`);
            return res.data;
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getCenter().then(reset);
    },[]);



    return (
        <div>
            <Typography variant="h4" color={green[800]} marginTop={2}>
                Update a Center
            </Typography>
            <Grid
                container
                rowSpacing={2}
                sx={{ padding: "55px 550px 0px 550px" }}
            >
                <Grid item xs={12}>
                    <InputTextField
                        name="name"
                        control={control}
                        variant="filled"
                        label="name"
                        autoFocus
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
                        name="street"
                        control={control}
                        variant="filled"
                        label="street"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="building_number"
                        control={control}
                        variant="filled"
                        label="building number"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                <InputTextField
                        name="description"
                        control={control}
                        variant="filled"
                        label="description"
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

            <Box sx={{ width: "100%" }}>
                    <Collapse in={alert}>
                        <Alert
                            severity="success"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setAlert(false);
                                        navigate('/list-centers-update');
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Successfuly updated transfusion center!
                        </Alert>
                    </Collapse>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Collapse in={failed}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setFailed(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {err}
                        </Alert>
                    </Collapse>
                </Box>
        </div>
    );
}

export default UpdateCenterForm;
