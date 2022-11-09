import React from "react";
import { Button, Typography, Stack } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../api/axios";
import { TextField } from "@mui/material";


function UpdateComplaintForm() {
    let navigate = useNavigate();

    const params = useParams();
    const [complaint, setComplaint] = useState({});
    const [reply, setReply] = useState("");

    const handleUpdate = async (data) => {
        try {
            const resp = await axiosApi.put(`/complaints/${params.id}/`, {id: 2, text:"mojtekst", transfusion_center: 17, user_profile: 28});
            console.log(resp.data);
            navigate("/list-complaints");
        } catch (error) {
            console.log(error.response);
        }
    };

    let getComplaint = async () => {
        try {
            axiosApi.get(`/complaints/${params.id}/`).then((response) => {
                setComplaint(response.data);
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getComplaint();
    }, []);

    useEffect(() => {
    }, [reply]);

    return (
        <div>
            <Stack spacing={2}>
                <Typography variant="h5" color={green[900]} align={"left"}>
                    ID: {complaint.id}
                </Typography>
                <Typography variant="h7" color={green[700]} align={"left"}>
                    {complaint.text}
                </Typography>
                <Typography variant="h5" color={green[900]} align={"left"}>
                    Reply:
                </Typography>
                <TextField
                    multiline
                    rows={6}
                    onChange={(e) => setReply(e.target.value)}
                ></TextField>
                <Stack alignItems={"center"}>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={handleUpdate}
                        sx={{
                            mt: 3,
                            mb: 2,
                            background: "#6fbf73",
                            width: "400px",
                            "&.MuiButtonBase-root": {
                                "&:hover": {
                                    backgroundColor: green[600],
                                },
                            },
                        }}
                    >
                        Reply
                    </Button>
                </Stack>
            </Stack>
        </div>
    );
}

export default UpdateComplaintForm;
