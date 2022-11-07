import { Button, IconButton, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CachedIcon from "@mui/icons-material/Cached";
import { green, red } from "@mui/material/colors";
import axiosApi from "../api/axios";
import { useNavigate } from "react-router-dom";

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
                    navigate('/update-center/'+params.row.id);
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
                    axiosApi.delete(`/center/update-delete/${params.row.id}/`);
                    refreshPage();
                }}
            >
                Delete
            </Button>
        </strong>
    )
};

const RenderGetCenterAdministratorsButton = (params) =>{
    let navigate = useNavigate();
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    navigate('/center-staff-list/'+params.row.id);
                }}
            >
                Details
            </Button>
        </strong>
    )
};

const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
        field: "name",
        headerName: "Name",
        type: "string",
        width: 200,
        editable: false,
    },
    {
        field: "country",
        headerName: "Country",
        type: "string",
        width: 200,
        editable: false
    },
    {
        field: "city",
        headerName: "City",
        type: "string",
        width: 200,
        editable: false
    },
    {
        field: "street",
        headerName: "Street",
        type: "string",
        width: 200,
        editable: false,
    },
    {
        field: "building_number",
        headerName: "Building number",
        type: "string",
        width: 150,
        editable: false,
    },
    {
        field: "description",
        headerName: "Description",
        type: "string",
        width: 300,
        editable: false,
    },
    {
        field: "average_grade",
        headerName: "Average grade",
        type: "string",
        width: 150,
        editable: false,
    },
    {
        field: "update",
        headerName: "Update Center",
        width: 150,
        renderCell: RenderUpdateButton,
        disableClickEventBubbling: true   
    },
    {
        field: "delete",
        headerName: "Delete Center",
        width: 150,
        renderCell: RenderDeleteButton,
        disableClickEventBubbling: true
    }, 
    {
        field: "staff",
        headerName: "Center Administrators", 
        width: 150,
        renderCell: RenderGetCenterAdministratorsButton,
        disableClickEventBubbling: true

    }

];

function DataGridSearchComponent() {
    const [centers, setCenters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getData();
    }, [searchTerm]);

    let getData = async () => {
        if (searchTerm === "") {
            axiosApi
                .get("/center/list")
                .then((response) => {
                    setCenters(response.data);
                });
        } else
            axiosApi
                .get(`/center/list?search=${searchTerm}`)
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
                    Transfusion Centers
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
