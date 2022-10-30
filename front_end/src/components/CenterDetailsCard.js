import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';

export default function MediaCard(props) {
    const { state } = useLocation();
    console.log(state)
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center">
            <Card sx={{ width: "100%" }}>
                <CardContent sx={{}}>
                    <Typography gutterBottom variant="h5" component="div">
                        Name
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {state.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        Country
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {state.country}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        City
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {state.city}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        Street
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {state.street}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        Building number
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {state.building_number}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        Description
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {state.description}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        Average grade
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {state.average_grade}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}
