import React from "react";
import { Typography, Stack, Button } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import axiosApi from "../api/axios";
import { useParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";


function UserQuestionnaireView() {
    let navigate = useNavigate();
    const params = useParams();
    const [questionnaire, setQuestionnaire] = useState({});
    const [appointment, setAppointment] = useState({});
    let getQuestionnaire = async () => {
        try {
            axiosApi.get(`/appointment/${params.id}/`).then((response) => {
                setAppointment(response.data);
                console.log(response.data);
                let id = response.data.user_profile;
                axiosApi
                    .get(`/questionnaire/get-quest/${id}/`)
                    .then((response) => {
                        setQuestionnaire(response.data);
                    });
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getQuestionnaire();
    }, []);

    return (
        <div>
            {!appointment && <div>Loading...</div>}
            {appointment && (
                <div>
                    <Typography variant="h5" align={"left"} fontWeight={"bold"}>
                        ID: {questionnaire.id}
                    </Typography>
                    <Stack spacing={2} p={5}>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Current weight less than 50 kg:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.Less_than_50kg === true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.Less_than_50kg === true
                                    ? "Yes"
                                    : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Flu:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.flu === true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.flu === true ? "Yes" : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Any other illness:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.other_sickness === true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.other_sickness === true
                                    ? "Yes"
                                    : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Patient feeling Good:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.feel_good === true
                                        ? green[700]
                                        : "error"
                                }
                                align={"left"}
                            >
                                {questionnaire.feel_good === true
                                    ? "Yes"
                                    : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Any changes on their skin:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.changes_on_skin === true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.changes_on_skin === true
                                    ? "Yes"
                                    : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Bad high blood pressure:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.blood_preasure_high === true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.blood_preasure_high === true
                                    ? "Yes"
                                    : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Bad low blood pressure:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.blood_preasure_low === true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.blood_preasure_low === true
                                    ? "Yes"
                                    : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Currently using any medications:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.using_medicine === true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.using_medicine === true
                                    ? "Yes"
                                    : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Any medicine in last 7 days:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.last_medicine_in_last_7_days ===
                                    true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.last_medicine_in_last_7_days ===
                                true
                                    ? "Yes"
                                    : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Currently on menstrual period:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.on_menstruation_period ===
                                    true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.on_menstruation_period === true
                                    ? "Yes"
                                    : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Dental interventions in last 7 days:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.dental_interventions_in_last_7_days ===
                                    true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.dental_interventions_in_last_7_days ===
                                true
                                    ? "Yes"
                                    : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Flu:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.flu === true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.flu === true ? "Yes" : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Surgeries in last 6 months:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.surgery_in_last_6_months ===
                                    true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.surgery_in_last_6_months === true
                                    ? "Yes"
                                    : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Blood transfusion in last 6 months:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.blood_tranfusion_in_last_6_months ===
                                    true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.blood_tranfusion_in_last_6_months ===
                                true
                                    ? "Yes"
                                    : "No"}
                            </Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant="h5" align={"left"}>
                                Pregnancy Status:
                            </Typography>
                            <Typography
                                variant="h5"
                                color={
                                    questionnaire.pregnant === true
                                        ? "error"
                                        : green[700]
                                }
                                align={"left"}
                            >
                                {questionnaire.pregnant === true ? "Yes" : "No"}
                            </Typography>
                        </Stack>
                        <Stack
                            direction={"row"}
                            sx={{ justifyContent: "space-between" }}
                        >
                            <Button
                                variant="contained"
                                onClick={()=>{navigate(-1);}}
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    background: red[400],
                                    height: "30",
                                    "&.MuiButtonBase-root": {
                                        "&:hover": {
                                            backgroundColor: red[600],
                                        },
                                    },
                                }}
                            >
                                Back
                            </Button>
                            <Button
                                variant="containted"
                                onClick={()=>{navigate(`/create-report/${params.id}`);}}
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    background: "#6fbf73",
                                    height: "40px",
                                    width: "100px",
                                    "&.MuiButtonBase-root": {
                                        "&:hover": {
                                            backgroundColor: green[600],
                                        },
                                    },
                                }}
                            >
                                Next
                                <NavigateNextIcon/>
                            </Button>
                        </Stack>
                    </Stack>
                </div>
            )}
        </div>
    );
}

export default UserQuestionnaireView;
