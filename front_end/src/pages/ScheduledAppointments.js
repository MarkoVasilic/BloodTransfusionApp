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
        field: "transfusion_center",
        headerName: "Transfusion Center",
        type: "string",
        width: 400,
        sortable: false,
        filterable: false,
        editable: false,
    }
];

function rowAction(navigate, user, setAlert, setFailed, setErr, alert) {
    return {
        field: "action",
        headerName: "Cancel",
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation();
                const thisRow = params.row;
                thisRow.date_time = thisRow.date
                thisRow.user_profile = user.id
                try {
                    axiosApi.put(`appointment/cancel/${thisRow.id}`, thisRow).then(res => {
                        console.log(res)
                        setAlert(true)
                    }).catch(err => {
                        console.log(err.response);
                        setFailed(true)
                        setErr(err.response.data.message)
                    });
                } catch (error) {
                    console.log(error.response);
                    setFailed(true)
                }
            };
            return (
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={onClick}
                    disabled={alert}
                >
                    Cancel
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
    const [failed, setFailed] = React.useState(false);
    const [err, setErr] = React.useState("");
    const listOfAllowedUsers = ["TranfusionCenterUser"];
    const navigate = useNavigate();
    const [ errorAppointment, setErrorAppointment ]= React.useState(state);

    let getData = async () => {
        console.log("AAAAAAAAAAAAAA",state);
        try {
            await axiosApi.get('/account/users/user-profile/').then((res) => {
                setUser(res.data);
                if (sortby === 0) {
                    axiosApi.get(`/appointment/user-scheduled/${res.data.id}`).then((response) => {
                        response.data.forEach((app) => {
                            app.date = app.date_time
                            app.date_time = app.date_time.split("T")[0] + " " + app.date_time.split("T")[1].split("Z")[0]
                        })
                        setAppointments(response.data);
                    });
                } else {
                    axiosApi
                        .get(`/appointment/user-scheduled/${res.data.id}?${sortby !== "" ? `ordering=${direction}${sortby}&` : ""}`)
                        .then((response) => {
                            response.data.forEach((app) => {
                                app.date = app.date_time
                                app.date_time = app.date_time.split("T")[0] + " " + app.date_time.split("T")[1].split("Z")[0]
                            })
                            setAppointments(response.data);
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
    const getUser = async (e) => {
        
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
            <AllowedUsers userRole = {listOfAllowedUsers}/>
            <Stack direction={"row"} sx={{ justifyContent: "center" }}>
                <Typography
                    component="h1"
                    variant="h4"
                    color={green[800]}
                    marginBottom={3}
                    marginTop={1}
                >
                    Your Appointments
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
            <Box sx={{ width: "100%" }}>
                <Collapse in={errorAppointment}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setErrorAppointment(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        You cannot schedule appointment because you had appointment in the last 6 months!
                    </Alert>
                </Collapse>
            </Box>
            <Paper>
                <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={appointments}
                        disableColumnFilter
                        columns={[...columns, rowAction(navigate, user, setAlert, setFailed, setErr, alert)]}
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
                            Appointment cancelation successfull!
                        </Alert>
                    </Collapse>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Collapse in={failed}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setFailed(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {err}
                        </Alert>
                    </Collapse>
                </Box>
            </Paper>
        </div>
    );
}
