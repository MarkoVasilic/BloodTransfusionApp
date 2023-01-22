import React from "react";
import { Typography, Stack, IconButton } from "@mui/material";
import { green } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosApi from "../api/axios";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@material-ui/core/Button";
import Select from "@mui/material/Select";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { Refresh } from "@mui/icons-material";




function UserDetailsComponent() {
    const params = useParams();
    const { handleSubmit, control } = useForm();
    const [user, setUser] = useState({});
    const [userprofile, setUserProfile] = useState({});
    const [alert, setAlert] = React.useState(false);
    const [failed, setFailed] = React.useState(false);
    const [err, setErr] = React.useState("");
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        try {
            data.user_profile = user.id
            user.userprofile.blood_type = data.blood_type
            await axiosApi.put(`/account/users/update/${user.id}/`, user).then(res => {
                console.log(res)
                setAlert(true)
            }).catch(err => {
                console.log(err.response);
                setFailed(true)
                setErr(err.response.data.message)
            });

        }
        catch (error) {
            console.log(error)
            setFailed(true)
        }
    };

    let getUsers = async () => {
        try {
            axiosApi.get(`/account/users/${params.id}/`).then((response) => {
                setUser(response.data);
                setTimeout(3000);
                setUserProfile(response.data.userprofile);
            });
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getUsers();
    }, [userprofile]);

    return (
        <div>
        <div>
            {!user && <div>Loading...</div>}
            {user && <div>
                <Typography variant="h5" align={"left"} color={"text.secondary"}>
                    ID: {user.id}
                </Typography>
                <Stack spacing={2} p={5}>
                    <Stack direction={"row"} spacing={2}>
                        <Typography variant="h5" align={"left"}>
                            First Name:
                        </Typography>
                        <Typography
                            variant="h5"
                            color={"text.secondary"}
                            align={"left"}
                        >
                            {user.first_name}
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                        <Typography variant="h5" align={"left"}>
                            Last Name:
                        </Typography>
                        <Typography
                            variant="h5"
                            color={"text.secondary"}
                            align={"left"}
                        >
                            {user.last_name}
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                        <Typography variant="h5" align={"left"}>
                            Email:
                        </Typography>
                        <Typography
                            variant="h5"
                            color={"text.secondary"}
                            align={"left"}
                        >
                            {user.email}
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                        <Typography variant="h5" align={"left"}>
                            Address:
                        </Typography>
                        <Typography
                            variant="h5"
                            color={"text.secondary"}
                            align={"left"}
                        >
                            {userprofile.address}
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                        <Typography variant="h5" align={"left"}>
                            City/Country:
                        </Typography>
                        <Typography
                            variant="h5"
                            color={"text.secondary"}
                            align={"left"}
                        >
                            {userprofile.city}, {userprofile.country}
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                        <Typography variant="h5" align={"left"}>
                            JMBG:
                        </Typography>
                        <Typography
                            variant="h5"
                            color={"text.secondary"}
                            align={"left"}
                        >
                            {userprofile.jmbg}
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                        <Typography variant="h5" align={"left"}>
                            Phone number:
                        </Typography>
                        <Typography
                            variant="h5"
                            color={"text.secondary"}
                            align={"left"}
                        >
                            {userprofile.phone_number}
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                        <Typography variant="h5" align={"left"}>
                            Profession:
                        </Typography>
                        <Typography
                            variant="h5"
                            color={"text.secondary"}
                            align={"left"}
                        >
                            {userprofile.profession}
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                        <Typography variant="h5" align={"left"}>
                            Workplace
                        </Typography>
                        <Typography
                            variant="h5"
                            color={"text.secondary"}
                            align={"left"}
                        >
                            {userprofile.workplace}
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={2}>
                        <Typography variant="h5" align={"left"}>
                            Blood Type:
                        </Typography>
                        <Typography
                            variant="h5"
                            color={"text.secondary"}
                            align={"left"}
                        >
                            {userprofile.blood_type}
                        </Typography>
                    </Stack>
                    <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
            container
            rowSpacing={1}
            sx={{ padding: "55px 0px 55px 0px", textAlign: "rigth" }}
        >
            <Grid item xs={12}>
                <Grid item>
                    <Controller
                        name="blood_type"
                        control={control}
                        defaultValue="N"
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <FormControl variant="filled" fullWidth>
                                <InputLabel id="demo-simple-select-filled-label">
                                    Blood Type
                                </InputLabel>
                                <Select
                                    fullWidth
                                    style={{marginRigth: '20px'}}
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={value}
                                    onChange={onChange}
                                >
                                    <MenuItem value={"A_POS"}>
                                        A POSITIVE
                                    </MenuItem>
                                    <MenuItem value={"A_NEG"}>
                                        A NEGATIVE
                                    </MenuItem>
                                    <MenuItem value={"B_POS"}>
                                        B POSITIVE
                                    </MenuItem>
                                    <MenuItem value={"B_NEG"}>
                                        B NEGATIVE
                                    </MenuItem>
                                    <MenuItem value={"AB_POS"}>
                                        AB POSITIVE
                                    </MenuItem>
                                    <MenuItem value={"AB_NEG"}>
                                        AB NEGATIVE
                                    </MenuItem>
                                    <MenuItem value={"O_POS"}>
                                        0 POSITIVE
                                    </MenuItem>
                                    <MenuItem value={"O_NEG"}>
                                        0 NEGATIVE
                                    </MenuItem>
                                    <MenuItem value={"N"}>
                                        Unknown
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            
                        )}
                    />
                </Grid>
            </Grid>
            
        </Grid>
        <Grid item xs={12}>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        background: "#6fbf73",
                        marginTop: -5,
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
                            Successfuly updated user blood type!
                        </Alert>
                    </Collapse>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Collapse in={failed}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setFailed(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            {err}
                        </Alert>
                    </Collapse>
                </Box>
                </Stack>
            </div>
            }
            
        </div>
        
    </div>
    );
}

export default UserDetailsComponent;
