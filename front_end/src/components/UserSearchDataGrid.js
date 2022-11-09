import { IconButton, Typography,Button } from "@mui/material";
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
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from "react-router-dom";




const RenderDetailsButton = (params) => {
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
                <ReadMoreIcon/>
            </Button>
        </strong>
    )
};


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
        width: 140,
        editable: false,
    },
    {
        field: "address",
        headerName: "Address",
        type: "string",
        width: 140,
        editable: false,
        valueGetter: (params) => {return params.row.userprofile.address}
    },
    {
        field: "city",
        headerName: "City",
        type: "string",
        width: 100,
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
        width: 200,
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
    {
        field: "details",
        headerName: "Details",
        headerAlign: "center",
        align: "center",
        width: 150,
        renderCell: RenderDetailsButton,
        disableClickEventBubbling: true   
    }
];

function DataGridSearchComponent() {
    const [korisnici, setKorisnici] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    

    useEffect(() => {
        getData();
    }, [searchTerm]);


    let getData = async () => {
        if (searchTerm === "") {
            axiosApi
                .get("/account/users/")
                .then((response) => {
                    setKorisnici(response.data);
                    console.log(response.data);
                });
        } else
            axiosApi
                .get(`/account/users?search=${searchTerm}`)
                .then((response) => {
                    setKorisnici(response.data);
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
                        rowsPerPageOptions={[5]}
                        headerHeight={35}
                        sx = {{"&.MuiDataGrid-cellContent": {
                            whiteSpace: "break-spaces",
                            wordWrap: 'break-word',
                        }}}
                        
                        
                    />
                </Box>
            </Paper>
        </div>
    );
}

export default DataGridSearchComponent;
