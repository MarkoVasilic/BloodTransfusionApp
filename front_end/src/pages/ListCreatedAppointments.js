import { IconButton, Button, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState, Controller } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CachedIcon from "@mui/icons-material/Cached";
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
        field: "transfusion_center",
        headerName: "Transfusion Center",
        type: "string",
        width: 400,
        sortable: false,
        filterable: false,
        editable: false,
    }
];

function rowAction(navigate, user, transfusion_center, setAlert) {
    return {
        field: "action",
        headerName: "Select",
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation();
                const thisRow = params.row;
                thisRow.date_time = thisRow.date_time.split(" ")[0] + "T" + thisRow.date_time.split(" ")[1] + "Z";
                thisRow.user_profile = user.id
                thisRow.transfusion_center = transfusion_center
                try {
                    axiosApi.put(`appointment/update-profile/${thisRow.id}`, thisRow).then(res => {
                    console.log(res)
                    setAlert(true)
                    });
                } catch (error) {
                    console.log(error.response);
                }
            };
            return (
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={onClick}
                >
                    Select
                </Button>
            );
        },
    };
}

export default function ListCreatedAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [sortby, setSortBy] = React.useState('');
    const [direction, setDirection] = React.useState('');
    const { state } = useLocation();
    const [user, setUser] = useState(null);
    const [alert, setAlert] = React.useState(false);
    const navigate = useNavigate();
    const getUser = async (e) => {
        try {
            const res = await axiosApi.get('/account/users/user-profile/');
            setUser(res.data);
            return res.data;
        } catch (error) {
            console.log(error.response);
        }
    };
    useEffect(() => {
        getData();
        getUser();
    }, [sortby, direction]);

    let getData = async () => {
        if (sortby === 0) {
            axiosApi.get(`/appointment/center/${state.id}`).then((response) => {
                response.data.forEach((app) => {
                    app.transfusion_center = state.name;
                    app.date_time = app.date_time.split("T")[0] + " " + app.date_time.split("T")[1].split("Z")[0]
                })
                setAppointments(response.data);
            });
        } else
            axiosApi
                .get(`/appointment/center/${state.id}?${sortby !== "" ? `ordering=${direction}${sortby}&` : ""}`)
                .then((response) => {
                    response.data.forEach((app) => {
                        app.transfusion_center = state.name;
                        app.date = app.date_time.split("T")[0]
                        app.date_time = app.date_time.split("T")[0] + " " + app.date_time.split("T")[1].split("Z")[0]
                    })
                    setAppointments(response.data);
                });
    };

    const handleChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleDirection = (event) => {
        setDirection(event.target.value);
    };

    return (
        <div>
            <Navbar />
            <Stack direction={"row"} sx={{ justifyContent: "center" }}>
                <Typography
                    component="h1"
                    variant="h4"
                    color={green[800]}
                    marginBottom={3}
                    marginTop={1}
                >
                    Select Appointment
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
                        columns={[...columns, rowAction(navigate, user, state.id, setAlert)]}
                        autoHeight
                        density="comfortable"
                        disableSelectionOnClick
                        rowHeight={50}
                        pageSize={5}
                        headerHeight={35}
                    />
                </Box>
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
                        Appointment reservation successfull!
                    </Alert>
                </Collapse>
            </Box>
            </Paper>
        </div>
    );
}
