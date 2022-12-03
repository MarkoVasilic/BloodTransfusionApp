import { IconButton, Button, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState, Controller } from "react";
import Stack from "@mui/material/Stack";
import { green } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import axiosApi from "../api/axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import AllowedUsers from "../components/AllowedUsers";

const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 200,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "date_time",
        headerName: "Date and Time",
        type: "string",
        width: 400,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "duration",
        headerName: "Duration (minutes)",
        type: "string",
        width: 400,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "center_name",
        headerName: "Transfusion Center",
        type: "string",
        width: 400,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "accepted",
        headerName: "Accepted",
        type: "string",
        width: 100,
        sortable: false,
        filterable: false,
        editable: false,
    }
];

export default function UserAppointmentHistory() {
    const [appointments, setAppointments] = useState([]);
    const [sortby, setSortBy] = React.useState('');
    const [direction, setDirection] = React.useState('');
    const [user, setUser] = useState(null);
    const listOfAllowedUsers = ["TranfusionCenterUser"];
    const navigate = useNavigate();
    let getData = async () => {
        try {
            await axiosApi.get('/account/users/user-profile/').then((res) => {
                setUser(res.data);
                if (sortby === 0) {
                    axiosApi.get(`/appointment/user/`).then((response) => {
                        let rows = []
                        response.data.forEach((app) => {
                            app.date = app.date_time
                            app.date_time = app.date_time.split("T")[0] + " " + app.date_time.split("T")[1].split("Z")[0]
                            if (app.accepted == true)
                                app['accepted'] = 'Yes'
                            else
                                app['accepted'] = 'No'
                            rows.push(app)
                        })
                        setAppointments(rows);
                    });
                } else {
                    axiosApi
                        .get(`/appointment/user?${sortby !== "" ? `ordering=${direction}${sortby}&` : ""}`)
                        .then((response) => {
                            let rows = []
                            response.data.forEach((app) => {
                                app.date = app.date_time
                                app.date_time = app.date_time.split("T")[0] + " " + app.date_time.split("T")[1].split("Z")[0]
                                if (app.accepted == true)
                                    app['accepted'] = 'Yes'
                                else
                                    app['accepted'] = 'No'
                                rows.push(app)
                            })
                            setAppointments(rows);
                        });
                }
                return res.data;
            });
        } catch (error) {
            console.log(error.response);
        }
    };
    useEffect(() => {
        getData();
    }, [sortby, direction]);

    const handleChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleDirection = (event) => {
        setDirection(event.target.value);
    };

    return (
        <div>
            <Navbar />
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <Stack direction={"row"} sx={{ justifyContent: "center" }}>
                <Typography
                    component="h1"
                    variant="h4"
                    color={green[800]}
                    marginBottom={3}
                    marginTop={1}
                >
                    Your Appointments History
                </Typography>
            </Stack>
            <Stack direction={"row"} sx={{ justifyContent: "start" }} p={1}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">SortBy</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={sortby}
                        onChange={handleChange}
                        defaultValue={0}
                    >
                        <MenuItem value={0}>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"id"}>Id</MenuItem>
                        <MenuItem value={"date_time"}>Date and Time</MenuItem>
                        <MenuItem value={"duration"}>Duration</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <Stack direction={"row"} sx={{ justifyContent: "start" }} p={1}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">Order</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={direction}
                        onChange={handleDirection}
                        defaultValue={""}
                    >
                        <MenuItem value={""}>Ascending</MenuItem>
                        <MenuItem value={"-"}>Descending</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <Paper>
                <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={appointments}
                        disableColumnFilter
                        columns={[...columns]}
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
