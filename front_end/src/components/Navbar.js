import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useState, useEffect, useMemo } from "react";
import axiosApi from "../api/axios";

export default function Navbar() {
    const [state, setState] = React.useState(false);
    let navigate = useNavigate();
    const [user, setUser] = useState("");

    const getData = async () =>
        axiosApi
            .get(`account/users/logged/`)
            .then((response) => {
                console.log(response.data)
                setUser(response.data);
            })
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
            });
    useEffect(() => {
        getData();
    }, []);
    const sidemenu = useMemo(() => chooseSideMenu(user.groups), [user.groups]);
    const button1 = useMemo(() => chooseButton1(user.groups), [user.groups]);
    const button2 = useMemo(() => chooseButton2(user.groups), [user.groups]);

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ background: "#6fbf73" }}>
                <Toolbar>
                    {
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="big-menu-appbar"
                                aria-haspopup="true"
                                onClick={toggleDrawer("left", true)}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor={"left"}
                                open={state["left"]}
                                onClose={toggleDrawer("left", false)}
                            >
                                <Box
                                    role="presentation"
                                    onClick={toggleDrawer("left", false)}
                                    onKeyDown={toggleDrawer("left", false)}
                                >
                                    <List>
                                        {Object.keys(sidemenu).map((k) => (
                                            <ListItem key={k} disablePadding>
                                                <ListItemButton>
                                                    <ListItemText
                                                        primary={k}
                                                        onClick={() =>
                                                            navigate(
                                                                sidemenu[k]
                                                            )
                                                        }
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Drawer>
                        </div>
                    }
                    <Button color="inherit" onClick={() => navigate("/")}>
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        sx={{ marginLeft: "auto" }}
                        onClick={() => {
                            if (button1.name === "LogOut") {
                                localStorage.removeItem("token");
                                delete axiosApi.defaults.headers.common[
                                    "Authorization"
                                ];
                                navigate("/login/");
                            } else {
                                navigate(button1.url);
                            }
                        }}
                    >
                        {button1.name}
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate(button2.url)}
                    >
                        {button2.name}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const chooseSideMenu = (group) => {
    console.log(group)
    if (!group) return { "Check Transfusion Centers": "/list-centers" };
    if (group[0] === "Admin") {
        return {
            "Check Transfusion Centers": "/list-centers",
            "Create Transfusion Centers": "/create-center",
            "Create New Admin": "/register-admin",
            "List Users": "/users",
        };
    } else if (group[0] === "TranfusionCenterUser") {
        return {
            "List Transfusion Centers": "/list-centers",
            "Fill Questionnaire": "/fill-questionnaire",
        };
    } else if (group[0] === "TranfusionCenterStaff") {
        return { "List Transfusion Centers": "/list-centers" };
    } else {
        return { "Check Transfusion Centers": "/list-centers" };
    }
};

const chooseButton1 = (group) => {
    if (!group) return { name: "Login", url: "/login" };
    else {
        return { name: "LogOut", url: "/logout" };
    }
};

const chooseButton2 = (group) => {
    if (!group) return { name: "Register", url: "/register-donor" };
    else if (group[0] === "Admin") {
        return { name: "Profile", url: "/admin-profile" };
    } else if (group[0] === "TranfusionCenterStaff") {
        return { name: "Profile", url: "/staff-profile" };
    } else {
        return { name: "Profile", url: "/user-profile" };
    }
};
