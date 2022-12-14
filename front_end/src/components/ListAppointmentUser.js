import { Button,Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { green } from "@mui/material/colors";
import axiosApi from "../api/axios";
import { useNavigate, useParams } from 'react-router-dom';
import ReadMoreIcon from "@mui/icons-material/ReadMore";




function refreshPage(){
    window.location.reload();
}

const RenderStartButton = (params) => {
    let navigate = useNavigate();
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    navigate('/questionnaire/'+params.row.id);
                }}
            >
                Start
            </Button>
        </strong>
    )
};


const RenderPenaltyButton = (params) => {
    let navigate = useNavigate();

        return (
        <strong>
            <Button
                variant="contained"
                color="error"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    console.log(params.row.user_profile);
                    axiosApi.put(`/account/users/increase-penalty-points/${params.row.user_profile}`).then(axiosApi.delete(`/appointment/delete-appointment/${params.row.id}`));
                    refreshPage();
                }}
            >
                Penalty
            </Button>
        </strong>
    )
};

/*const RenderDetailsButton = (params) => {
    let navigate = useNavigate();
    return (
        <strong>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    navigate('/user-details/'+params.row.id);
                }}
            >
                Details
            </Button>
        </strong>
    )
};*/


const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
        field: "date_time",
        headerName: "Date and Time",
        type: "string",
        width: 500,
        editable: false,
    },
    {
        field: "duration",
        headerName: "Duration (minutes)",
        type: "string",
        width: 300,
        editable: false
    },
    {
        field: "start",
        headerName: "Start Appointment",
        width: 300,
        renderCell: RenderStartButton,
        disableClickEventBubbling: true  
    },
    {
        field: "did_not_come",
        headerName: "User did not come",
        width: 300,
        renderCell: RenderPenaltyButton,
        disableClickEventBubbling: true  
    }
];

function DataGridListAppointmentUser() {
    const [appointments, setAppointments] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    },
    []);

    let getData = async () => {
        //console.log(params.user);
            axiosApi
                .get(`/appointment/staff-appointments-for-user/${params.user}`) 
                .then((response) => {
                    response.data.forEach((app) => {
                        app.date = app.date_time
                        app.date_time = app.date_time.split("T")[0] + " " + app.date_time.split("T")[1].split("Z")[0]
                    })
                    setAppointments(response.data);
                });
      
    };

    return (
        <div>
            <Stack direction={"row"} sx={{ justifyContent: "center" }}>
                <Typography
                    component="h1"
                    variant="h4" 
                    color={green[800]}
                    marginBottom={3}
                    marginTop={1}
                >
                    User Appointments
                </Typography>
            </Stack>
            <Stack direction={"row"} sx={{ justifyContent: "start"}} p={2}>
            </Stack>
            <Paper>
                <Box sx={{ height: 700, width: "100%" }}>
                    <DataGrid
                        rows={appointments}
                        columns={columns}
                        autoHeight
                        density="comfortable"
                        disableSelectionOnClick
                        rowHeight={50}
                        pageSize={5}
                        headerHeight={35}                     
                    />
                </Box>
            </Paper>
        </div>
    );
}

export default DataGridListAppointmentUser;
