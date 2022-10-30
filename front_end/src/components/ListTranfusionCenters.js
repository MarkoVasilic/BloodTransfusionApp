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
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from 'react-router-dom';

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
        width: 150,
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
    }
];

function rowAction(navigate){
    return {
    field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking

                const api = params.api;
                const thisRow = {};

                api
                    .getAllColumns()
                    .filter((c) => c.field !== "__check__" && !!c)
                    .forEach(
                        (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                    );

                return navigate('/center-details/', {state: thisRow})
            };
            return <IconButton onClick={onClick}> <ReadMoreIcon /> </IconButton>
        }
    }
}

function DataGridSearchComponent() {
    const [centers, setCenters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
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
            <Stack direction={"row"} sx={{ justifyContent: "start" }} p={2}>
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
                    sx={{ background: "#6fbf73" }}
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
                        columns={[...columns, rowAction(navigate)]}
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
