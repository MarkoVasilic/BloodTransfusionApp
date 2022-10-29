import { IconButton, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CachedIcon from "@mui/icons-material/Cached";
import { green } from "@mui/material/colors";
import axiosApi from "../api/axios";


const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
        field: "first_name",
        headerName: "First Name",
        type: "string",
        width: 100,
        editable: false,
    },
    {
        field: "last_name",
        headerName: "Last Name",
        type: "string",
        width: 100,
        editable: false,
    },
    {
        field: "email",
        headerName: "Email",
        type: "string",
        width: 180,
        editable: false,
    },
    {
        field: "address",
        headerName: "Address",
        type: "object",
        width: 180,
        editable: false,
        valueGetter: (params) => {return params.row.userprofile.address}
    },
    {
        field: "city",
        headerName: "City",
        type: "string",
        width: 120,
        editable: false,
        valueGetter: (params) => {return params.row.userprofile.city}
    },
    {
        field: "country",
        headerName: "Country",
        type: "string",
        width: 100,
        editable: false,
        valueGetter: (params) => {return params.row.userprofile.country}
    },
    {
        field: "phone_number",
        headerName: "Phone Number",
        type: "string",
        width: 120,
        editable: false,
        valueGetter: (params) => {return params.row.userprofile.phone_number}
    },
    {
        field: "jmbg",
        headerName: "JMBG",
        type: "string",
        width: 140,
        editable: false,
        valueGetter: (params) => {return params.row.userprofile.jmbg}
    },
    {
        field: "profession",
        headerName: "Profession",
        type: "string",
        width: 100,
        editable: false,
        valueGetter: (params) => {return params.row.userprofile.profession}
    },
    {
        field: "workplace",
        headerName: "Workplace",
        type: "string",
        width: 260,
        editable: false,
        valueGetter: (params) => {return params.row.userprofile.workplace}
    },
    {
        field: "gender",
        headerName: "Gender",
        type: "string",
        width: 65,
        editable: false,
        valueGetter: (params) => {return params.row.userprofile.gender}
    },
];

function DataGridSearchComponent() {
    const [korisnici, setKorisnici] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    let token =localStorage.getItem("token");

    useEffect(() => {
        getData();
    }, [searchTerm]);

    let getData = async () => {
        if (searchTerm === "") {
            axiosApi
                .get("/account/users/")
                .then((response) => {
                    setKorisnici(response.data);
                    console.log(axiosApi.defaults.headers.common);
                });
        } else
            axiosApi
                .get(`/account/users?search=${searchTerm}`)
                .then((response) => {
                    console.log("Search", searchTerm);
                    setKorisnici(response.data);
                    console.log("Search", response.data);
                });
    };

    return (
        <div>
            <Stack direction={"row"} sx={{ justifyContent: "center" }}>
                <Typography
                    variant="h3"
                    color={green[800]}
                    marginBottom={3}
                    marginTop={1}
                >
                    Users
                </Typography>
            </Stack>
            <Stack direction={"row"} sx={{ justifyContent: "start"}} p={2}>
                <TextField
                    variant="standard"
                    type="text"
                    placeholder="Search..."
                    onKeyPress={(event) => {
                        if (event.key === "Enter")
                            setSearchTerm(event.target.value);
                            console.log("IF:",event.target.value);
                    }}
                ></TextField>
                <IconButton
                    sx={{background:"#6fbf73"}}
                    onClick={(event) => {
                        setSearchTerm("");
                    }}
                >
                    <CachedIcon />
                </IconButton>
            </Stack>
            <Paper>
                <Box sx={{ height: 700, width: "100%" }}>
                    <DataGrid
                        rows={korisnici}
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

export default DataGridSearchComponent;