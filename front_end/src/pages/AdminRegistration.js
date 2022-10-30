import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { useState, useEffect } from "react";
import axiosApi from '../api/axios';
import RegistrationForm from "../components/RegistrationForm";
import jwt_decode from "jwt-decode";

export default function AdminRegistration() {

    const [korisnik, setKorisnik] = useState("");
    let token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    let user_id = decoded.user_id;

    const getData = async () => (
        axiosApi.get(`account/users/${user_id}`).then((response) => {
            setKorisnik(response.data);
        })
    )

    useEffect(() => {
        getData();
    }, []);

    console.log("GRUPA: ",korisnik.groups);
    return (
    <Stack height={"170vh"} justifyContent={"center"}>
        <Typography component="h1" variant="h4"  color={green[800]}>
            Register Center Admin
        </Typography>
        <RegistrationForm userRole = {korisnik.groups === undefined ? "" : korisnik.groups[0]}/>
    </Stack>
    );
  }