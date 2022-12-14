import { React, useCallback } from "react";
import {
    Typography,
    Stack,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import axiosApi from "../api/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import DoneIcon from "@mui/icons-material/Done";
import InputTextField from "./InputTextField";
import Alert from "@mui/material/Alert";

/*
 */
function ReportForm() {
    let navigate = useNavigate();
    const params = useParams();
    const { handleSubmit, control } = useForm({
        defaultValues: {
            equipmentQuantity: 0,
            amount_of_blood: 0,
        },
    });
    const [appointment, setAppointment] = useState({});
    const [questionnaire, setQuestionnaire] = useState({});
    const [equipments, setEquipments] = useState([]);
    const [bloodPacket, setBloodPacket] = useState({});
    const [user, setUser] = useState({});
    const [successAlert, setSuccessAlert] = useState("hidden");
    const [errorAlert, setErrorAlert] = useState("hidden");
    const [alert, setAlert] = useState("");
    const [erorrMessage, setErrorMessage] = useState("");
    const [doPost, setDoPost] = useState(false);

    let getQuestionnaire = async () => {
        try {
            axiosApi.get(`/appointment/${params.id}/`).then((response) => {
                setAppointment(response.data);
                let id = response.data.user_profile;
                axiosApi
                    .get(`/questionnaire/get-quest/${id}/`)
                    .then((response) => {
                        setQuestionnaire(response.data);
                    });
                axiosApi.get(`/account/users/${id}`).then((response) => {
                    setUser(response.data);

                });
            });
        } catch (error) {
            console.log(error.response);
            setErrorMessage("Unable to load the data, please try again!");
            setAlert("error");
            setErrorAlert("visible");
            setSuccessAlert("hidden");
        }
    };

    useEffect(() => {
        getQuestionnaire();
    }, []);

    useEffect(() => {
        try {
        if(doPost === true){
            axiosApi.post(`/report/`, {appointment: appointment.id, blood_packet: bloodPacket.id, questionnaire: questionnaire.id, equipment: [equipments.id], accepted: true,})
            .then((response) => {
                console.log(response.data);
                setSuccessAlert("visible");
                setErrorAlert("hidden");
                setAlert("success");
            });
        }
    }
    catch {
        setErrorMessage(
            "Report for this appointment was already created!"
        );
        setAlert("error");
        setErrorAlert("visible");
        setSuccessAlert("hidden");
    }
    }, [doPost]);

    const handleUpdate = useCallback(
        (data) => {
            axiosApi
                .get(`/report/duplicate/${appointment.id}`)
                .then((response) => {
                    if (response.data == true) {
                        setErrorMessage(
                            "Report for this appointment was already created!"
                        );
                        setAlert("error");
                        setErrorAlert("visible");
                        setSuccessAlert("hidden");
                       // navigate("/check-QR-code");
                    }
                    else {       
                        if (data.equipmentQuantity > 0) {
                            axiosApi
                                .post(`/equipment/`, {
                                    name: data.equipments,
                                    quantity: data.equipmentQuantity,
                                    transfusion_center: appointment.transfusion_center,
                                })
                                .then((response) => {
                                    console.log(response.data);
                                    setEquipments(response.data);
                                });
                        }
                        if (data.amount_of_blood > 0) {
                            axiosApi
                                .post(`/bloodpacket/`, {
                                    name: data.bloodType,
                                    quantity: data.amount_of_blood,
                                    transfusion_center: appointment.transfusion_center,
                                })
                                .then((response) => {
                                    console.log(response.data);
                                    setBloodPacket(response.data);
                                    setDoPost(true);
                                });
                            
                        }
                    }
                });
            

        },
        [appointment, questionnaire, equipments, bloodPacket]
    );

    const handleCancel = useCallback(
        (data) => {
            axiosApi
                .post(`/report/`, {
                    questionnaire: questionnaire.id,
                    appointment: appointment.id,
                    accepted: false,
                })
                .then((response) => {
                    console.log(response.data);
                    setSuccessAlert("hidden");
                    setErrorAlert("visible");
                    setAlert("error");
                    // navigate("/check-QR-code");
                });
        },
        [questionnaire, appointment]
    );

    return (
        <div>
            {!user && <div>Loading...</div>}
            {user && (
                <div>
                    <Grid
                        container
                        rowSpacing={3}
                        p={1}
                        justify="center"
                        alignItems="center"
                        direction="column"
                    >
                        <Grid item xs={12} align="left">
                            {" "}
                            <Typography
                                variant="h7"
                                color={green[900]}
                                marginLeft={"40px"}
                            >
                                Report for patient:{" "}
                            </Typography>
                            <Typography variant="h4" color={green[900]}>
                                {user.first_name + " " + user.last_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="blood_type"
                                control={control}
                                defaultValue="N"
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <FormControl variant="filled">
                                        <InputLabel id="demo-simple-select-filled-label">
                                            Blood Type
                                        </InputLabel>
                                        <Select
                                            sx={{ width: "220px" }}
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            value={value}
                                            onChange={onChange}
                                        >
                                            <MenuItem value={"A_POS"}>
                                                A POSITIVE
                                            </MenuItem>
                                            <MenuItem value={"A_NEG"}>
                                                A NEGATIVE
                                            </MenuItem>
                                            <MenuItem value={"B_POS"}>
                                                B POSITIVE
                                            </MenuItem>
                                            <MenuItem value={"B_NEG"}>
                                                B NEGATIVE
                                            </MenuItem>
                                            <MenuItem value={"AB_POS"}>
                                                AB POSITIVE
                                            </MenuItem>
                                            <MenuItem value={"AB_NEG"}>
                                                AB NEGATIVE
                                            </MenuItem>
                                            <MenuItem value={"O_POS"}>
                                                0 POSITIVE
                                            </MenuItem>
                                            <MenuItem value={"O_NEG"}>
                                                0 NEGATIVE
                                            </MenuItem>
                                            <MenuItem value={"N"}>
                                                Unknown
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputTextField
                                control={control}
                                name={"amount_of_blood"}
                                label="Amount:"
                                type={"number"}
                                variant="filled"
                                required
                                helperText="Number of liters"
                                
                            ></InputTextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="equipments"
                                control={control}
                                defaultValue="N"
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <FormControl variant="filled">
                                        <InputLabel id="demo-simple-select-filled-label">
                                            Equipment
                                        </InputLabel>
                                        <Select
                                            sx={{ width: "220px" }}
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            value={value}
                                            onChange={onChange}
                                        >
                                            <MenuItem value={"ZAVOJ"}>
                                                Zavoj
                                            </MenuItem>
                                            <MenuItem value={"IGLA"}>
                                                Igla
                                            </MenuItem>
                                            <MenuItem value={"FLASTER"}>
                                                Flaster
                                            </MenuItem>
                                            <MenuItem value={"EPRUVETA"}>
                                                Epruveta
                                            </MenuItem>
                                            <MenuItem value={"N"}>
                                                None
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputTextField
                                label="Quantity:"
                                type={"number"}
                                control={control}
                                name={"equipmentQuantity"}
                                variant="filled"
                                required
                                helperText="Number of items"
                                fullWidth
                            ></InputTextField>
                        </Grid>
                        <Grid item xs={12}>
                            {alert === "success" ? (
                                <Alert
                                    sx={{ visibility: successAlert }}
                                    severity="success"
                                >
                                    Report was created successfully!
                                </Alert>
                            ) : (
                                <Alert
                                    sx={{ visibility: errorAlert }}
                                    severity="error"
                                >
                                    {erorrMessage}
                                </Alert>
                            )}
                        </Grid>
                    </Grid>
                    <Stack direction={"row"} sx={{ justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            onClick={handleSubmit(handleCancel)}
                            sx={{
                                mt: 0.3,
                                mb: 2,
                                background: red[400],
                                height: "40px",
                                width: "200px",
                                marginRight: "20px",
                                "&.MuiButtonBase-root": {
                                    "&:hover": {
                                        backgroundColor: red[800],
                                    },
                                },
                            }}
                        >
                            Decline
                        </Button>
                        <Button
                            variant="containted"
                            onClick={handleSubmit(handleUpdate)}
                            sx={{
                                mt: 0.3,
                                mb: 2,
                                background: "#6fbf73",
                                height: "40px",
                                width: "200px",
                                "&.MuiButtonBase-root": {
                                    "&:hover": {
                                        backgroundColor: green[600],
                                    },
                                },
                            }}
                        >
                            Submit
                            <DoneIcon />
                        </Button>
                    </Stack>
                </div>
            )}
        </div>
    );
}

export default ReportForm;
