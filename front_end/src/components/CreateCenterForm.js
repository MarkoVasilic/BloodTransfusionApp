import React from "react";
import Grid from "@mui/material/Grid";
import { Button, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

function CreateCenterForm() {
    return (
        <div>
            <Typography variant="h3" color={green[800]} marginTop={5}>
                Create a Center
            </Typography>
            <Grid
                container
                rowSpacing={3}
                sx={{ padding: "55px 550px 0px 550px" }}
            >
                <Grid item xs={12}>
                    <TextField hiddenLabel="Jovan" variant="filled" label="name" />
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="filled" label="address" />
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="filled" label="description" />
                </Grid>
                <Grid item xs={12} sm>
                    <Button color="success" variant="contained" size="large">Submit</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default CreateCenterForm;
