import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import RadioButtonField from "./RadioButtonField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axiosApi from "../api/axios";
import { green } from "@mui/material/colors";

const RegistrationForm = () => {
    const { handleSubmit, control } = useForm();
    const [alert, setAlert] = React.useState(false);
    let navigate = useNavigate();
    const [user, setUser] = useState("");

    const getData = async () =>
        axiosApi
            .get(`account/users/logged/`)
            .then((response) => {
                setUser(response.data);
            })
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });

    useEffect(() => {
        getData();
    }, []);

    const onSubmit = async (data) => {
        try {
            data.user_profile = user.id;
            await axiosApi.post("/questionnaire/all/", data);
            setAlert(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    container
                    rowSpacing={2}
                    sx={{ padding: "55px 550px 0px 550px", textAlign: "left" }}
                >
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="less_than_50kg"
                                control={control}
                                label="Do you have less than 50kg?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="flu"
                                control={control}
                                label="Do you have flu?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="other_sickness"
                                control={control}
                                label="Do you have some other sickness"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="feel_good"
                                control={control}
                                label="Are you feeling good?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="changes_on_skin"
                                control={control}
                                label="Do you have some changes on skin?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="blood_preasure_high"
                                control={control}
                                label="Do you have high blood preasure?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="blood_preasure_low"
                                control={control}
                                label="Do you have low blood preasure?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="using_medicine"
                                control={control}
                                label="Are you currently using some medicine?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="last_medicine_in_last_7_days"
                                control={control}
                                label="Did you take some medicine in last 7 days?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="on_menstruation_period"
                                control={control}
                                label="Are you currently on menstrual period?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="dental_interventions_in_last_7_days"
                                control={control}
                                label="Did you have some dental inteventions in last 7 days?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="tattoo_piercing_in_last_6_months"
                                control={control}
                                label="Tattoo or piercing in last 6 months?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="surgery_in_last_6_months"
                                control={control}
                                label="Surgery in last 6 months?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="blood_tranfusion_in_last_6_months"
                                control={control}
                                label="Blood transfusion in last 6 months?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <RadioButtonField
                                name="pregnant"
                                control={control}
                                label="Are you pregnant?"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                background: "#6fbf73",
                                marginTop: 2,
                                marginBottom: 5,
                                "&.MuiButtonBase-root": {
                                    "&:hover": {
                                        backgroundColor: green[600],
                                    },
                                },
                            }}
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
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
                                    navigate("/");
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        Submit successfull!
                    </Alert>
                </Collapse>
            </Box>
        </div>
    );
};

export default RegistrationForm;
