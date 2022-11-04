import { Button, IconButton, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CachedIcon from "@mui/icons-material/Cached";
import { green } from "@mui/material/colors";
import axiosApi from "../api/axios";
import { useNavigate } from "react-router-dom";



const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
        field: "first_name",
        headerName: "First name",
        type: "string",
        width: 200,
        editable: false,
    },
    {
        field: "last_name",
        headerName: "Last name",
        type: "string",
        width: 200,
        editable: false
    },
    {
        field: "email",
        headerName: "Email",
        type: "string",
        width: 200,
        editable: false
    },
    {
        field: "phone_number",
        headerName: "Phone number",
        type: "string",
        width: 200,
        editable: false,
    },
    {
        field: "address",
        headerName: "Address",
        type: "string",
        width: 150,
        editable: false,
    },
    {
        field: "city",
        headerName: "City",
        type: "string",
        width: 300,
        editable: false,
    },
    {
        field: "country",
        headerName: "Country",
        type: "string",
        width: 150,
        editable: false,
    }
];

function DataGridSearchComponent() {
    const [centers, setCenters] = useState([]);

    useEffect(() => {
        getData();
    }, [searchTerm]);

    let getData = async () => {
            axiosApi
                .get("/center/list") 
                .then((response) => {
                    setCenters(response.data);
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
                    Center Administrators
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
                        rows={centers}
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
