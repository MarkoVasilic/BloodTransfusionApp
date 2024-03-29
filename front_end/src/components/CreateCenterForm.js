import React from "react";
import Grid from "@mui/material/Grid";
import { Button, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../api/axios";
import Alert from "@mui/material/Alert";

const url = "/center/create/";

function CreateCenterForm() {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [building_number, setBuildingNumber] = useState("");
    const [description, setDescription] = useState("");
    const [successAlert, setSuccessAlert] = React.useState("hidden");
    const [errorAlert, setErrorAlert] = React.useState("hidden");
    const [alert, setAlert] = React.useState("");
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axiosApi.post(url, {
                name,
                country,
                city,
                street,
                building_number,
                description,
            });
            setSuccessAlert("visible");
            setErrorAlert("hidden");
            setAlert("success");
            navigate("/list-centers");
        } catch (error) {
            setErrorAlert("visible");
            setSuccessAlert("hidden");
            setAlert("error");

        }
    };

    return (
        <div>
            <Typography
                component="h1"
                variant="h4"
                color={green[800]}
                marginTop={2}
            >
                Create a Center
            </Typography>
            <Grid
                container
                rowSpacing={2}
                sx={{ padding: "55px 550px 0px 550px" }}
            >
                <Grid item xs={12}>
                    <TextField
                        value={name}
                        variant="filled"
                        label="Name"
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={country}
                        variant="filled"
                        label="Country"
                        onChange={(e) => setCountry(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={city}
                        variant="filled"
                        label="City"
                        onChange={(e) => setCity(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={street}
                        variant="filled"
                        label="Street"
                        onChange={(e) => setStreet(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={building_number}
                        variant="filled"
                        label="Building Number"
                        onChange={(e) => setBuildingNumber(e.target.value)}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={description}
                        variant="filled"
                        label="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        
                    />
                </Grid>
                <Grid item xs={12}>
                    {alert === "success" ? (
                        <Alert
                            sx={{ visibility: successAlert }}
                            severity="success"
                        >
                            Center was created successfully!
                        </Alert>
                    ) : (
                        <Alert sx={{ visibility: errorAlert }} severity="error">
                            Please try again!
                        </Alert>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            mt: 3,
                            mb: 2,
                            background: "#6fbf73",
                            height: "30",
                            "&.MuiButtonBase-root": {
                                "&:hover": {
                                    backgroundColor: green[600]
                                }
                                }
                        }}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default CreateCenterForm;
