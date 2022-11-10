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
import ReadMoreIcon from "@mui/icons-material/ReadMore";

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


/*const RenderDeleteButton = (params) => {
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
};*/

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
    /*{
        field: "delete",
        headerName: "Delete Center",
        width: 150,
        renderCell: RenderDeleteButton,
        disableClickEventBubbling: true
    }, */
    {
        field: "staff",
        headerName: "Center Administrators", 
        width: 150,
        renderCell: RenderGetCenterAdministratorsButton,
        disableClickEventBubbling: true

    }

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
    const[user, setUser] = useState("");
    const [center, setCenter] = useState();
    const [centerID, setCenterID] = useState(null);
    const navigate = useNavigate();

    let getUser = async() => {
        return axiosApi.get('/account/users/user-profile')
        .then((response)=> {
            setUser(response.data);
            console.log("TR ID", response.data.userprofile.tranfusion_center);
            setCenterID(response.data.userprofile.tranfusion_center);
            return response.data.userprofile.tranfusion_center
        })
    }

 let getData = async (tcId) => {
    console.log("USER: -------", user);
        return axiosApi
            .get(`/center/find/${tcId}/`)
            .then((response) => {
                setCenter(response.data);
                console.log("Centar", response.data);
            }) 
}; 


    useEffect(() => {
        getUser().then((tcId) => getData(tcId));
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
                    Transfusion Centers
                </Typography>
            </Stack>
            <Paper>
                <Box sx={{ height: 700, width: "100%" }}>
                    <DataGrid
                        rows={center ? [center]: []}
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
