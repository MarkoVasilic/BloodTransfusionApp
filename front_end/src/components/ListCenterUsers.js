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
                    navigate('/user-details/'+params.row.user_profile.user.id);
                }}
            >
                <ReadMoreIcon/>
            </Button>
        </strong>
    )
};


const columns = [
    {
        field: "id",
        headerName: "ID",
        type: "string",
        width: 50,
        editable: false,
        valueGetter: (params) => {return params.row.user_profile.user.id}
    },
    {
        field: "first_name",
        headerName: "First Name",
        type: "string",
        width: 250,
        editable: false,
        valueGetter: (params) => {return params.row.user_profile.user.first_name}
    },
    {
        field: "last_name",
        headerName: "Last Name",
        type: "string",
        width: 250,
        editable: false,
        valueGetter: (params) => {return params.row.user_profile.user.last_name}
    },
    {
        field: "phone_number",
        headerName: "Phone Number",
        type: "string",
        width: 300,
        editable: false,
        valueGetter: (params) => {return params.row.user_profile.user.userprofile.phone_number}
    },
    {
        field: "email",
        headerName: "Email",
        type: "string",
        width: 300,
        editable: false,
        valueGetter: (params) => {return params.row.user_profile.user.email}
    },
    {
        field: "transfusion_center",
        headerName: "Center ID",
        type: "string",
        width: 200,
        editable: false,
    },

    {
        field: "details",
        headerName: "Details",
        headerAlign: "center",
        align: "center",
        width: 100,
        renderCell: RenderDetailsButton,
        disableClickEventBubbling: true   
    }
];

function ListCenterUsers() {
    const [korisnici, setKorisnici] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    

    useEffect(() => {
        getData();
    }, [searchTerm]);


    let getData = async () => {
        if (searchTerm === "") {
            axiosApi
                .get("/appointments/users/")
                .then((response) => {
                    setKorisnici(response.data);
                    console.log("resp", response.data); 

                });
        } else
            axiosApi
                .get(`/appointments/search/?search=${searchTerm}`)
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
                    All Users from your Center
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

export default ListCenterUsers;
