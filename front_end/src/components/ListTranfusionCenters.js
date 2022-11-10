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
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useNavigate } from "react-router-dom";

const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 80,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "name",
        headerName: "Name",
        type: "string",
        width: 200,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "country",
        headerName: "Country",
        type: "string",
        width: 150,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "city",
        headerName: "City",
        type: "string",
        width: 200,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "street",
        headerName: "Street",
        type: "string",
        width: 200,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "building_number",
        headerName: "Building number",
        type: "string",
        width: 150,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "description",
        headerName: "Description",
        type: "string",
        width: 300,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "average_grade",
        headerName: "Average grade",
        type: "string",
        width: 150,
        sortable: false,
        filterable: false,
        editable: false,
    },
];

function rowAction(navigate) {
    return {
        field: "action",
        headerName: "Details",
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderCell: (params) => {
            const onClick = (e) => {
                e.stopPropagation(); // don't select this row after clicking

                const api = params.api;
                const thisRow = {};

                api.getAllColumns()
                    .filter((c) => c.field !== "__check__" && !!c)
                    .forEach(
                        (c) =>
                        (thisRow[c.field] = params.getValue(
                            params.id,
                            c.field
                        ))
                    );

                return navigate("/center-details/", { state: thisRow });
            };
            return (
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={onClick}
                >
                    {" "}
                    <ReadMoreIcon />{" "}
                </Button>
            );
        },
    };
}

function DataGridSearchComponent() {
    const [centers, setCenters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortby, setSortBy] = React.useState('');
    const [direction, setDirection] = React.useState('');
    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, [searchTerm, sortby, direction]);

    let getData = async () => {
        if (searchTerm === "" && sortby === 0) {
            axiosApi.get("/center/list").then((response) => {
                setCenters(response.data);
            });
        } else
            axiosApi
                .get(`/center/list?${searchTerm !="" ? `search=${searchTerm}&` : ""}${sortby !="" ? `ordering=${direction}${sortby}&` : ""}`) //${grade !="" ? `grade=${grade}&` : ""}
                .then((response) => {
                    setCenters(response.data);
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
                        <MenuItem value={"name"}>Name</MenuItem>
                        <MenuItem value={"country"}>Country</MenuItem>
                        <MenuItem value={"city"}>City</MenuItem>
                        <MenuItem value={"street"}>Street</MenuItem>
                        <MenuItem value={"building_number"}>Building number</MenuItem>
                        <MenuItem value={"description"}>Description</MenuItem>
                        <MenuItem value={"average_grade"}>Average grade</MenuItem>
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
                        defaultValue={"+"}
                    >
                        <MenuItem value={"+"}>Ascending</MenuItem>
                        <MenuItem value={"-"}>Descending</MenuItem>
                    </Select>
                </FormControl>
                </Stack>
            <Paper>
                <Box sx={{ height: 700, width: "100%" }}>
                    <DataGrid
                        rows={centers}
                        disableColumnFilter
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
