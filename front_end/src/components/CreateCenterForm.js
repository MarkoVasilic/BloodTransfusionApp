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
                rowSpacing={2}
                sx={{ padding: "55px 550px 0px 550px" }}
            >
                <Grid item xs={12} >
                    <TextField hiddenLabel="Jovan" variant="filled" label="name" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="filled" label="address" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField variant="filled" label="description" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                <Button
                                type="submit"
                                fullWidth
                                variant="contained"
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
