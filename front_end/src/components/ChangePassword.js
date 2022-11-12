import { Stack, Button, Alert, Typography } from "@mui/material";
import React, { useCallback } from "react";
import InputTextField from "./InputTextField";
import { green, red } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import axiosApi from "../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
const schema = yup
  .object()
  .shape({
    password: yup.string().min(8).required("password must be at least 8 characters"),
    confirm_password: yup.string().min(8, "password must be at least 8 characters").required(),
  }).required();


function ChangePassword() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState({});
    const [error, setError] = useState("");
    const [successAlert, setSuccessAlert] = useState("hidden");
    const [errorAlert, setErrorAlert] = useState("hidden");
    const [alert, setAlert] = useState("");
    const navigate = useNavigate();
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
    const { handleSubmit,register, control } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            password: "",
            confirm_password: "",
        },
    });


    const handleUpdate = useCallback(
        (data) => {
            axiosApi
                .put(
                    `/account/users/change-password/${user.id}/`,
                    { ...data, userprofile: user.userprofile }
                )
                .then((response) => {
                    setAlert("success");
                    setSuccessAlert("visible");
                    setErrorAlert("hidden");
                    setError("");
                    navigate("/");

                })
                .catch((error) => {
                    setError(error.response.data.password[0]);
                    setAlert("error");
                    setSuccessAlert("hidden");
                    setErrorAlert("visible");
                });
        },
        [user, navigate]
    );

    return (
        <div>
            <Stack spacing={2}>
                <InputTextField
                    name="password"
                    label="password"
                    type="password"
                    control={control}
                    rules={{ required: "Password is required"}}
                />

                <InputTextField
                    name="confirm_password"
                    label="confirm password"
                    control={control}
                    type="password"
                    rules={{ required: "Confirmed passsword is required"}}
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

                <Stack direction={"row"} justifyContent={"end"}>
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
                </Stack>
            </Stack>
        </div>
    );
}

export default ChangePassword;
