import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import axiosApi from "../api/axios";
import Grid from '@mui/material/Grid';

function LoyaltyCardComponent() {
    const [ userprofile, setUserprofile ] = useState({});
    const [ category, setCategory ] = useState("");
    const [ coupons, setCoupons] = useState([]);
    let coupon1 = "15% discount on Full Body Health Checkup with your username!\n";
    let coupon2 = "30% discount on Lab Tests with your username!\n";
    let coupon3 = "25% discount on Lunch Packet in Healthy Foodland!\n";
    let coupon4 = "50% discount on Lab Tests woth your username!\n";
    let coupon5 = "30% discount on dermatologist examination!\n";
    let coupon6 = "15% discount on every receipt in Health Pharmacy!\n"

    let getData = async () => {
        axiosApi
            .get('/account/users/user-profile/')
            .then((response) => {
                setUserprofile(response.data.userprofile);
                if(response.data.userprofile.loyalty_points>10){
                    setCategory("Silver");
                    setCoupons([coupon1, coupon2, coupon3, coupon6]);
                }else if(response.data.userprofile.loyalty_points>50){
                    setCategory("Gold");
                    setCoupons([coupon1, coupon2, coupon4, coupon5, coupon6]);
                }else{
                    setCategory("Regular");
                    setCoupons([coupon1, coupon2, coupon4, coupon5, coupon6]);
                }
                });
    };

    useEffect(() => {
        getData();
    }, []);

    console.log("UserProfile", userprofile);

    return (
        <Grid container spacing={2} marginTop="-10px" marginBottom={"10px"} alignContent={"center"}>
            <Grid item xs={3}>
                <Typography variant="h5" align='left' marginLeft={"100px"} marginRight={"5px"}>Loyalty points: </Typography>
            </Grid>
            <Grid item xs={9}>
                <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{userprofile.loyalty_points}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>Category: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{category}</Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography variant="h5" align='left' marginLeft={"100px"}>Coupons: </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography variant="h5" color="text.secondary" align='left' marginLeft={"80px"}>{coupons}</Typography>
            </Grid>
        </Grid>
    );
}

export default LoyaltyCardComponent;
