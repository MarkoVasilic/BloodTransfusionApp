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
        field: "date_time",
        headerName: "Date and Time",
        type: "string",
        width: 600,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "qrcode_url",
        renderCell: (params) => (
            <div>
                <img
                    src={params.value}
                    alt="qrcode"
                    height={120}
                    width={120}
                />
            </div>
        ),
        headerName: "QR Code URL",
        type: "string",
        width: 600,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "status",
        headerName: "Status",
        type: "string",
        width: 200,
        sortable: false,
        filterable: false,
        editable: false,
    }
];

export default function UserAppointmentHistory() {
    const [appointments, setAppointments] = useState([]);
    const [sortby, setSortBy] = React.useState('');
    const [direction, setDirection] = React.useState('');
    const [filter, setFilter] = React.useState('');
    const [user, setUser] = useState(null);
    const listOfAllowedUsers = ["TranfusionCenterUser"];
    let getData = async () => {
        try {
            await axiosApi.get('/account/users/user-profile/').then((res) => {
                setUser(res.data);
                if (sortby === 0) {
                    axiosApi.get(`/appointment/qrcodes/`).then((response) => {
                        let rows = []
                        response.data.forEach((app) => {
                            app.date = app.date_time
                            app.date_time = app.date_time.split("T")[0] + " " + app.date_time.split("T")[1].split("Z")[0]
                            if (app.accepted == true)
                                app['accepted'] = 'Yes'
                            else
                                app['accepted'] = 'No'
                            app.qrcode_url =
                                rows.push(app)
                        })
                        setAppointments(rows);
                    });
                } else {
                    axiosApi
                        .get(`/appointment/qrcodes?${sortby !== "" ? `ordering=${direction}${sortby}&` : ""}${filter != "" ? `filter=${filter}&` : ""}`)
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
    }, [sortby, direction, filter]);

    const handleChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleDirection = (event) => {
        setDirection(event.target.value);
    };

    const handleFilter = (event) => {
        setFilter(event.target.value);
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
                    Your QR Codes
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
                        <MenuItem value={"date_time"}>Date and Time</MenuItem>
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
            <Stack direction={"row"} sx={{ justifyContent: "start" }} p={1}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">Filter By</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={filter}
                        onChange={handleFilter}
                        defaultValue={""}
                    >
                        <MenuItem value={""}>None</MenuItem>
                        <MenuItem value={"New"}>New</MenuItem>
                        <MenuItem value={"Accepted"}>Accepted</MenuItem>
                        <MenuItem value={"Refused"}>Refused</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <Paper>
                <Box sx={{ height: 1400, width: "100%" }}>
                    <DataGrid
                        rows={appointments}
                        disableColumnFilter
                        columns={[...columns]}
                        autoHeight
                        density="comfortable"
                        disableSelectionOnClick
                        rowHeight={120}
                        pageSize={5}
                        headerHeight={35}
                    />
                </Box>
            </Paper>
        </div>
    );
}
