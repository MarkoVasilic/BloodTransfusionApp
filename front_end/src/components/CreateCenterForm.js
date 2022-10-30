import React from "react";
import Grid from "@mui/material/Grid";
import { Button, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApi from "../api/axios";



const url = '/center/create/';

function CreateCenterForm() {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [building_number, setBuildingNumber] = useState('');
    const [description, setDescription] = useState('');
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name,country, city, street, building_number, description);
        try {
            const resp = await axiosApi.post(url,{name, country, city, street, building_number, description});
            console.log(resp.data);
            navigate("/");
        } catch (error) {
            console.log(error.response);

            }
        };
    

    return (
        <div>
            <Typography component="h1" variant="h4"  color={green[800]} marginTop={2}>
                Create a Center
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
                    <TextField value={country} variant="filled" label="country"  onChange={(e)=> setCountry(e.target.value)} fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={city} variant="filled" label="city"  onChange={(e)=> setCity(e.target.value)} fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={street} variant="filled" label="street"  onChange={(e)=> setStreet(e.target.value)} fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={building_number} variant="filled" label="building_number"  onChange={(e)=> setBuildingNumber(e.target.value)} fullWidth/>
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

export default CreateCenterForm;
