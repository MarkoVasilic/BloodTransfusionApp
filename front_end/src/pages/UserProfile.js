import PersonalInformationCard from "../components/PersonalInformationCard";
import { green } from '@mui/material/colors';
import { Typography, Paper } from '@mui/material';
import { Stack } from '@mui/system';
import Navbar from "../components/Navbar";
import LoyaltyCardComponent from "../components/LoyaltyCard";

export default function UserProfile() {
    return (
        <div>
            <Navbar />
            <Stack marginTop={"10px"} justifyContent={"center"}>
            <Typography align="center"  marginBottom={"20px"}  component="h1" variant="h4" color={green[800]}>
                Profile
            </Typography>
            <Typography align="left" marginLeft={"110px"} marginBottom={"5px"} component="h4" variant="h4" color={green[800]}>
                Personal information
            </Typography>
            <Paper elevation={10} sx={{ p: { sm: 2, xs: 2 } }}>
            <PersonalInformationCard></PersonalInformationCard>
            </Paper>
            <Typography align="left" marginLeft={"110px"} marginTop={"15px"} marginBottom={"5px"} component="h4" variant="h4" color={green[800]}>
                Loyalty program
            </Typography>
            <Paper elevation={15} sx={{ p: { sm: 2, xs: 2 } }}>
            <LoyaltyCardComponent></LoyaltyCardComponent>
            </Paper>
        </Stack>
        </div>
    );
}