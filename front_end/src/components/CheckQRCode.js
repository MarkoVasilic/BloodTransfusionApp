import { Stack, Button, Alert, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { green, purple, red } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import axiosApi from "../api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import QrCodeIcon from "@mui/icons-material/QrCode";
import QrScanner from "qr-scanner";
import { wait } from "@testing-library/user-event/dist/utils";
const schema = yup
    .object()
    .shape({
        files: yup.mixed().test("required", "Please select a file", (value) => {
            return value && value.length;
        }),
    })
    .required();

function CheckQRCode() {
    const [user, setUser] = useState("");
    const [result, setResult] = useState({});
    const [fileName, setFileName] = useState("");
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

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

    const onSubmit = (data) => {
        console.log(data);
        setFileName(data.files[0].name);
        QrScanner.scanImage(data.files[0], { returnDetailedScanResult: true })
            .then((result) => {
                setResult(result);
                var id = result.data.slice(7, result.data.indexOf(','));
                axiosApi
                    .get(`appointment/validate/${id}`)
                    .then((response) => {
                        if (response.data == true) {
                            setErrorAlert("hidden");
                            setSuccessAlert("visible");
                            setAlert("success");
                            navigate('/questionnaire/'+id);
                        }
                        else {
                            setError("The selected QR Code is NOT valid!");
                            setErrorAlert("visible");
                            setSuccessAlert("hidden");
                            setAlert("error");
                        }
                    })
                    .catch((error) => {
                            setError("The selected QR Code is NOT valid!");
                            setErrorAlert("visible");
                            setSuccessAlert("hidden");
                            setAlert("error");
                        
                    });
            })
            .catch((e) => console.log("Nije procitao QR kod : ", e));
    };

    return (
        <div>
            <Button
                variant="contained"
                component="label"
                color="secondary"
                sx={{
                    mt: 3,
                    mb: 2,
                    background: "primary",
                    align: "center",
                    height: "50",
                    width: "250px",
                    "&.MuiButtonBase-root": {
                        "&:hover": {
                            backgroundColor: purple["A100"],
                        },
                    },
                }}
            >
                Upload QR Code
                <QrCodeIcon p={2} />
                <input type="file" {...register("files")} hidden />
            </Button>
            <Stack direction={"column"} spacing={"10px"}>
                {alert === "success" ? (
                    <Typography
                        sx={{
                            visibility: successAlert,
                            color: green[400],
                            height: 5,
                        }}
                    >
                        Validation done successfully!
                    </Typography>
                ) : (
                    <Typography
                        sx={{
                            visibility: errorAlert,
                            color: red[400],
                            height: 5,
                        }}
                    >
                        {error}
                    </Typography>
                )}

                <Stack direction={"row"} justifyContent={"end"}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit(onSubmit)}
                        sx={{
                            mt: 3,
                            mb: 2,
                            background: "#6fbf73",
                            height: "50",
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

export default CheckQRCode;
