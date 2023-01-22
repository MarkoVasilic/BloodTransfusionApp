import React from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from "../api/axios";
import {useForm} from "react-hook-form";
import InputTextField from "./InputTextField";

function UpdateCenterForm() {


    let navigate = useNavigate();
    const params = useParams();
    const {control, handleSubmit, reset} = useForm();
    const [alert, setAlert] = React.useState(false);

    const handleUpdate = async (data) => {
        try {
            const resp = await axiosApi.put(`/center/update-delete/${params.center}/` ,data);
            navigate('/list-centers-update');
        } catch (error) {
            console.log(error.response);
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
        </div>
    );
}

export default UpdateCenterForm;
