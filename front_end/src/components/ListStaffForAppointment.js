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
import { useLocation } from 'react-router-dom';


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
        field: "first_name",
        headerName: "First name",
        type: "string",
        width: 180,
        sortable: false,
        filterable: false,
        editable: false,
    },
    {
        field: "last_name",
        headerName: "Last name",
        type: "string",
        width: 150,
        sortable: false,
        filterable: false,
        editable: false,
    }
];

function rowAction(navigate, buttonName, buttonUrl) {
    return {
        field: "action",
        headerName: buttonName,
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

                return navigate(buttonUrl, { state: thisRow });
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

function DataGridSearchComponent(props) {

    const [ users, setUsers ] = useState({});
    const { state } = useLocation();

    let getData = async () => {
        console.log(state.id)
            axiosApi.get(`/account/users/center/${state.id}`).then((response) => {
                setUsers(response.data);
            });
    };

    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, []);

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
                    {props.title}
                </Typography>
            </Stack>
            
            <Paper>
                <Box sx={{ height: 700, width: "100%" }}>
                    <DataGrid
                        rows={users}
                        disableColumnFilter
                        columns={[...columns, rowAction(navigate, props.buttonName, props.buttonUrl)]}
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
