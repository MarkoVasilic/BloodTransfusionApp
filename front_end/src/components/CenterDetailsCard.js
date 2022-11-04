import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';

export default function MediaCard(props) {
    const { state } = useLocation();
    console.log(state)
    return (
        <Grid container spacing={2} marginTop="70px" alignContent={"center"}>
            <Grid item xs={6}>
                <Typography variant="h5" align='left' marginLeft={"650px"} marginRight={"5px"}>Name: </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h5" color="text.secondary" align='left' marginLeft={"20px"}>{state.name}</Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" align='left' marginLeft={"650px"}>Street: </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"20px"}>{state.street}</Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" align='left' marginLeft={"650px"}>Building number: </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"20px"}>{state.building_number}</Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" align='left' marginLeft={"650px"}>City: </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"20px"}>{state.city}</Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" align='left' marginLeft={"650px"}>Country: </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"20px"}>{state.country}</Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" align='left' marginLeft={"650px"}>Description: </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"20px"}>{state.description}</Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" align='left' marginLeft={"650px"}>Average grade: </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"20px"}>{state.average_grade}</Typography>
            </Grid>
            
        </Grid>
    );
}
