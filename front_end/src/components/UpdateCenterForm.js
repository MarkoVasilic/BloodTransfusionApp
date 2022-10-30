import React from "react";
import Grid from "@mui/material/Grid";
import { Button, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApi from "../api/axios";



//const url = 'http://localhost:8000/center/all/';

function UpdateCenterForm() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name,address,description);
        try {
            const resp = await axiosApi.put('/center/all/1/' ,{name, description, address});
            console.log(resp.data);
            navigate("/");
        } catch (error) {
            console.log(error.response);
            }
        };
    

    return (
        <div>
            <Typography variant="h3" color={green[800]} marginTop={2}>
                Update a Center
            </Typography>
            <Grid
                container
                rowSpacing={2}
                sx={{ padding: "55px 550px 0px 550px" }}
            >
                <Grid item xs={12} >
                    <TextField value={name}  variant="filled" label="name" onChange={(e)=> setName(e.target.value)} autoFocus fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={address} variant="filled" label="address"  onChange={(e)=> setAddress(e.target.value)} fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={description} variant="filled" label="description" onChange={(e)=> setDescription(e.target.value)} fullWidth/>
                </Grid>
                <Grid item xs={12}>
                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{ mt: 3, mb: 2, background: "#6fbf73",height: "30" }}
                                
                            >
                                Submit
                            </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default UpdateCenterForm;
