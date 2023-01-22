import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axiosApi from "../api/axios";
import { green } from "@mui/material/colors";
import { MenuList, TextField, Typography } from '@mui/material';
import InputTextField from "./InputTextField";


const RegistrationForm = () => {
    const { handleSubmit, control } = useForm();
    const [alert, setAlert] = React.useState(false);
    const [ error, setError ] = React.useState(false);
    const [er, setEr] = React.useState("");
    let navigate = useNavigate();
    const [user, setUser] = useState("");
    const [staff, setStaff] = useState([]);

    const getData = async (e) => {
        try {
            await axiosApi.get('/account/users/user-profile/').then((res) => {
                console.log("User", res.data);
                setUser(res.data);
                axiosApi
                    .get(`account/users/center/${res.data.userprofile.tranfusion_center}`)
                    .then((response) => {
                        setStaff(response.data);
                        console.log(response.data)
                    });
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const onSubmit = async (data) => {
        try {
            data.transfusion_center = user.userprofile.tranfusion_center
            data.staff = [data.staff]
            console.log(user)
            let res = await axiosApi.post('/appointment/create-predefined/', data).then(res => {
                console.log(res)
                setAlert(true)
            }).catch(er => {
                console.log(er.response);
                setError(true)
                setEr(er.response.data.message)
            });
        }
        catch (err) {
            console.log(err)
            setError(true);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    container
                    rowSpacing={2}
                    marginTop={2}
                    sx={{ padding: "55px 550px 0px 550px", textAlign: "left" }}
                >
                    <Grid item xs={12}>
                        <Grid item>
                            <Typography>
                                Choose date and time:</Typography>
                            <InputTextField
                                name="date_time"
                                control={control}
                                type="datetime-local"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item>
                            <Typography>
                                Choose duration:</Typography>
                            <InputTextField
                                name="duration"
                                control={control}
                                type="number"
                                rules={{ required: "This field is required" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>Choose staff from the list:</Typography>
                        <Grid item>
                            <Controller
                                name="staff"
                                control={control}
                                defaultValue="N"
                                render={({
                                    field: { onChange, value },
                                    fieldState: { error },
                                }) => (
                                    <FormControl variant="filled" fullWidth>
                                        <InputLabel id="demo-simple-select-filled-label">
                                            Choose staff
                                        </InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-filled"
                                            value={value}
                                            onChange={onChange}
                                        >
                                            {staff.map((s) => (
                                                <MenuItem value={s.id}>
                                                    {s.first_name + " " + s.last_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                background: "#6fbf73",
                                marginTop: 2,
                                marginBottom: 5,
                                "&.MuiButtonBase-root": {
                                    "&:hover": {
                                        backgroundColor: green[600],
                                    },
                                },
                            }}
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Box sx={{ width: "100%" }}>
                <Collapse in={alert}>
                    <Alert
                        severity="success"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setAlert(false);
                                    navigate("/");
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        Successfuly scheduled appointment!
                    </Alert>
                </Collapse>
            </Box>
            <Box sx={{ width: "100%" }}>
                    <Collapse in={error}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setError(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {er}
                        </Alert>
                    </Collapse>
                </Box>
        </div>
    );
};

export default RegistrationForm;
