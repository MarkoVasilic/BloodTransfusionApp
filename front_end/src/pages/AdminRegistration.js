import { green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { useState, useEffect } from "react";
import axiosApi from '../api/axios';
import RegistrationForm from "../components/RegistrationForm";
import Navbar from "../components/Navbar";

export default function AdminRegistration() {
    const [korisnik, setKorisnik] = useState("");
    const getData = async () => (
        axiosApi.get(`account/users/logged/`).then((response) => {
            setKorisnik(response.data);
        }).catch(function (error) {
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
              console.log('Error', error.message);
            }
        
          })
    )

    useEffect(() => {
        getData();
    }, []);

    console.log("GRUPA: ", korisnik.groups);
    return (
        <div>
            <Navbar/>
            <Stack height={"170vh"} justifyContent={"center"}>
                <Typography component="h1" variant="h4" color={green[800]}>
                    Register Center Admin
                </Typography>
                <RegistrationForm userRole={korisnik.groups === undefined ? "" : korisnik.groups[0]} />
            </Stack>
        </div>
    );
}