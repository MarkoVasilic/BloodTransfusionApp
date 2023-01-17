import React from "react";
import { Button, Typography, Stack } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosApi from "../api/axios";
import { TextField } from "@mui/material";
import axios from "axios";

function UpdateComplaintForm() {
    let navigate = useNavigate();

    const params = useParams();
    const [complaint, setComplaint] = useState({});
    const [reply, setReply] = useState("");
    const [center, setCenter] = useState({});
    const [user, setUser] = useState(false);

    const handleUpdate = async (data) => {
        try {
            const resp = await axiosApi.put(`/complaints/transactional-update/${params.id}/`, {
                id: complaint.id,
                text: complaint.text,
                transfusion_center: complaint.transfusion_center,
                user_profile: complaint.user_profile,
                staff: complaint.staff,
                response: reply,
            });
            navigate("/list-complaints");
        } catch (error) {
            console.log(error.response);
            alert("Transaction alert, Other Admins are replying to the same complaint!");
        }
    };

    let getComplaint = async () => {
        try {
            axiosApi.get(`/complaints/${params.id}/`).then((response) => {
                setComplaint(response.data);
                axiosApi
                    .get(`/center/get/${response.data.transfusion_center}`)
                    .then((res) => {
                        setCenter(res.data);
                    });
                axiosApi
                    .get(`/account/users/${response.data.staff}`)
                    .then((res) => {
                        setUser(res.data);
                    });
            });
        } catch (error) {
            console.log(error.response);
            alert(error.response);
        }
    };

    useEffect(() => {
        getComplaint();
    }, []);

    useEffect(() => {}, [reply]);

    return (
        <div>
            <Stack spacing={2}>
                <Typography variant="h5" color={green[900]} align={"left"}>
                    ID: {complaint.id}
                </Typography>
                {center && (
                    <Typography variant="h6" color={green[900]} align={"left"}>
                        Complaint for Center: {center.name}
                    </Typography>
                )}
                {user  && (
                    <Typography variant="h6" color={green[900]} align={"left"}>
                        Complaint for Staff: {user.first_name} {user.last_name}
                    </Typography>
                ) }
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
