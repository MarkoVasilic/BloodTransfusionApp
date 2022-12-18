import ListTranfusionCenters from "../components/ListTranfusionCenters";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import InputTextField from "../components/InputTextField";
import { useForm } from "react-hook-form";
import { useEffect, useState, Controller } from "react";




export default function AllCenters() {

    let navigate = useNavigate();
    const [date_time, setDate_time ] = useState("");
    const handleChange = (e) => {
        setDate_time(e.target.value);
    }
    const routeChange = () =>{ 
        let path = '/centers-appointments'; 
        navigate(path, {state: date_time});
      }

    const { control } = useForm();

    return (
        <div>
            <Navbar/>
            <Button
                        variant="contained"
                        onClick={routeChange}
                        style={{
                            width: 300,
                            marginLeft: 1160,
                            marginBottom: -70,
                            marginTop: 0
                        }}
                        sx={{
                            background: "#6fbf73",
                            height: "100",
                            "&.MuiButtonBase-root": {
                                "&:hover": {
                                    backgroundColor: green[600],
                                },
                            },
                        }}
                    >
                        Make your own appointment
                    </Button>
                    <Typography width={300} marginLeft={149} marginTop={6} marginBottom={-11}>
                        Choose date and time and click the button above:</Typography>
                    <TextField
                        name="date_time"
                        control={control}
                        value={date_time}
                        onChange={handleChange}
                        style = {{
                            width: 300,
                            marginLeft: 1160,
                            marginBottom: -150,
                            marginTop: 90
                        }}
                        type="datetime-local"
                    />
                    
            <ListTranfusionCenters title={"Select Transfusion Center"} buttonName={"Select"} buttonUrl={"/selected-center/"}/>
        </div>
    );
}