import { Button, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { green } from "@mui/material/colors";
import axiosApi from "../api/axios";
import { useNavigate } from "react-router-dom";

const RenderUpdateButton = (params) => {
    let navigate = useNavigate();
    return (
        <strong>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={() => {
                    navigate("/complaint-reply/" + params.row.id);
                }}
            >
                Reply
            </Button>
        </strong>
    );
};

const columns = [
    {
        field: "id",
        headerName: "ID",
        width: 150,
        align: "left",
        headerAlign: "left",
    },
    {
        field: "text",
        headerName: "Content",
        type: "string",
        width: 1210,
        editable: false,
    },
    {
        field: "reply",
        headerName: "Reply",
        headerAlign: "center",
        align: "center",
        width: 150,
        renderCell: RenderUpdateButton,
        disableClickEventBubbling: true,
    },
];

function DataGridSearchComponent() {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    let getData = async () => {
        axiosApi.get("/complaints/").then((response) => {
            let list = [];
            list = response.data.filter(function(complaint) { return complaint.response === ""; });
            setComplaints(list);
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
                    Complaints
                </Typography>
            </Stack>
            <Paper>
                <Box sx={{ height: 700, width: "100%" }}>
                    <DataGrid
                        rows={complaints}
                        columns={columns}
                        column
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
