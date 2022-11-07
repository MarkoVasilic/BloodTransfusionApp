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




function refreshPage(){
    window.location.reload();
}

const RenderUpdateButton = (params) => {
    let navigate = useNavigate();
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                   // navigate('/update-staff/'+params.row.id);
                }}
            >
                Update
            </Button>
        </strong>
    )
};


const RenderDeleteButton = (params) => {
    let navigate = useNavigate();
        return (
        <strong>
            <Button
                variant="contained"
                color="error"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    axiosApi.delete(`/account/users/delete-user/${params.row.id}/`);
                    refreshPage();
                }}
            >
                Delete
            </Button>
        </strong>
    )
};

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
        valueGetter: (params) => {return params.row.userprofile.phone_number}
    },
    {
        field: "address",
        headerName: "Address",
        type: "string",
        width: 400,
        editable: false,
        valueGetter: (params) => {return params.row.userprofile.address}
    },
    {
        field: "city",
        headerName: "City",
        type: "string",
        width: 150,
        editable: false,
        valueGetter: (params) => {return params.row.userprofile.city}
    },
    {
        field: "country",
        headerName: "Country",
        type: "string",
        width: 150,
        editable: false,
        valueGetter: (params) => {return params.row.userprofile.country}
    }, 
    {
        field: "update",
        headerName: "Update",
        width: 150,
        renderCell: RenderUpdateButton,
        disableClickEventBubbling: true  
    },
    {
        field: "delete",
        headerName: "Delete",
        width: 150,
        renderCell: RenderDeleteButton,
        disableClickEventBubbling: true  
    }
];

function DataGridCenterStaff() {
    const [centers, setCenters] = useState([]);
    const params = useParams();

    useEffect(() => {
        getData();
    },
    []);

    let getData = async () => {
            axiosApi
                .get(`/account/users/center/${params.centar}/`) 
                .then((response) => {
                    setCenters(response.data);
                    console.log(response.data);
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

export default DataGridCenterStaff;
